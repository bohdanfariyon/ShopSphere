# ShopSphere 🛍️

## 📋 Опис

ShopSphere - це сучасний веб-застосунок електронної комерції, що поєднує потужний бекенд на Django з інтерактивним фронтендом на React. Проект використовує PostgreSQL для надійного зберігання даних та Docker для простого розгортання.

## 🔧 Технічний стек

- **Бекенд**: Django (Python 3.9)
- **Фронтенд**: React
- **База даних**: PostgreSQL
- **Контейнеризація**: Docker і Docker Compose

## ⚙️ Вимоги

Переконайтеся, що у вас встановлені:

- [Git](https://git-scm.com/downloads) - Система контролю версій
- [Docker](https://www.docker.com/products/docker-desktop) - Платформа контейнеризації
- [Docker Compose](https://docs.docker.com/compose/install/) - Інструмент для визначення та запуску Docker-застосунків
- [Node.js](https://nodejs.org/) (v14+) і npm - Для розробки фронтенду

## 🔍 Структура проекту

```
ShopSphere/
├── backend/                 # Бекенд частина проекту
│   ├── app/                # Django проект
│   │   ├── core/          # Основний додаток з налаштуваннями
│   │   ├── user/          # Додаток для управління користувачами
│   │   ├── product/       # Додаток для управління продуктами
│   │   ├── manage.py      # Файл управління Django
│   │   └── requirements.txt # Залежності Python
│   ├── docker-compose.yml  # Налаштування Docker Compose
│   └── Dockerfile         # Конфігурація Docker образу
├── frontend/              # React застосунок
│   ├── public/
│   └── src/
└── README.md             # Документація проекту
```

## 🚀 Інструкції з встановлення

### 1. Клонування проекту

```bash
# Клонуємо репозиторій
git clone https://github.com/bohdanfariyon/ShopSphere.git

# Переходимо в директорію проекту
cd ShopSphere
```

### 2. Налаштування бекенду

```bash
# Переходимо в директорію бекенду
cd backend

# Створюємо Docker-контейнери
docker-compose build

# Створюємо суперкористувача для управління магазином
docker-compose run --rm app python manage.py createsuperuser

# Запускаємо Docker-контейнери
docker-compose up
```

Ця команда:
- 🏗️ Створить необхідні Docker-контейнери
- 👤 Створить суперкористувача для доступу до адмін-панелі
- 🔄 Виконає міграції бази даних
- 🚀 Запустить Django-сервер на порту 8000

### Вхід до адмін-панелі

1. Відкрийте браузер і перейдіть за адресою: http://localhost:8000/admin
2. Введіть облікові дані суперкористувача:

    - Username: (ім'я користувача, яке ви вказали при створенні суперкористувача)
    - Password: (пароль, який ви вказали при створенні суперкористувача)


3. Після успішної автентифікації ви отримаєте доступ до адміністративної панелі Django, де зможете:

    - Управляти користувачами
    - Додавати/редагувати/видаляти товари
    - Керувати замовленнями
    - Налаштовувати параметри магазину

### 3. Налаштування фронтенду

```bash
# В новому терміналі переходимо до фронтенду
cd ../frontend/ecommerce-frontend

# Встановлюємо залежності
npm install

# Запускаємо фронтенд
npm start
```

## 📌 Доступ до застосунку

Після успішного запуску, застосунок буде доступний за адресами:

- **Бекенд**: [http://localhost:8000](http://localhost:8000)
- **Фронтенд**: [http://localhost:3000](http://localhost:3000)

## 🛠️ Корисні команди Docker

```bash
# Зупинити контейнери
docker-compose down

# Перезапустити контейнери
docker-compose up --build

# Переглянути логи контейнерів
docker-compose logs

# Увійти в контейнер
docker-compose exec backend bash

# Створити міграції
docker-compose exec backend python manage.py makemigrations

# Застосувати міграції
docker-compose exec backend python manage.py migrate

# Створити суперкористувача
docker-compose exec backend python manage.py createsuperuser
```

## 📝 Примітки

- Переконайтеся, що порти 8000 та 3000 вільні на вашій машині
- Для розробки рекомендується використовувати віртуальне середовище Python
- Регулярно оновлюйте залежності для безпеки та стабільності
- Для доступу до адмін-панелі Django використовуйте URL: http://localhost:8000/admin/

