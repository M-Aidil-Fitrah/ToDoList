let todos = [];
let index = 0;

const submitButton = document.getElementById("submitTodo");
const containerTodos = document.getElementById("containerTodos");

submitButton.addEventListener("click", () => {
  const inputan = document.getElementById("inputTodo");
  if (inputan.value.trim() === "") return;

  todos.push(inputan.value);
  addTodoItem(inputan.value, index);
  index += 1;
  inputan.value = "";
});

function addTodoItem(text, idx) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.setAttribute("data-index", idx);

  const todoIndex = document.createElement("h1");
  todoIndex.textContent = idx + 1;

  const todoText = document.createElement("p");
  todoText.textContent = text;
  todoText.classList.add("todo-text");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", () => editTodoItem(todoText, idx));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", () => deleteTodoItem(todoDiv, idx));

  todoDiv.appendChild(todoIndex);
  todoDiv.appendChild(todoText);
  todoDiv.appendChild(editButton);
  todoDiv.appendChild(deleteButton);

  containerTodos.appendChild(todoDiv);
}

function deleteTodoItem(todoDiv, idx) {
  todos = todos.filter((_, i) => i !== idx);
  containerTodos.removeChild(todoDiv);
  reindexTodos();
}

function editTodoItem(todoText, idx) {
  const newText = prompt("Edit your task:", todoText.textContent);
  if (newText) {
    todos[idx] = newText;
    todoText.textContent = newText;
  }
}

function reindexTodos() {
  const todoItems = document.querySelectorAll(".todo");
  todoItems.forEach((todo, newIdx) => {
    todo.setAttribute("data-index", newIdx);
    todo.querySelector("h1").textContent = newIdx + 1;
  });
  index = todoItems.length;
}
