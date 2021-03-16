class Todo {
  constructor(text, isTicked) {
    this.text = text;
    this.isTicked = isTicked;
  }
}

var todos = [];

function addTodo() {
  let todoList = document.getElementById("todoList");
  let newTodoText = document.getElementById("todoInput").value;
  let newListItem = document.createElement("LI");

  if(newTodoText === "") {
    return;
  }

  todos.push(new Todo(newTodoText, false));
  newListItem.setAttribute("onClick", "changeMarker(this)");
  newListItem.setAttribute("onMouseOver", "highlightListItem(this)");
  newListItem.setAttribute("onMouseOut", "unhighlightListItem(this)");
  newListItem.innerHTML = '<span class="listMarkerNotTicked"></span>' + newTodoText;
  todoList.insertBefore(newListItem, todoList.children[todoList.children.length - 1]);

  updateLitsItemCounter();
}

function deleteTodo(liElement) {
  let itemIndex = [...liElement.parentNode.children]
  .findIndex(child => child === liElement);

  document.getElementById("todoList").children[itemIndex].remove();
  todos.splice(itemIndex, 1);

  updateLitsItemCounter();
}

function clearAll() {
  removeAllListItemsFromDOM();
  todos = [];
}

function updateLitsItemCounter() {
  document.getElementById("todoList")
  .lastElementChild
  .firstElementChild
  .innerText = todos.length + " items left";
}

function appendChildren(parent, children) {
  children.forEach((child, i) => parent.appendChild(child));
}
