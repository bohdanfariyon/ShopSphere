from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from product import serializers
from rest_framework.decorators import action
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from core.models import Product, Category

@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'category',
                OpenApiTypes.STR,
                description='Filter by items category'
            ),
            OpenApiParameter(
                'sort_field',
                OpenApiTypes.STR,
                description='Sort items by...'
            ),
            OpenApiParameter(
                'sort_order',
                OpenApiTypes.STR, enum=['asc', 'desc'],
                description='Filter by items assigned tp recipes'
            ),
        ]
    )
)
class ProductView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Product.objects.all()
    serializer_class = serializers.DetailProductSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name']

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ListProductSerializer
        elif self.action == 'add-feedback':
            return serializers.ReviewSerializer
        else:
            return self.serializer_class

    def get_queryset(self):
        # Отримання назви категорії з параметрів запиту
        category_name = self.request.query_params.get('category', None)

        # Отримання поля сортування і порядку (asc/desc) з параметрів запиту
        sort_field = self.request.query_params.get('sort_field', 'name')  # Поле за замовчуванням - 'name'
        sort_order = self.request.query_params.get('sort_order', 'asc')   # За замовчуванням - за зростанням

        # Формування порядку сортування
        if sort_order == 'desc':
            sort_field = f'-{sort_field}'  # Додаємо '-' для спаду

        # Якщо не вказано категорію, повертаємо всі продукти
        if category_name is None or category_name == 'All':
            return self.queryset.order_by(sort_field).distinct()

        # Отримання категорії за назвою
        try:
            category = Category.objects.get(name=category_name)
            return self.queryset.filter(category=category).order_by(sort_field).distinct()
        except Category.DoesNotExist:
        # Якщо категорії не існує, повертаємо порожній queryset
            return self.queryset.none()
    @extend_schema(
        request=serializers.ReviewSerializer,
        responses={201: serializers.ReviewSerializer},
    )
    @action(methods=['POST'], detail=True, url_path='add-feedback')
    def add_feedback(self, request, pk=None):
        """Add feedback to product"""
        product = self.get_object()
        
        # Додаємо product_id до даних запиту
        data = request.data.copy()
        data['product'] = product.id
        
        serializer = serializers.ReviewSerializer(data=data)  # Явно вказуємо ReviewSerializer
        
        if serializer.is_valid():
            review = serializer.save(user=self.request.user)
            return Response(
                serializers.ReviewSerializer(review).data,  
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
