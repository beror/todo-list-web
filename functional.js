class Todo {
  constructor(text, isTicked) {
    this.text = text;
    this.isTicked = isTicked;
  }
}

var todos = [];

document.getElementById("todoInput")
.addEventListener("keydown", function(event) {
  if(event.keyCode === 13) {
    addTodo(this.value);
  }
})

function addTodo(newTodoText) {
  let todoList = document.getElementById("todoList");
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

  updateListItemCounter();
  document.getElementById("todoInput").value = "";
}

function deleteTodo(liElement) {
  let todoList = document.getElementById("todoList");

  let itemIndex = [...todoList.children]
  .findIndex(child => child === liElement);

  document.getElementById("todoList").children[itemIndex].remove();
  todos.splice(itemIndex, 1);

  updateListItemCounter();

  if(event !== undefined) event.stopPropagation();
}

function clearAll() {
  removeAllListItemsFromDOM();
  todos = [];
  updateListItemCounter();
}

function updateListItemCounter() {
  document.getElementById("todoList")
  .lastElementChild
  .firstElementChild
  .innerText = todos.length + " items left";
}
