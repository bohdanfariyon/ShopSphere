import random
from locust import HttpUser, task, between, tag

class ShopSpherePerformanceUser(HttpUser):
    wait_time = between(1, 5) # Імітація того, що користувач читає опис
    token = None

    def on_start(self):
        """Виконується один раз для кожного користувача при старті"""
        # 1. Авторизація (використовуємо існуючого тестового юзера)
        payload = {
            "email": "test@example.com",
            "password": "password123"
        }
        with self.client.post("/api/user/token/", json=payload, name="Auth_Login") as response:
            if response.status_code == 200:
                self.token = response.json().get('token')
                self.headers = {'Authorization': f'Token {self.token}'}

    @task
    def complete_shopping_flow(self):
        """Складний ланцюжковий сценарій"""
        if not self.token:
            return

        # КРОК 1: Отримуємо категорії
        with self.client.get("/api/product/category/", headers=self.headers, name="Step1_GetCategories") as resp:
            if resp.status_code != 200 or not resp.json():
                return
            categories = resp.json()
            random_category = random.choice(categories)['name']

        # КРОК 2: Фільтруємо товари за обраною категорією (використовуємо результат кроку 1)
        with self.client.get(f"/api/product/products/?category={random_category}", 
                             headers=self.headers, 
                             name="Step2_FilterProducts") as resp:
            if resp.status_code != 200:
                return
            results = resp.json().get('results', [])
            if not results:
                return
            target_product = random.choice(results)
            product_id = target_product['id']

        # КРОК 3: Перегляд деталей конкретного товару (використовуємо ID з кроку 2)
        self.client.get(f"/api/product/products/{product_id}/", 
                        headers=self.headers, 
                        name="Step3_ProductDetail")

        # КРОК 4: Додавання в кошик
        cart_payload = {"quantity": 1}
        with self.client.post(f"/api/product/products/{product_id}/add-to-cart/", 
                              json=cart_payload, 
                              headers=self.headers, 
                              name="Step4_AddToCart") as resp:
            if resp.status_code != 201:
                return

        # КРОК 5: Оформлення замовлення (фінальна точка)
        self.client.post("/api/product/cartitems/place-order/", 
                         headers=self.headers, 
                         name="Step5_PlaceOrder")

    @tag('smoke')
    @task(1)
    def just_browse(self):
        """Простий фоновий запит для порівняння навантаження"""
        self.client.get("/api/product/products/", headers=self.headers, name="Simple_Browse")