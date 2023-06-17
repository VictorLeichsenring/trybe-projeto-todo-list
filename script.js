//Lista decomponetes a serem utilizados
const taskList = document.getElementById('lista-tarefas');
const btnCriarTarefa = document. getElementById('criar-tarefa');
const inputTarefa = document.getElementById('texto-tarefa');

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

//Lista de eventos
btnCriarTarefa.addEventListener('click', createTask);