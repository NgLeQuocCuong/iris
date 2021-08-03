from django.contrib import auth
import jwt
from django.conf import settings


def create_user_account(email, password):
    """
        A services function to create a normal user

        @param: email - A string of user's email
        @param: password - A string of user's password
    """
    user = auth.get_user_model().objects.create_user(
        email=email,
        password=password,
        is_admin=False
    )

    return user

def active_user_account(email):
    try:
        user = auth.get_user_model().objects.get(email=email)
        from utils.fields.status import StatusChoices
        if user.status == StatusChoices.REMOVE:
            return False
        else:
            user.status = StatusChoices.ACTIVE
            user.save()
            return True
    except Exception as e:
        return False

def get_and_authenticate_user(email, password):
    user = auth.authenticate(email=email, password=password)
    if user is None:
        from rest_framework import serializers
        raise serializers.ValidationError("Invalid username/password")
    return user

def logout_user_account(token):
    from rest_framework_simplejwt.tokens import RefreshToken
    try:
        token = RefreshToken(token['token'])
        token.blacklist()
        return None, True
    except Exception as e:
        print(e)
        return e.args, False

def change_user_password(user : auth.get_user_model(), password):
    user.set_password(password)
    user.save()

def reset_user_password(token, password):
    user = auth.get_user_model().objects.get(email=token)
    change_user_password(user, password)
