from rest_framework import routers
from django.urls import path
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register("", views.GetInteractionOfProduct, basename="interaction")

urlpatterns = router.urls

