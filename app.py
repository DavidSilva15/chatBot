from flask import Flask, render_template, request, redirect, url_for
import pywhatkit
import pyautogui
import time
from threading import Thread

app = Flask(__name__)
numeros_enviados = {}

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html', numeros_enviados=numeros_enviados)

# Função para enviar mensagem
def enviar_mensagem_async(numero, mensagem, hora, minuto):
    global numeros_enviados
    try:
        pywhatkit.sendwhatmsg(numero, mensagem, int(hora), int(minuto), wait_time=50)
        time.sleep(2)  # Aguarda 2 segundos após o envio da mensagem
        pyautogui.hotkey('ctrl', 'w')  # Fecha a guia atual
        time.sleep(2)  # Aguarda 2 segundos
        pyautogui.press('enter')
        print()
        print(f"Mensagem enviada para {numero} com sucesso!")
    except Exception as e:
        print()
        print(f"Erro ao enviar mensagem para {numero}: {e}")

    # Adiciona o número à lista de números enviados
    index = len(numeros_enviados) + 1
    numeros_enviados[index] = numero

# Rota para enviar a mensagem
@app.route('/enviar', methods=['POST'])
def enviar_mensagem():
    global numeros_enviados
    numeros = request.form.getlist('numero[]')
    horas = request.form.getlist('hora[]')
    minutos = request.form.getlist('minuto[]')
    mensagem = request.form['mensagem']

    numeros_enviados = {}
    for numero, hora, minuto in zip(numeros, horas, minutos):
        # Envia a mensagem em uma thread separada
        thread = Thread(target=enviar_mensagem_async, args=(numero, mensagem, hora, minuto))
        thread.start()

    return redirect(url_for('index'))

# Iniciar o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)