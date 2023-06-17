//Lista decomponetes a serem utilizados
const taskList = document.getElementById('lista-tarefas');
const btnCriarTarefa = document. getElementById('criar-tarefa');
const inputTarefa = document.getElementById('texto-tarefa');
const btnApagaListaTarefas = document.getElementById('apaga-tudo');
const btnRemoverFinalizados = document.getElementById('remover-finalizados');

//Lista de funções
function selectLi(event) {
    const selected = document.getElementsByClassName('selected');
    for (let i = 0; i < selected.length; i += 1) {
        const item = selected[i];
        const classes = item.classList;
        classes.remove('selected');
    }
    event.target.classList.add('selected');
}

function taskCompleted(event) {
    const element = event.target;
    const classes = element.classList;
    if (classes.contains('completed')) {
        element.classList.remove('completed');
    } else {
        element.classList.add('completed');
    }
}

function createTask () {
    const element = document.createElement('li');
    const task = inputTarefa.value;
    element.innerText = task;
    taskList.appendChild(element);
    element.addEventListener('click', selectLi)
    element.addEventListener('dblclick', taskCompleted);
    inputTarefa.value = '';
}

function clearTaskList () {
    const elements = taskList.children;
    for (let i = elements.length -1; i >= 0; i -= 1) {
        let elementToRemove = elements[i];
        elementToRemove.parentElement.removeChild(elementToRemove);
    }
}

function removeCompletedTask(){
    const elements = document.getElementsByClassName('completed');
    for (let i = elements.length-1; i >= 0; i -= 1) {
        let elementToRemove = elements[i];
        elementToRemove.parentElement.removeChild(elementToRemove);
    }
}

//Lista de eventos
btnCriarTarefa.addEventListener('click', createTask);
btnApagaListaTarefas.addEventListener('click', clearTaskList);
btnRemoverFinalizados.addEventListener('click', removeCompletedTask);