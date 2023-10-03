function addProjects(data) {
  for (let i = 0; i < 6; i++) {
    let card = document.querySelector("#card-" + (i + 1));
    card.innerHTML = data.projects[i]["projectName"];
  }
}
projectData = {};

function getProjects() {
  fetch("tasks.json")
    .then((respone) => respone.json())
    .then((data) => {
      addProjects(data);
      projectData = data;
      showTasks();
    });
}
function showTasks() {
  viewTasks(1);
}

function viewTasks(id) {
  // change container color
  const selectedCard = document.querySelector(`#container-${id}`);
  // selectedCard.addEventListener("mouseover", function(){})
  selectedCard.style.borderWidth = "thick";
  selectedCard.style.borderColor = "white";

  const projectName = document.querySelector(".right-section-name");
  projectName.innerHTML = projectData.projects[id - 1].projectName;
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";
  let todoList = projectData.projects[id - 1].todos;
  todoList.forEach((apiTask) => {
    const task = document.createElement("div");
    task.className = "task";

    const todoCheckbox = document.createElement("div");
    todoCheckbox.className = "todo-checkbox";
    const checkBox = document.createElement("img");
    checkBox.className = "checkbox";

    console.log(apiTask.isChecked);
    if (apiTask.isChecked === true) {
      checkBox.src = "images/check.png";
    } else if (apiTask.isChecked === false) {
      checkBox.src = "images/uncheck.png";
    }
    todoCheckbox.append(checkBox);

    const tasks = document.createElement("li");
    tasks.classList.add("tasks");
    tasks.textContent = apiTask.task;

    task.append(todoCheckbox);
    task.append(tasks);

    const statusDiv = document.createElement("div");
    statusDiv.className = "status-div";
    setTaskStyles(statusDiv, apiTask.status);

    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";
    todoContainer.append(task);
    taskList.append(todoContainer);
    todoContainer.append(statusDiv);
    console.log("Again");
    todoContainer.addEventListener("mouseover", function () {
      initialSRC = checkBox.src;
      if (initialSRC == "http://127.0.0.1:5500/images/uncheck.png") {
        checkBox.src = "images/check.png";
      }
    });
    todoContainer.addEventListener("mouseout", function () {
      if (initialSRC == "http://127.0.0.1:5500/images/uncheck.png") {
        checkBox.src = "images/uncheck.png";
      }
      if (initialSRC == "http://127.0.0.1:5500/images/check.png") {
        checkBox.src = "images/check.png";
        initialSRC = "";
      }
    });
  });
}

function setTaskStyles(element, status) {
  if (status === "approved") {
    element.style.border = "2px solid rgb(225, 245, 244)";
    element.style.backgroundColor = "rgb(225, 245, 244)";
    element.style.color = "#75d0cf";
    element.innerHTML = "Approved";
  } else if (status === "in progress") {
    element.style.border = "2px solid rgb(228, 240, 253)";
    element.style.backgroundColor = "rgb(228, 240, 253)";
    element.style.color = "#5299f1";
    element.innerHTML = "In Progress";
  } else if (status === "in review") {
    element.style.border = "2px solid #fdefe9";
    element.style.backgroundColor = "#fdefe9";
    element.style.color = "#f3a287";
    element.innerHTML = "In Review";
  }
}

getProjects();