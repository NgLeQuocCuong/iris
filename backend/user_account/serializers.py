from rest_framework import serializers

from django.contrib import auth

from django.conf import settings

import jwt


User = auth.get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    """
        A user serializer for registering the user
    """

    class Meta:
        model = User
        fields = ('email', 'password')

    def validate_email(self, value):
        """
            Check for valid email (not exists in the system), and return an normalizer email
            If not, raise Error (type: serialzer.ValidationError)

            @param: value - A string of user's email
        """
        user = User.objects.filter(email=value)
        if user:
            raise serializers.ValidationError('Email is already taken')
        return auth.models.BaseUserManager.normalize_email(value)

    def validate_password(self, value):
        """
            Check for valid password (descriptions in settings module). 
            If not, raise Error.

            @param: value - A string of password
        """
        auth.password_validation.validate_password(value)
        return value

class ActiveSerializer(serializers.Serializer):
    """
        To active account, user must give the token (user & exp)
    """

    token = serializers.CharField()

    def validate_token(self, value):
        """
            Check for valid token, token can be decode or not and expired or not
            And then return email

            @param: value - A string of token
        """

        try:
            token = jwt.decode(value,key=settings.SECRET_KEY,algorithms=["HS256"], options={'verify_exp':True})
        except jwt.ExpiredSignatureError as e:
            raise serializers.ValidationError('Token is expired')
        except Exception as e:
            raise serializers.ValidationError('Token is not correct')
        return token['email']

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate_email(self, value):
        user = User.objects.filter(email=value)
        if not user:
            raise serializers.ValidationError('Email is not exists')
        return auth.models.BaseUserManager.normalize_email(email=value)

    def validate_password(self, value):
        auth.password_validation.validate_password(password=value)
        return value

class AuthSerializer(serializers.Serializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff')
        read_only_fields = ('id', 'is_active', 'is_staff')
    
    def get_token(self, obj):
        from rest_framework_simplejwt.tokens import RefreshToken

        refresh = RefreshToken.for_user(user=obj)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return token

class ChangePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('full_name', 'password')

    current_password = serializers.CharField()
    new_password = serializers.CharField()

    def validate_current_password(self, value):
        auth.password_validation.validate_password(password=value)
        return value

    def validate_new_password(self, value):
        auth.password_validation.validate_password(password=value)
        return value

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.CharField()

    def validate_email(self, value):
        user = User.objects.filter(email=value)
        if not user:
            raise serializers.ValidationError('User is not exist')
        return value

class ResetPasswordSerializer(serializers.Serializer):
    """
        
    """

    token = serializers.CharField()
    password = serializers.CharField()

    def validate_token(self, value):
        """
            Check for valid token, token can be decode or not and expired or not
            And then return email

            @param: value - A string of token
        """

        try:
            token = jwt.decode(value,key=settings.SECRET_KEY,algorithms=["HS256"], options={'verify_exp':True})
        except jwt.ExpiredSignatureError as e:
            raise serializers.ValidationError('Token is expired')
        except Exception as e:
            raise serializers.ValidationError('Token is not correct')
        return token['email']

    def validate_password(self, value):
        auth.password_validation.validate_password(password=value)
        return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'uid']
        read_only_fields = fields