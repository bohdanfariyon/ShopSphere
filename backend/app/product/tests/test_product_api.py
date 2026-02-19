import pytest
from django.urls import reverse
from rest_framework import status
from core.models import Product, Category

PRODUCTS_URL = reverse('product:product-list')

@pytest.mark.django_db
class TestProductApi:
    def test_retrieve_products(self, auth_client, product):
        """Тест отримання списку товарів (Integration)"""
        res = auth_client.get(PRODUCTS_URL)
        assert res.status_code == status.HTTP_200_OK
        assert len(res.data['results']) == 1

    def test_filter_products_by_category(self, auth_client, product, category):
        """Тест фільтрації за категорією"""
        res = auth_client.get(PRODUCTS_URL, {'category': category.name})
        assert res.status_code == status.HTTP_200_OK
        assert res.data['results'][0]['category']['name'] == category.name