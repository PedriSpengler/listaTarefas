let input = document.getElementById("input-principal")
let botao = document.getElementById("botao-adicionar")
let listaCompleta = document.getElementById("tarefas")

let arrayDeTarefas = []

// Função responsável por adicionar toda a personalização do item à lista de tarefas
function adicionarItem(){
    let novaLista = " "

    arrayDeTarefas.forEach((tarefaObj, index) => {
        // Verifica se a tarefa tem um índice maior que 1 (ou seja, se ela aparece mais de uma vez)
        if (tarefaObj.indice > 1) {
            novaLista += `
                <li class="item-tarefa" data-index="${index}">
                    <p>${tarefaObj.tarefa} (${tarefaObj.indice})</p>
                    <img src="./assets/remove-icon.svg" class="remove-icon" onclick="removerItem(${index})"></img>
                </li>
            `;
        } else {
            novaLista += `
                <li class="item-tarefa" data-index="${index}">
                    <p>${tarefaObj.tarefa}</p>
                    <img src="./assets/remove-icon.svg" class="remove-icon" onclick="removerItem(${index})"></img>
                </li>
            `;
        }
    });

    listaCompleta.innerHTML = novaLista
}

// Função responsável por limpar o input após o usuário adicionar o item desejado
function limparInput(){
    input.value = ""
}

// Função com ação após clicar no botão
function cliqueiNoBotao(){
    if(input.value == ""){
        console.log("erro")
        return -1;
    }
    // Verifica se a tarefa já existe na lista
    const tarefaExistente = arrayDeTarefas.find(item => item.tarefa === input.value);

    if (tarefaExistente) {
        // Se a tarefa já existe, apenas atualize o índice
        tarefaExistente.indice++;
    } else {
        // Caso contrário, adicione uma nova entrada no array
        arrayDeTarefas.push({ tarefa: input.value, indice: 1 });
    }

    limparInput()
    adicionarItem()
}

// Função para remover item da lista de tarefas
function removerItem(index) {
    if (index >= 0 && index < arrayDeTarefas.length) {
        arrayDeTarefas.splice(index, 1);
        adicionarItem();
    }
}

// Função para com a tecla "Enter", adicionar item à lista de tarefas
input.addEventListener("keyup", function(evente) {
    if (evente.key == "Enter") {
        botao.click();
    }
});

// Quando o botão é clicado pelo usuário, o código dentro da função cliqueiNoBotao será executado.
botao.addEventListener("click", cliqueiNoBotao)
