// Lista decomponetes a serem utilizados
const taskList = document.getElementById('lista-tarefas');
const btnCriarTarefa = document.getElementById('criar-tarefa');
const inputTarefa = document.getElementById('texto-tarefa');
const btnApagaListaTarefas = document.getElementById('apaga-tudo');
const btnRemoverFinalizados = document.getElementById('remover-finalizados');
const btnSalvarTarefas = document.getElementById('salvar-tarefas');
const btnMoverCima = document.getElementById('mover-cima');
const btnMoverBaixo = document.getElementById('mover-baixo');
const btnRemoverTarefa = document.getElementById('remover-selecionado');

// Lista de funções
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

function createTask() {
  const element = document.createElement('li');
  const task = inputTarefa.value;
  element.innerText = task;
  taskList.appendChild(element);
  element.addEventListener('click', selectLi);
  element.addEventListener('dblclick', taskCompleted);
  inputTarefa.value = '';
}

function clearTaskList() {
  const elements = taskList.children;
  for (let i = elements.length - 1; i >= 0; i -= 1) {
    const elementToRemove = elements[i];
    elementToRemove.parentElement.removeChild(elementToRemove);
  }
}

function removeCompletedTask() {
  const elements = document.getElementsByClassName('completed');
  for (let i = elements.length - 1; i >= 0; i -= 1) {
    const elementToRemove = elements[i];
    elementToRemove.parentElement.removeChild(elementToRemove);
  }
}

function storage() {
  const taskListChildren = taskList.children;
  const listTasks = [];
  for (let i = 0; i < taskListChildren.length; i += 1) {
    const taskInformtion = {
      text: taskListChildren[i].innerText,
      completed: taskListChildren[i].classList.contains('completed'),
      selected: taskListChildren[i].classList.contains('selected'),
    };
    listTasks.push(taskInformtion);
  }
  localStorage.setItem('tasks', JSON.stringify(listTasks));
}

function createTaskElement(task) {
  const newTask = document.createElement('li');
  newTask.innerText = task.text;
  if (task.completed) {
    newTask.classList.add('completed');
  }
  if (task.selected) {
    newTask.classList.add('selected');
  }
  return newTask;
}

function recovery() {
  const listTasks = JSON.parse(localStorage.getItem('tasks'));
  if (listTasks) {
    for (let i = 0; i < listTasks.length; i += 1) {
      const task = listTasks[i];
      const newTask = createTaskElement(task);
      taskList.appendChild(newTask);
      newTask.addEventListener('click', selectLi);
      newTask.addEventListener('dblclick', taskCompleted);
    }
  }
}

function moveUp() {
  let taskSelectedIndex = -1;
  const taskListChildren = taskList.children;
  for (let i = 0; i < taskListChildren.length; i += 1) {
    const element = taskListChildren[i];
    const classes = element.classList;
    if (classes.contains('selected')) {
      taskSelectedIndex = i;
    }
  }
  if (taskSelectedIndex > 0) {
    const taskSelected = taskListChildren[taskSelectedIndex];
    const taskAbove = taskListChildren[taskSelectedIndex - 1];
    taskList.insertBefore(taskSelected, taskAbove);
  }
}

function moveDown() {
  const taskListChildren = taskList.children;
  let taskSelectedIndex = taskListChildren.length;
  for (let i = 0; i < taskListChildren.length; i += 1) {
    const element = taskListChildren[i];
    const classes = element.classList;
    if (classes.contains('selected')) {
      taskSelectedIndex = i;
    }
  }
  if (taskSelectedIndex < taskListChildren.length - 1) {
    const taskSelected = taskListChildren[taskSelectedIndex];
    const nextTask = taskListChildren[taskSelectedIndex + 1];
    taskList.insertBefore(nextTask, taskSelected);
  }
}

function removeTaskSelected() {
  const elements = taskList.children;
  let elementToRemove;
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    const classes = element.classList;
    if (classes.contains('selected')) {
      elementToRemove = element;
    }
  }
  elementToRemove.parentElement.removeChild(elementToRemove);
}

// Lista de eventos
btnCriarTarefa.addEventListener('click', createTask);
btnApagaListaTarefas.addEventListener('click', clearTaskList);
btnRemoverFinalizados.addEventListener('click', removeCompletedTask);
btnSalvarTarefas.addEventListener('click', storage);
btnMoverCima.addEventListener('click', moveUp);
btnMoverBaixo.addEventListener('click', moveDown);
btnRemoverTarefa.addEventListener('click', removeTaskSelected);

// Recuperar dados do localStorage
window.onload = () => {
  recovery();
};
