from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Inicializar o driver do Selenium
driver = webdriver.Chrome()  # ou webdriver.Firefox() se estiver usando Firefox

# Definir URL da página para testes
url = "http://localhost:3000 "  # Substitua pelo URL real

def setup():
    driver.get(url)
    driver.maximize_window()

def test_password_min_length():
    setup()
    password_field = driver.find_element(By.ID, "senha")
    password_field.send_keys("12345678")
    assert password_field.get_attribute("value") == "12345678", "Senha com tamanho mínimo falhou"
    
    password_field.clear()
    password_field.send_keys("1234567")
    assert password_field.get_attribute("value") != "12345678", "Senha abaixo do tamanho mínimo passou"

def test_phone_validation():
    setup()
    phone_field = driver.find_element(By.ID, "telefone")
    phone_field.send_keys("(11) 91234-5678")
    assert phone_field.get_attribute("value") == "(11) 91234-5678", "Telefone válido falhou"

    phone_field.clear()
    phone_field.send_keys("(11) 1234-5678")
    assert phone_field.get_attribute("value") != "(11) 91234-5678", "Telefone inválido passou"

def test_cpf_validation():
    setup()
    cpf_field = driver.find_element(By.ID, "cpf")
    cpf_field.send_keys("123.456.789-09")
    assert cpf_field.get_attribute("value") == "123.456.789-09", "CPF válido falhou"

    cpf_field.clear()
    cpf_field.send_keys("123.456.789-00")
    assert cpf_field.get_attribute("value") != "123.456.789-09", "CPF inválido passou"

def test_email_validation():
    setup()
    email_field = driver.find_element(By.ID, "email")
    email_field.send_keys("teste@exemplo.com")
    assert email_field.get_attribute("value") == "teste@exemplo.com", "Email válido falhou"

    email_field.clear()
    email_field.send_keys("teste@exemplo@com")
    assert email_field.get_attribute("value") != "teste@exemplo.com", "Email inválido passou"

def test_double_check_email_password():
    setup()
    email_field = driver.find_element(By.ID, "email")
    confirm_email_field = driver.find_element(By.ID, "confirmar_email")
    password_field = driver.find_element(By.ID, "senha")
    confirm_password_field = driver.find_element(By.ID, "confirmar_senha")

    email_field.send_keys("teste@exemplo.com")
    confirm_email_field.send_keys("teste@exemplo.com")
    password_field.send_keys("Senha123")
    confirm_password_field.send_keys("Senha123")
    
    assert email_field.get_attribute("value") == confirm_email_field.get_attribute("value"), "Emails não coincidem"
    assert password_field.get_attribute("value") == confirm_password_field.get_attribute("value"), "Senhas não coincidem"

def test_success():
    setup()
    driver.find_element(By.ID, "telefone").send_keys("(75) 55544-4444")
    driver.find_element(By.ID, "cpf").send_keys("210.830.180-19")
    driver.find_element(By.ID, "email").send_keys("teste@teste.com.br")
    driver.find_element(By.ID, "senha").send_keys("12345678")
    driver.find_element(By.ID, "confirmar_senha").send_keys("12345678")

    submit_button = driver.find_element(By.ID, "submit")
    submit_button.click()

    success_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "success_message"))
    )
    assert success_message.is_displayed(), "Mensagem de sucesso não exibida"

def run_tests():
    test_password_min_length()
    test_phone_validation()
    test_cpf_validation()
    test_email_validation()
    test_double_check_email_password()
    test_success()
    print("Todos os testes foram executados com sucesso!")

try:
    run_tests()
finally:
    driver.quit()
