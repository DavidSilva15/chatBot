/*document.getElementById('importExcel').addEventListener('click', function () {
    var input = document.getElementById('excelFile');
    input.click();
});

document.getElementById('excelFile').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        var sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // Assume que a coluna F é a sexta coluna (índice 5)
        var numbers = sheetData.map(row => row[3]).filter(num => num !== undefined);

        // Remove parênteses, traços e espaços e adiciona +55
        numbers = numbers.map(number => {
            number = number.toString().replace(/[\(\)\-\s]/g, '');
            if (!number.startsWith('55')) {
                number = '55' + number;
            }
            return '+' + number;
        });

        // Pega o primeiro horário e minuto
        var firstHour = document.querySelector('input.hora.input').value;
        var firstMinute = document.querySelector('input.minuto.input').value;

        var camposContainer = document.getElementById('campos');

        numbers.forEach((number, index) => {
            var hour = firstHour;
            var minute = parseInt(firstMinute) + index;

            // Ajusta hora e minuto corretamente
            while (minute >= 60) {
                minute -= 60;
                hour = (parseInt(hour) + 1).toString().padStart(2, '0');
                if (parseInt(hour) >= 24) {
                    hour = '00';
                }
            }
            minute = minute.toString().padStart(2, '0');

            if (index === 0) {
                // Atualiza o primeiro campo existente
                document.querySelector('input.numero.input').value = number;
                document.querySelector('input.hora.input').value = hour;
                document.querySelector('input.minuto.input').value = minute;
            } else {
                // Adiciona novos campos
                var campo = document.createElement('div');
                campo.className = 'campo';
                campo.innerHTML = `
                <div class="number">
                <label for="numero">Whatsapp:</label><br>
                <input type="text" class="numero input" name="numero[]" value="+55719" autocomplete="off"
                    required><br><br>
            </div>
            <div class="inputs-hora">
                <label for="hora">Hora do envio:</label><br>
                <input type="text" class="hora input" value="19" name="hora[]" min="0" max="23"
                    autocomplete="off" required> :
                <input type="text" class="minuto input" value="00" name="minuto[]" min="0" max="59"
                    autocomplete="off" required><br><br>
            </div>
            <div class="icon">
                <i class="fa fa-trash"></i>
            </div>
        `;
                camposContainer.appendChild(campo);
            }
        });
    };
    reader.readAsArrayBuffer(file);
});

document.getElementById('adicionarCampo').addEventListener('click', function () {
    var campo = document.createElement('div');
    campo.className = 'campo-animated'; // Adicionando a classe de animação
    campo.innerHTML = `
    <div class="campo">
    <div class="number">
        <label for="numero">Whatsapp:</label><br>
        <input type="text" class="numero input" name="numero[]" value="+55719" autocomplete="off"
            required><br><br>
    </div>
    <div class="inputs-hora">
        <label for="hora">Hora do envio:</label><br>
        <input type="text" class="hora input" value="19" name="hora[]" min="0" max="23"
            autocomplete="off" required> :
        <input type="text" class="minuto input" value="00" name="minuto[]" min="0" max="59"
            autocomplete="off" required><br><br>
    </div>
    <div class="icon">
        <i class="fa fa-trash"></i>
    </div>
</div>
`;
    document.getElementById('campos').appendChild(campo)

    let minutoInput = document.querySelectorAll('input.minuto')
    for (let i = 1; i < minutoInput.length; i++) {
        let minutoInicial = parseInt(minutoInput[0].value)
        let minutoAtual = parseInt(minutoInput[i].value)
        minutoInput[i].value = minutoInicial + i
    }

    let horaInput = document.querySelectorAll('input.hora')
    for (let i = 1; i < horaInput.length; i++) {
        horaInput[i].value = horaInput[0].value
    }
});

/*document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-trash')) {
        var campo = event.target.closest('.campo')
        campo.classList.add('removing')
        setTimeout(() => {
            campo.parentNode.removeChild(campo)
        }, 500)
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Mostrar a tela de carregamento
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    // Exibir o conteúdo e esconder a tela de carregamento quando a página estiver totalmente carregada
    window.addEventListener('load', function () {
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
    });
});*/

//Função para chamar o explorador de arquivos para a busca do arquivo Excel
document.getElementById('importExcel').addEventListener('click', function () {
    var input = document.getElementById('excelFile')
    input.click()
})

