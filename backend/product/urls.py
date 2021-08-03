from rest_framework import routers
from django.urls import path
from . import views

from django.views.decorators.cache import cache_page

router = routers.DefaultRouter(trailing_slash=False)
router.register("", views.ProductViewSet, basename="product")

urlpatterns = router.urls + [
    path("list_product/", views.PopularProduct.as_view(), name="List Product"),
    path("category_tree/", views.CategoryTree.as_view(), name="Category tree"),
    path(
        "recommend/",
        cache_page(6)(views.RecommendProduct.as_view()),
        # views.RecommendProduct.as_view(),
        name="Recomend Product",
    ),
    path("author/", views.AuthorView.as_view(), name="Authors"),
    path("publisher/", views.PublisherView.as_view(), name="Publisher"),
    path("related/", views.RelatedProduct.as_view(), name="Related Product"),
    path("recommend_by_index/", views.RecommendProductByIndex.as_view(), name="Recommend by index"),
]
