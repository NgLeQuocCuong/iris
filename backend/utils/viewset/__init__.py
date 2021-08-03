from rest_framework import viewsets

from django import http

from utils.serializers import EmptySerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

PAGE_SIZE = 10
PAGE_SIZE_MAX = 50

def paginate_data(request, data):
    '''
    Function to handle pagination data.

    Params:

    data: array data.

    request: request object that contain paginate info

    page: page to show (Default is 1).

    page_size: Defaults is 10 (PAGE_SIZE=10).

    Return a JSON data:

    response_data = {
        "totalRows": total,
        "totalPages": total_pages,
        "currentPage": page_number,
        "content": content
    }
    '''

    page = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('page_size', PAGE_SIZE))

    # Handle page_size = 'all'
    # page_size = 0 for get all
    if page_size == 0:
        page_size = len(data) + 1
    elif page_size < 0:
        raise ValueError()
    elif page_size > PAGE_SIZE_MAX:
        raise ValueError()

    paginator = Paginator(data, page_size)

    total_pages = paginator.num_pages

    if int(total_pages) < page:
        page_number = page
        content = []
    else:
        current_page = paginator.page(page)
        page_number = current_page.number
        content = current_page.object_list

    total = paginator.count

    response_data = {
        "totalRows": total,
        "totalPages": total_pages,
        "currentPage": page_number,
        "content": content,
        "pageSize": page_size
    }

    return response_data


class BaseView(viewsets.GenericViewSet):
    serializer_class = EmptySerializer

    def get_serializer_class(self):
        from django.core.exceptions import ImproperlyConfigured

        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

    def get_response(self, data, error_code):
        return http.JsonResponse(
            data={
                'data': data,
                'error_code': error_code
            }
        )

