import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def run_shopsphere_scraper():
    chrome_options = Options()
    # chrome_options.add_argument("--headless") 
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    wait = WebDriverWait(driver, 10)

    try:
        # 1. АВТОРИЗАЦІЯ (як і раніше)
        print("🔗 Перехід на сторінку авторизації...")
        driver.get("http://localhost:3000/login")
        
        email_input = wait.until(EC.presence_of_element_located((By.NAME, "email")))
        email_input.send_keys("test@example.com") 
        password_input = driver.find_element(By.NAME, "password")
        password_input.send_keys("password123", Keys.ENTER)
        
        print("✅ Авторизація виконана.")
        time.sleep(3) # Чекаємо редиректу на Home

        all_products = []
        page_num = 1

        while True:
            print(f"📦 Скрапінг сторінки №{page_num}...")
            
            # Чекаємо завантаження карток товарів
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "a[href^='/product/']")))
            
            # Зчитуємо дані на поточній сторінці
            product_links = driver.find_elements(By.CSS_SELECTOR, "a[href^='/product/']")
            product_prices = driver.find_elements(By.CSS_SELECTOR, "span.text-2xl.font-bold")

            for i in range(min(len(product_links), len(product_prices))):
                name = product_links[i].text.strip()
                price = product_prices[i].text.strip()
                if name:
                    all_products.append({"name": name, "price": price})

            # 2. ПЕРЕХІД НА НАСТУПНУ СТОРІНКУ
            try:
                # Шукаємо останню кнопку в блоці пагінації (це кнопка ChevronRight)
                # Використовуємо XPath, щоб знайти кнопку, яка НЕ є disabled
                next_button = driver.find_elements(By.CSS_SELECTOR, "button.p-2.rounded-md.border.bg-white")[-1]
                
                if next_button.is_enabled():
                    print("➡️ Перехід на наступну сторінку...")
                    driver.execute_script("arguments[0].click();", next_button) # Натискаємо через JS для надійності
                    page_num += 1
                    time.sleep(2) # Час на завантаження нової сторінки та скрол вгору
                else:
                    print("🏁 Наступних сторінок немає (кнопка заблокована).")
                    break
            except Exception:
                print("🏁 Блок пагінації не знайдено або це остання сторінка.")
                break

        # Вивід результатів
        print("\n" + "="*50)
        print(f"✅ ВСЬОГО ЗІБРАНО ТОВАРІВ: {len(all_products)}")
        print("="*50)
        for prod in all_products:
            print(f"🛒 {prod['name']} — {prod['price']}")

    except Exception as e:
        print(f"❌ Помилка під час скрапінгу: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    run_shopsphere_scraper()