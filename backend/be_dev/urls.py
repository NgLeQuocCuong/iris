from django.contrib import admin
from django.urls import path, include

from user_account import urls as user_urls
from product import urls as product_urls
from interaction import urls as interaction_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('auth/', include(user_urls.urlpatterns)),
        path('product/', include(product_urls.urlpatterns)),
        path('interaction/', include(interaction_urls.urlpatterns))
    ]))
]
