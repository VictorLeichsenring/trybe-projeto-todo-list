//Lista decomponetes a serem utilizados
const taskList = document.getElementById('lista-tarefas');
const btnCriarTarefa = document. getElementById('criar-tarefa');
const inputTarefa = document.getElementById('texto-tarefa');

//Lista de funções
function createTask () {
    const element = document.createElement('li');
    const task = inputTarefa.value;
    element.innerText = task;
    taskList.appendChild(element);
    inputTarefa.value = '';
}

//Lista de eventos
btnCriarTarefa.addEventListener('click', createTask);