//Função criada usando a biblioteca SheetJS para capturar os números da planilha e passar para os inputs de números
document.getElementById('excelFile').addEventListener('change', function (event) {
    var file = event.target.files[0]
    var reader = new FileReader()
    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result)
        var workbook = XLSX.read(data, { type: 'array' })
        var firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        var sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })

        //Assume que a coluna F é a sexta coluna (índice 3)
        var numbers = sheetData.map(row => row[3]).filter(num => num !== undefined)

        //Remove parênteses, traços e espaços e adiciona +55
        numbers = numbers.map(number => {
            number = number.replace(/[\(\)\-\s]/g, '')
            if (!number.startsWith('55')) {
                number = '55' + number
            }
            return '+' + number
        })

        //Pega o primeiro horário e minuto
        var firstHour = document.querySelector('input.hora.input').value
        var firstMinute = document.querySelector('input.minuto.input').value

        var camposContainer = document.getElementById('campos')

        numbers.forEach((number, index) => {
            var hour = firstHour
            var minute = parseInt(firstMinute) + index

            //Ajusta hora e minuto corretamente
            while (minute >= 60) {
                minute -= 60
                hour = (parseInt(hour) + 1).toString().padStart(2, '0')
                if (parseInt(hour) >= 24) {
                    hour = '00'
                }
            }
            minute = minute.toString().padStart(2, '0')

            if (index === 0) {
                //Atualiza o primeiro campo existente
                document.querySelector('input.numero.input').value = number
                document.querySelector('input.hora.input').value = hour
                document.querySelector('input.minuto.input').value = minute
            } else {
                //Adiciona novos campos
                var campo = document.createElement('div')
                campo.className = 'campo'
                campo.innerHTML = `
            <div class="number">
                <label for="numero">Whatsapp:</label><br>
                <input type="text" class="numero input" name="numero[]" value="${number}" required><br><br>
            </div>
            <div class="inputs-hora">
                <label for="hora">Hora do envio:</label><br>
                <input type="text" class="hora input" id="horaInput" name="hora[]" value="${hour}" min="0" max="23" required> :
                <input type="text" class="minuto input" id="minutoInput" name="minuto[]" value="${minute}" min="0" max="59" required><br><br>
            </div>
            <div class="icon">
                <i class="fa fa-trash"></i>
            </div>
        `
                camposContainer.appendChild(campo)
            }
        })
    }
    reader.readAsArrayBuffer(file);
})

//Função para adicionar um campo de número e horário manualmente---------------------------------------------
document.getElementById('adicionarCampo').addEventListener('click', function () {
    var campo = document.createElement('div')
    campo.className = 'campo-animated' //Adiciona a classe de animação
    campo.innerHTML = `
<div class="campo">
<div class="number">
    <label for="numero">Whatsapp:</label><br>
    <input type="text" class="numero input" name="numero[]" value="+55719" required><br><br>
</div>
<div class="inputs-hora">
    <label for="hora">Hora do envio:</label><br>
    <input type="text" class="hora input" id="horaInput" name="hora[]" min="0" max="23" maxlength="2" required>
    <input type="text" class="minuto input" id="minutoInput" name="minuto[]" min="0" max="59" maxlength="2" required>
    <br><br>
</div>
<div class="icon">
    <i class="fa fa-trash"></i>
</div>
</div>
`
    document.getElementById('campos').appendChild(campo)

    //Ajusta o horário para ser preenchido automaticamente com base no primeiro campo------------------------
    let minutoInput = document.querySelectorAll('input.minuto')
    for (let i = 1; i < minutoInput.length; i++) {
        let minutoInicial = parseInt(minutoInput[0].value)
        let minutoAtual = parseInt(minutoInput[i].value)
        minutoInput[i].value = minutoInicial + i
    }

    let horaInput = document.querySelectorAll('input.hora')
    for (let i = 1; i < horaInput.length; i++) {
        horaInput[i].value = horaInput[0].value
    }
})


//Função para abrir e fechar o modal com a mensagem---------------------------------------------------------
/*document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})*/

//Função para remover um número da lista---------------------------------------------------------------------
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-trash')) {
        var campo = event.target.closest('.campo')
        campo.classList.add('removing')
        setTimeout(() => {
            campo.parentNode.removeChild(campo)
        }, 500)
    }
})

//Evento que impede a inserção de letras no input Hora
document.getElementById('horaInput').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '')
})

//Evento que impede a inserção de letras no input Minuto
document.getElementById('minutoInput').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '')
})

//Evento que impede a inserção de letras no input Whatsapp e permite apenas o caractere + para o código do pais
document.getElementById('numeroInput').addEventListener('keypress', function(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if ((charCode < 48 || charCode > 57) && charCode !== 43) {
        event.preventDefault()
    }
})