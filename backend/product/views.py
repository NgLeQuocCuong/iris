from rest_framework import permissions, decorators, exceptions, generics
from utils import viewset, http_code
from rest_framework import filters
from utils.services import product as product_services
from . import serializers, models, filters as product_filters
from . import recommender


class ProductViewSet(viewset.BaseView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_classes = {
        "item_create": serializers.ItemCreateSerializer,
        "item_info": serializers.ItemInfoSerializer,
    }

    @decorators.action(
        methods=[
            "POST",
        ],
        detail=False,
    )
    def item_create(self, request):
        serializer = self.get_serializer(data=request.POST)
        print(request.POST.get("authors"))
        try:
            serializer.is_valid(raise_exception=True)
            new_book = product_services.add_new_item(**serializer.validated_data)

            return self.get_response(data=new_book, error_code=http_code.HttpSuccess)

        except exceptions.ValidationError as e:
            return self.get_response(data=e.detail, error_code=e.status_code)

    @decorators.action(
        methods=[
            "GET",
        ],
        detail=False,
    )
    def item_info(self, request):

        book_id = request.GET.get("id", None)
        print(book_id)
        try:
            from .models import Book

            book = Book.objects.get(uid=book_id)
            serializer = self.get_serializer(book)

            return self.get_response(
                data=serializer.data, error_code=http_code.HttpSuccess
            )

        except Exception as e:
            return self.get_response(data=str(e), error_code=500)


class PopularProduct(generics.ListAPIView):
    from rest_framework import pagination

    queryset = models.Book.objects.order_by("-rating_count")
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [
        filters.SearchFilter,
        product_filters.PriceFilter,
        product_filters.AuthorFilters,
        product_filters.CategoryFilter,
        product_filters.PublisherFilter,
        product_filters.RatingFilter,
    ]
    search_fields = ["name"]

    def list(self, request):
        from django.http import JsonResponse

        try:
            data = super().list(request).data
            # paginator = Paginator(data, 25)
            # print(data)
            return JsonResponse({"data": data, "error_code": 0})
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({"data": None, "error_code": 0})



class AuthorView(generics.ListAPIView):
    queryset = models.Author.objects.order_by("name")
    serializer_class = serializers.AuthorSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = []
    search_fields = ["name"]

    def list(self, request):
        from django.http import JsonResponse

        try:
            data = super().list(request).data

            # paginator = Paginator(data, 25)
            # print(data)
            return JsonResponse({"data": data, "error_code": 0})
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({"data": None, "error_code": 0})



class PublisherView(generics.ListAPIView):
    queryset = models.Book.objects.order_by("publisher").values("publisher").distinct()
    serializer_class = serializers.PublisherSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = []
    search_fields = ["name"]

    def list(self, request):
        from django.http import JsonResponse

        try:
            data = super().list(request).data
            return JsonResponse({"data": data, "error_code": 0})
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({"data": None, "error_code": 0})


class RecommendProduct(generics.ListAPIView):
    from rest_framework import pagination

    queryset = models.Book.objects.all()
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    # filter_backends = ()

    def list(self, request):
        from interaction.models import Interaction
        from product.models import Book
        from user_account.models import User

        try: 
            user = request.GET.get('uid', None)

            user = User.objects.get(uid=user)

        except: 
            return JsonResponse({"data": None, "error_code": 500})

        user_interaction = Interaction.objects.filter(user=user).order_by("-updated_at")

        from django.http import JsonResponse
        print(user_interaction)
        # if len(user_interaction) <2 :
        #     return JsonResponse({"data": None, "error_code": 0})

        rated_books = Book.objects.filter(
            uid__in=user_interaction.values_list("book__uid")
        )

        categories = rated_books.values_list("categories")

        # recommend_book = Book.objects.filter(categories__in=categories[:3]).exclude(
        #     sku__in=rated_books
        # )

        recommend_book = Book.objects.exclude(
            uid__in=user_interaction.values_list("book__uid")
        )

        recommend_book = recommend_book.exclude(
            rating_count__gte=50, rating_sum__lte=150
        )

        recommend_book = recommender.cf_filter(
            categories.values_list("categories__cf_index", flat=True), recommend_book, 10
        )

        try:

            return JsonResponse(
                {
                    "data": {
                        "recommended_books": serializers.ItemSerializer(
                            recommend_book, many=True
                        ).data,
                        "rated_book": serializers.ItemSerializer(
                            rated_books, many=True
                        ).data,
                    },
                    "error_code": 0,
                }
            )
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({"data": None, "error_code": 0})


class RecommendProductByIndex(generics.ListAPIView):
    from rest_framework import pagination

    queryset = models.Book.objects.all()
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    # filter_backends = ()

    def list(self, request):
        # from interaction.models import Interaction
        # from product.models import Book
        from django.http import JsonResponse
        
        index_list = request.GET.get('index_list', '')
        index_list = list(map(int,index_list.split(',')))
        recommend_book = ','.join(map(str,recommender.cf_filter_by_sku(
            index_list, 10
        )))

        try:
            return JsonResponse(
                {
                    "data": {
                        "sku_list": recommend_book,
                    },
                    "error_code": 0,
                }
            )
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({"data": None, "error_code": 0})
class RelatedProduct(generics.ListAPIView):
    from rest_framework import pagination

    queryset = models.Book.objects.all()
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [filters.SearchFilter, product_filters.ContentFilter]
    search_fields = ["name"]
    # filter_backends = ()

    def list(self, request):

        from django.http import JsonResponse

        try:

            data = super().list(request).data

            return JsonResponse({"data": data, "error_code": 0})
        except Exception as e:
            print(f"Exception while filtering: {e}")
            raise e
        return JsonResponse({"data": None, "error_code": 0})


class CategoryTree(generics.ListAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    pagination_class = None

    def list(self, request):
        from django.http import JsonResponse

        data = super().list(request).data
        category_names = [d["name"] for d in data]
        category_tree = {}
        for idx, category_name in enumerate(category_names):
            category_tree[category_name] = {"children": [], "uid": data[idx]["uid"]}
        for category in data:
            if category["parent"]:
                category_tree[category["parent"]["name"]]["children"].append(
                    {category["name"]: category_tree[category["name"]]}
                )
        # print(category_tree)

        response_data = {"root": category_tree["root"]}

        return JsonResponse({"data": response_data, "error_code": 0})
