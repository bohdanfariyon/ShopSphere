import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def auth_client(api_client):
    """Фікстура для авторизованого клієнта"""
    user = get_user_model().objects.create_user(
        email='test@example.com',
        password='password123',
        name='Test User'
    )
    api_client.force_authenticate(user=user)
    return api_client

@pytest.fixture
def category(db):
    from core.models import Category
    return Category.objects.create(name='Electronics')

@pytest.fixture
def product(db, category):
    from core.models import Product
    return Product.objects.create(
        name='Test Product',
        price=100.00,
        quantity=10,
        category=category
    )