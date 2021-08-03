from tensorflow.keras import Model
from tensorflow.keras.layers import (
    Input,
    Multiply,
    Dense,
    Concatenate,
    Dropout,
    GRU,
    Dot,
    Activation,
)
from tensorflow.keras.metrics import RootMeanSquaredError
from tensorflow.keras.utils import plot_model
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.losses import BinaryCrossentropy
from functools import reduce
from pandas import Series, read_csv
import numpy as np


class CFs:
    def __init__(self):
        self.backup_path = "training/backup.ckpt"
        self.cp_callback = ModelCheckpoint(
            filepath=self.backup_path, save_weights_only=True, verbose=1
        )

    def model_info(self):
        if self.model:
            self.model.summary()
            return plot_model(self.model, to_file="model.png")

    def fit(self, inputs, label, epochs=10, verbose=1):
        self.model.fit(
            inputs, label, epochs=epochs, verbose=verbose, callbacks=[self.cp_callback]
        )

    def load(self, path=None):
        if path == None:
            self.model.load_weights(self.backup_path)
        else:
            self.model.load_weights(path)

    def store(self, path=None):
        if path == None:
            self.model.save_weights(self.backup_path)
        else:
            self.model.save_weights(path)

    def test(self, inputs, label):
        self.model.evaluate(inputs, label, batch_size=1)

    def _create_inputs(self, user_size, item_size):
        u_input = Input(shape=[user_size])
        i_input = Input(shape=[item_size])
        return [u_input, i_input]

    def _create_mlp(self, input, layers_size=[], dropout=0, activation="relu"):
        layers = [Dense(size, activation=activation) for size in layers_size]
        return reduce(
            lambda last, current: Dropout(dropout)(current(last))
            if dropout
            else current(last),
            layers,
            input,
        )


class ZeroShot(CFs):
    def __init__(self, size1=512, size2=256, gru_length=20):
        self.backup_path = f"./training/zeroshot__{size1}__{size2}/mdl.ckpt"
        self.cp_callback = ModelCheckpoint(
            filepath=self.backup_path, save_weights_only=True, verbose=0
        )
        user_input = Input(shape=(gru_length, 768))
        item_input = Input(shape=(768))
        self.inputs = [user_input, item_input]
        layer1 = Dense(size1, activation="relu")
        layer2 = Dense(size2, activation="relu")
        self.layers = [layer1, layer2]
        self.gru = GRU(size2)
        user_present = self.gru(layer2(layer1(user_input)))
        item_present = layer2(layer1(item_input))
        output = Activation(activation="sigmoid")(
            Dot(axes=1)([user_present, item_present])
        )
        self.model = Model(self.inputs, output, name="ZeroShot")
        self.model.compile(
            optimizer="adam",
            loss=BinaryCrossentropy(),
            metrics=[RootMeanSquaredError()],
        )
        self._update_models()
        self._gen_score_layer(size2)

    def _update_models(self):
        item_function = self.layers[1](self.layers[0](self.inputs[1]))
        self.item_model = Model(self.inputs[1], item_function)
        print(self.gru.weights)

    def load(self):
        super().load()
        self._update_models()

    def fit(self, inputs, label, epochs=10, verbose=1):
        super().fit(inputs, label, epochs, verbose)
        self._update_models()

    def _update_models(self):
        item_function = self.layers[1](self.layers[0](self.inputs[1]))
        self.item_model = Model(self.inputs[1], item_function)
        user_function = self.gru(self.layers[1](self.layers[0](self.inputs[0])))
        self.user_model = Model(self.inputs[0], user_function)

    def _gen_score_layer(self, size):
        input = [Input(shape=(size)), Input(shape=(size))]
        output = Activation(activation="sigmoid")(Dot(axes=1)(input))
        self.score_layer = Model(input, output)

    def predict(self, user_data, item_data):
        user_vec = self._embed_user(user_data.reshape(1, 20, 768))
        item_vec = self._embed_item(item_data)
        user_vec = np.repeat(user_vec, item_vec.shape[0], axis=0)
        return self.score_layer.predict([user_vec, item_vec])

    def _embed_item(self, item):
        return self.item_model.predict(item)

    def _embed_user(self, items):
        return self.user_model.predict(items)


