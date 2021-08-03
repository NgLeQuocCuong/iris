from rest_framework import routers
from . import views 

router = routers.DefaultRouter(trailing_slash=False)
router.register('', views.AuthViewSet, basename='authorization')

urlpatterns = router.urls
