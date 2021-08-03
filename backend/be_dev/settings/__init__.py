from ._defaults import *
from datetime import timedelta
import os

INSTALLED_APPS += [
    'corsheaders',

    'rest_framework',

    'rest_framework_simplejwt.token_blacklist', # For logout 


    'user_account',

    'product',

    'interaction',
]

AUTH_USER_MODEL     = 'user_account.User'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': './cache',
        'TIMEOUT': 60,
        'OPTIONS': {
            'MAX_ENTRIES': 1000
        }
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],

    'DEFAULT_PAGINATION_CLASS': 'utils.viewset.pagination.LargeResultsSetPagination',
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 24,

    'DATETIME_FORMAT': '%s'
}

CORS_ALLOW_ALL_HOST = True
CORS_ALLOW_ALL_ORIGINS = True

MIDDLEWARE += [

    

]


# Email config
EMAIL_USE_TLS       = True
EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST          = ''
EMAIL_HOST_USER     =''
EMAIL_HOST_PASSWORD =''
EMAIL_PORT          = 587
DEFAULT_FROM_EMAIL  = EMAIL_HOST_USER

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

STATIC_ROOT = os.path.join(BASE_DIR, 'static')