class BCFNet(CFs):
    def __init__(
        self,
        user_size=100,
        item_size=768,
        representation_layers=[512, 256, 128, 64],
        balance_size=128,
        matching_layers=[512, 256, 128, 64],
        activation="relu",
    ):
        def joinLst(x):
            return "_".join([str(_) for _ in x])

        self.backup_path = f"./training/bcfnet__{joinLst(representation_layers)}__{joinLst(matching_layers)}__{balance_size}/mdl.ckpt"
        self.cp_callback = ModelCheckpoint(
            filepath=self.backup_path, save_weights_only=True, verbose=0
        )
        self.user_size = user_size
        inputs = self._create_inputs(user_size, item_size)
        matchingfunction_model = self._create_matchingfunction_model(
            inputs, matching_layers, activation
        )
        representation_model = self._create_representation_model(
            inputs, representation_layers, activation
        )
        balance_layer = self._create_balance_model(inputs, balance_size)
        fusion_layer = Concatenate()(
            [representation_model, balance_layer, matchingfunction_model]
        )
        output = Dense(1, activation="sigmoid")(fusion_layer)
        self.model = Model(inputs, output, name="DeepCF")
        self.model.compile(
            optimizer="adam",
            loss=BinaryCrossentropy(),
            metrics=[RootMeanSquaredError()],
        )

    def _attention(self, input):
        attention = Dense(input.get_shape().as_list()[1], activation="softmax")(input)
        return Concatenate()([input, attention])

    def _create_balance_model(self, inputs, balance_size, activation="relu"):
        user_embedding_factor = Dense(balance_size, activation=activation)(inputs[0])
        item_embedding_factor = Dense(balance_size, activation=activation)(inputs[1])
        return Multiply()([user_embedding_factor, item_embedding_factor])

    def _create_representation_model(
        self, inputs, representation_layers, activation="relu"
    ):
        # embedding input
        embedding_size = representation_layers[0] // 2
        user_embedding_factor = Dense(embedding_size, activation=activation)(inputs[0])
        item_embedding_factor = Dense(embedding_size, activation=activation)(inputs[1])
        # attentive_layers
        attentive_user = self._attention(user_embedding_factor)
        attentive_item = self._attention(item_embedding_factor)
        # mlp
        user_latent_factor = self._create_mlp(
            attentive_user, representation_layers, dropout=0.1
        )
        item_latent_factor = self._create_mlp(
            attentive_item, representation_layers, dropout=0.1
        )
        return Multiply()([user_latent_factor, item_latent_factor])

    def _create_matchingfunction_model(
        self, inputs, matching_layers=[32], activation="relu"
    ):
        embedding_size = matching_layers[0] // 4
        user_embedding_factor = Dense(embedding_size, activation=activation)(inputs[0])
        item_embedding_factor = Dense(embedding_size, activation=activation)(inputs[1])
        concat = Concatenate()([user_embedding_factor, item_embedding_factor])
        attentive_layer = self._attention(concat)
        return self._create_mlp(attentive_layer, matching_layers, dropout=0.1)

    def predict(self, user_data, item_data):
        user_vec = np.repeat(
            user_data.reshape(1, self.user_size), item_data.shape[0], axis=0
        )
        return self.model.predict([user_vec, item_data]).flatten()


bcfRecommender = BCFNet(
    user_size=100,
    item_size=768,
    representation_layers=[512, 256, 128, 64],
    balance_size=128,
    matching_layers=[512, 256, 128, 64],
    activation="relu",
)
bcfRecommender.load("./product/recommenders/bcfnet/mdl.ckpt")
to_numpy = lambda x: np.fromstring(x.strip("[").strip("]").replace("\n", ""), sep=" ")
description = read_csv("./product/recommenders/bert_with_description_field.csv")[
    ["id", "proccessed"]
]
description["proccessed"] = description["proccessed"].apply(to_numpy)


def get_item_vector_by_uid(items):

    # Get the table of item
    # :param items: The list of items (type is product.Models.Book)
    # :return: Table (with 2 column (id, feature)) of the items
    return description[description["id"].isin(items.values_list("sku", flat=True))]


def cf_filter(book_cat, booklist=[], num=None):
    user_input = np.zeros((100))
    for i in book_cat:
        if (i >= 0) and (i < 100):
            user_input[i] += 1
    if np.sum(user_input) > 0:
        user_input = user_input / np.sum(user_input)

    book_table = get_item_vector_by_uid(booklist)

    item_input = np.array(book_table.proccessed.to_list())

    # user_input = np.repeat(user_input.reshape((1, 100)), item_input.shape[0], axis=0)

    scores = bcfRecommender.predict(user_input, item_input)
    idx = (
        scores.argsort()[-1 * num :][::-1]
        if type(num) is int
        else scores.argsort()[::-1]
    )
    skus = book_table.iloc[idx].id.to_list()

    clauses = " ".join(["WHEN sku=%s THEN %s" % (pk, i) for i, pk in enumerate(skus)])
    ordering = "CASE %s END" % clauses

    return booklist.filter(sku__in=skus).extra(
        select={"ordering": ordering}, order_by=("ordering",)
    )

def cf_filter_by_sku(book_cat, num=None): 
    user_input = np.zeros((100))
    for i in book_cat:
        if (i >= 0) and (i < 100):
            user_input[i] += 1
    if np.sum(user_input) > 0:
        user_input = user_input / np.sum(user_input)

    book_table = description

    item_input = np.array(book_table.proccessed.to_list())

    # user_input = np.repeat(user_input.reshape((1, 100)), item_input.shape[0], axis=0)

    scores = bcfRecommender.predict(user_input, item_input)
    idx = (
        scores.argsort()[-1 * num :][::-1]
        if type(num) is int
        else scores.argsort()[::-1]
    )
    skus = book_table.iloc[idx].id.to_list()

    return skus