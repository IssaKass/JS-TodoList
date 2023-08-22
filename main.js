// Task class
class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }
}

// DOM Elements
const numberTasks = document.getElementById("numberTasks");
const inputTask = document.getElementById("inputTask");
const btnAddTask = document.getElementById("btnAddTask");
const btnClearCompletedTasks = document.getElementById(
  "btnClearCompletedTasks"
);
const btnClearAllTasks = document.getElementById("btnClearAllTasks");
const taskList = document.getElementById("taskList");

let tasks = [];

// Load tasks from localstorage
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
if (storedTasks) {
  tasks = storedTasks;
  updateTaskDisplay();
}

// Event Listeners
btnAddTask.addEventListener("click", addTask);

inputTask.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
    e.preventDefault();
  }
});

btnClearAllTasks.addEventListener("dblclick", clearAllTasks);
btnClearCompletedTasks.addEventListener("click", clearCompletedTasks);

// Event Handlers
function addTask() {
  const taskName = inputTask.value.trim();

  if (taskName.length !== 0) {
    const task = new Task(taskName);
    tasks.push(task);
    updateTaskDisplay();
    saveTasksToLocalStorage();
  } else {
    inputTask.focus();
  }

  clearInput();
}

function clearAllTasks() {
  tasks = [];
  updateTaskDisplay();
  saveTasksToLocalStorage();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateTaskDisplay();
  saveTasksToLocalStorage();
}

// Utility Functions
function clearInput() {
  inputTask.value = "";
}

// Display Functions
function updateTaskDisplay() {
  clearTaskList();
  displayTasks();
  displayNumberOfActiveTasks();
}

function clearTaskList() {
  taskList.innerHTML = "";
}

function displayTasks() {
  tasks.forEach((task, index) => {
    const taskLi = createTaskListItem(task, index);
    taskList.appendChild(taskLi);
  });
}

function createTaskListItem(task, index) {
  const taskLi = document.createElement("li");
  taskLi.classList.add("task");

  const span = document.createElement("span");
  span.textContent = task.name;
  span.addEventListener("click", () => {
    task.completed = !task.completed;
    taskLi.classList.toggle("completed");
    displayNumberOfActiveTasks();
    saveTasksToLocalStorage();
  });

  const btnRemove = createRemoveButton(index);

  taskLi.appendChild(span);
  taskLi.appendChild(btnRemove);

  return taskLi;
}

function createRemoveButton(index) {
  const button = document.createElement("button");
  button.classList.add("btn-remove");
  button.innerHTML = `<i class="fa-solid fa-xmark fa-fw"></i>`;
  button.addEventListener("click", () => {
    tasks.splice(index, 1);
    updateTaskDisplay();
    saveTasksToLocalStorage();
  });

  return button;
}

function displayNumberOfActiveTasks() {
  const activeTasks = tasks.filter((task) => !task.completed);
  numberTasks.textContent = `(${activeTasks.length})`;
}

// Save tasks to localstorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
