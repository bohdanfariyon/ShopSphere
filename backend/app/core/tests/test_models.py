from django.test import TestCase
from django.contrib.auth import get_user_model
from core import models

def create_user(email='test@example.com', password='password123'):
    """Допоміжна функція для створення користувача"""
    return get_user_model().objects.create_user(email, password)

class ModelTests(TestCase):
    """Тести для моделей системи ShopSphere"""

    # --- Тести для моделі User ---
    def test_user_with_email_successful(self):
        """Тест створення користувача з email успішний"""
        email = 'test@example.com'
        password = 'password123'
        user = get_user_model().objects.create_user(
            email=email,
            password=password,
        )
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Тест нормалізації email (нижній регістр)"""
        sample_emails = [
            ['test1@EXAMPLE.com', 'test1@example.com'],
            ['Test2@Example.com', 'Test2@example.com'],
        ]
        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(email, 'pass123')
            self.assertEqual(user.email, expected)

    def test_new_user_invalid_email(self):
        """Тест, що створення користувача без email викликає помилку"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'pass123')

    def test_create_new_superuser(self):
        """Тест створення суперкористувача (адміна)"""
        user = get_user_model().objects.create_superuser(
            'admin@example.com',
            'pass123',
        )
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    # --- Тести для моделі Category ---
    def test_category_str(self):
        """Тест рядкового представлення категорії"""
        category = models.Category.objects.create(name='Electronics')
        self.assertEqual(str(category), category.name)

    # --- Тести для моделі Product ---
    def test_product_str(self):
        """Тест рядкового представлення продукту"""
        category = models.Category.objects.create(name='Laptops')
        product = models.Product.objects.create(
            name='MacBook Pro',
            price=2500.00,
            quantity=5,
            category=category
        )
        self.assertEqual(str(product), product.name)

    def test_product_with_discount(self):
        """Тест збереження полів знижки продукту"""
        category = models.Category.objects.create(name='Sale')
        product = models.Product.objects.create(
            name='Phone',
            price=1000.00,
            quantity=10,
            category=category,
            discount=10.00,
            discount_type='percentage'
        )
        self.assertEqual(product.discount, 10.00)
        self.assertEqual(product.discount_type, 'percentage')