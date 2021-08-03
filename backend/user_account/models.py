from django.db import models
from utils.model import BaseModel
from django.contrib.auth import models as django_models


class BaseUserManager(django_models.BaseUserManager):
    def create_user(self, email, password=None, is_admin=False):
        """ 
            Create a new user with given email and password.
            If email or password is missing, then raise error.

            @param: email - A string of user's email (Unchecked valid email)
            @param: password - A string of password (Unchecked valid password)
            @param: is_admin - Defaults state is False
        """

        if not email or password is None:
            raise ValueError('User must have an email address and a password')

        user = self.model(
            email=self.normalize_email(email.lower()),
            is_admin=is_admin,
            name=''
        )
        print(password)
        user.set_password(password)

        # user.full_clean()
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """
            Create super-user (is_admin = True, is_active = True by defaults) with the given email and password
            If email or password is missing, then raise Error

            @param: email - User's email
            @param: password - User's password
        """

        user = self.create_user(
            email=email,
            password=password,
            is_admin=True,
        )

        from utils.fields import status
        user.is_superuser = True
        user.status = status.StatusChoices.ACTIVE
        user.save(using=self._db)

        return user


class User(BaseModel, django_models.AbstractBaseUser, django_models.PermissionsMixin):

    email = models.EmailField(
        verbose_name='email_address',
        max_length=255,
        unique=True
    )

    USERNAME_FIELD = 'email'

    is_admin = models.BooleanField(default=False)
    name = models.CharField(max_length=50, default='')
    objects = BaseUserManager()

    def __str__(self):
        return self.email

    def is_staff(self):
        return self.is_admin

    @property
    def is_active(self):
        from utils.fields import status
        return not (self.status in (status.StatusChoices.REMOVE, status.StatusChoices.WATTING))

