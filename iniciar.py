import os
import subprocess
import webbrowser
import time

# Diretório onde o arquivo app.py está localizado
diretorio = os.path.dirname(os.path.abspath(__file__))

# Comando para executar o arquivo app.py
comando = f"cd {diretorio} && python app.py"

# Iniciar o servidor Flask em um processo separado
print("Iniciando o servidor do chatBot...")
print()
processo = subprocess.Popen(comando, shell=True)

# Aguardar um curto período de tempo para o servidor Flask começar a executar
time.sleep(6)

# URL da página a ser aberta
url = "http://localhost:5000/"

# Mostrar no console que o servidor está funcionando e onde a página está rodando
print("Servidor do chatBot está em execução.")
print()
print(f"A página para envio está rodando em: {url}")

# Abrir a página no navegador padrão
webbrowser.open(url)

# Aguardar o servidor terminar
processo.wait()
