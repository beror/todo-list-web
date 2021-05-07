function changeTheme() {
  let currentTheme = document.getElementById("themeLink").getAttribute("href").split(".")[0];
  switch(currentTheme) {
    case "light-theme":
      document.getElementById("themeLink").setAttribute("href", "dark-theme.css");
      document.getElementById("themeButton").src = "images/icon-sun.svg";
      break;

    case "dark-theme":
      document.getElementById("themeLink").setAttribute("href", "light-theme.css");
      document.getElementById("themeButton").src = "images/icon-moon.svg";
      break;

    default: console.log("Couldn't indentify current color theme");
  }
}

function changeMarker(liElement) {
  let marker = liElement.firstElementChild;
  marker.classList.remove("markerBorderHighlight");

  if(marker.classList.contains("listMarkerTicked")) {
    todos
    .find(todo => todo.text === liElement.innerText && todo.isTicked === true)
    .isTicked = false;
    marker.classList.remove("listMarkerTicked");
    marker.classList.add("listMarkerNotTicked");
  } else {
    todos
    .find(todo => todo.text === liElement.innerText && todo.isTicked === false)
    .isTicked = true;
    marker.classList.remove("listMarkerNotTicked");
    marker.classList.add("listMarkerTicked");
  }
}

function showAllListItems() {
  let todoList = document.getElementById("todoList");
  let todosElementized = todos
    .map(todo => {
      let todoHTMLElement = document.createElement("LI");
      todoHTMLElement.setAttribute("onclick", "changeMarker(this)");
      todoHTMLElement.setAttribute("onMouseOver", "highlightListItem(this)");
      todoHTMLElement.setAttribute("onMouseOut", "unhighlightListItem(this)");
      if(todo.isTicked) {
        todoHTMLElement.innerHTML = '<span class="listMarkerTicked"></span>' + todo.text;
      } else {
        todoHTMLElement.innerHTML = '<span class="listMarkerNotTicked"></span>' + todo.text;
      }

    return todoHTMLElement;
  });

  removeAllListItemsFromDOM();
  drawListItems(todosElementized);
  highlightListAction("All");
}

function showActive() {
  let todoList = document.getElementById("todoList");
  let activeTodosElementized = todos
    .filter(todo => todo.isTicked === false)
    .map(activeTodo => {
      let todoHTMLElement = document.createElement("LI");
      todoHTMLElement.setAttribute("onclick", "changeMarker(this)");
      todoHTMLElement.setAttribute("onMouseOver", "highlightListItem(this)");
      todoHTMLElement.setAttribute("onMouseOut", "unhighlightListItem(this)");
      todoHTMLElement.innerHTML = '<span class="listMarkerNotTicked"></span>' + activeTodo.text;

      return todoHTMLElement;
    });

  removeAllListItemsFromDOM();
  drawListItems(activeTodosElementized);
  highlightListAction("Active");
}

function showCompleted() {
  let todoList = document.getElementById("todoList");
  let completedTodosElementized = todos
    .filter(todo => todo.isTicked === true)
    .map(completedTodo => {
      let todoHTMLElement = document.createElement("LI");
      todoHTMLElement.setAttribute("onclick", "changeMarker(this)");
      todoHTMLElement.setAttribute("onMouseOver", "highlightListItem(this)");
      todoHTMLElement.setAttribute("onMouseOut", "unhighlightListItem(this)");
      todoHTMLElement.innerHTML = '<span class="listMarkerTicked"></span>' + completedTodo.text;

      return todoHTMLElement;
    });

  removeAllListItemsFromDOM();
  drawListItems(completedTodosElementized);
  highlightListAction("Completed");
}

function removeAllListItemsFromDOM() {
  let todoList = document.getElementById("todoList");
  while(todoList.firstElementChild.id !== "listFooter") {
    todoList.firstElementChild.remove();
  }
}

function drawListItems(liElements) {
  let todoList = document.getElementById("todoList");

  liElements.forEach((completedTodo, i) => {
    todoList.insertBefore(completedTodo, todoList.lastElementChild);
  });
}

function highlightListItem(liElement) {
  highlightMarkerBorder(liElement);
  addCrossToListItem(liElement);
}

function unhighlightListItem(liElement) {
  unhighlightMarkerBorder(liElement);
  removeCrossFromListItem(liElement);
}

function highlightMarkerBorder(liElement) {
  let notTickedMarker = [...liElement.children]
  .find(child => child.classList.contains("listMarkerNotTicked"));

  if(typeof notTickedMarker !== "undefined") {
    notTickedMarker.classList.add("markerBorderHighlight");
  }
}

function unhighlightMarkerBorder(liElement) {
  liElement.children[0].classList.remove("markerBorderHighlight");
}

function addCrossToListItem(liElement) {
  if(liElement.innerHTML.indexOf("icon-cross.svg") !== -1) {
    return;
  }

  let cross = document.createElement("IMG");
  cross.src = "images/icon-cross.svg";
  cross.setAttribute("onClick", "deleteTodo(this.parentElement)");
  cross.classList.add("cross");

  liElement.appendChild(cross);
}

function removeCrossFromListItem(liElement) {
  let cross = [...liElement.children]
  .find(child => child.classList.contains("cross"));

  if(typeof cross !== "undefined") {
    cross.remove();
  }
}

function highlightListAction(listActionInnerText) {
  let todoList = document.getElementById("todoList");

  [...todoList
  .lastElementChild
  .children[1]
  .children]
  .forEach(listAction => {
    if(listAction.innerText !== listActionInnerText) {
      listAction.style.color = "";
    } else {
      listAction.style.color = "hsl(220, 98%, 61%)";
    }
  })
}
