from rest_framework import filters


class InteractionFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        base_product_id = request.GET.get('id', None)
        return queryset.filter(book__uid=base_product_id).exclude(content="nan")