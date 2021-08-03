from rest_framework import (
    permissions,
    decorators,
    exceptions,
    generics,
    filters,
    viewsets,
)
from . import serializer, models, filter as interaction_filter
from utils import viewset


from django.http import JsonResponse

# Create your views here.


class GetInteractionOfProduct(viewsets.GenericViewSet):
    queryset = models.Interaction.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializer.InteractionSerializer
    filter_backends = [filters.SearchFilter, interaction_filter.InteractionFilter]
    search_fields = ["uid"]

    @decorators.action(methods=["GET"], detail=False, url_path="list")
    def list_interaction(self, request):
        uid = request.GET.get("uid", None)

        try:
            data = models.Interaction.objects.filter(book__uid=uid)
            data = serializer.InteractionSerializer(data, many=True).data
            # pagination = viewset.pagination.LargeResultsSetPagination().paginate_queryset(data, request).get_paginated_response()
            data = viewset.paginate_data(request, data)

            return JsonResponse({"data": data, "error_code": 0})
        except Exception as e:
            print(f"Exception while filtering: {e}")
        return JsonResponse({"data": None, "error_code": 0})

    @decorators.action(methods=["GET"], detail=False, url_path="get")
    def get_rate_of_user(self, request):
        user = request.user
        book = request.GET.get("uid", None)
        try:
            interaction = models.Interaction.objects.get(user=user, book__uid=book)
            return JsonResponse(
                {
                    "data": serializer.InteractionSerializer(interaction).data,
                    "error_code": 0,
                }
            )
        except:
            return JsonResponse({"data": None, "error_code": 0})

    @decorators.action(methods=["POST"], detail=False, url_path="rate")
    def create_rate_of_user(self, request):
        user = request.user
        book = request.POST.get("uid", None)
        rate = request.POST.get("rate", None)
        content = request.POST.get("content", "")
        header = request.POST.get("header", "")

        try:
            interaction = models.Interaction.objects.get(user=user, book__uid=book)
            interaction.rating = rate
            interaction.content = content
            interaction.header = header
            interaction.save()

            return JsonResponse(
                {
                    "data": serializer.InteractionSerializer(interaction).data,
                    "error_code": 0,
                }
            )
        except:
            try:
                from product.models import Book

                book_obj = Book.objects.get(uid=book)
            except:
                return JsonResponse({"data": None, "error_code": 500})

            interaction = models.Interaction.objects.create(
                user=user,
                book=book_obj,
                rating=rate,
                content=content,
                header=header,
            )
            return JsonResponse(
                {
                    "data": serializer.InteractionSerializer(interaction).data,
                    "error_code": 0,
                }
            )
