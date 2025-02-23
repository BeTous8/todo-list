import { projectManager } from "./projects";
import { Todo } from "./tasks";
import { format } from "date-fns";
import trashIcon from "./trash-can-outline.svg";

const addProjectBtn = document.querySelector(".add-sign");
const addTaskBtn = document.querySelector(".add-task");
const addTaskBtnOnList = document.querySelector(".add-task-list");
const content = document.querySelector(".content");
const dialog = document.querySelector(".dialog");
const Pdialog = document.querySelector(".Pdialog");
const listOfTasks = document.querySelector(".show-tasks");
const taskGroup = document.querySelector(".task-group");
const tasks = document.querySelector(".tasks");
const projTitle = document.querySelector(".proj-title");
const projectList = document.querySelector(".project-list");

function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(allProjectList));
}

function loadFromLocalStorage() {
  const storedProjects = localStorage.getItem("projects");
  console.log(storedProjects);

  projectList.textContent = "";
  listOfTasks.textContent = "";

  if (storedProjects) {
    const parsedProjects = JSON.parse(storedProjects);
    console.log(allProjectList);

    manager.clearProjects();

    parsedProjects.forEach((projectData) => {
      const project = manager.createProject(projectData.name);

      projectData.task.forEach((taskData) => {
        project.addTask(
          new Todo(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
          ),
        );
      });
      // displayNewProjectWithoutForm(project);
    });

    //update allProjectList
    allProjectList = manager.getAllProjects();
  } else {
    allProjectList = manager.getAllProjects();
  }

  // Ensure "Home" project exists only once
  let homeProject = manager.projectFinder("Home");
  if (!homeProject) {
    homeProject = manager.createProject("Home");
    allProjectList = manager.getAllProjects();
  }
  // if (!allProjectList.some(proj => proj.name === "Home")) {
  //     const homeProject = manager.createProject("Home");
  //     allProjectList.unshift(homeProject);
  //     displayNewProjectWithoutForm(homeProject);
  // }

  // saveToLocalStorage();  // Save the corrected project list

  currentProject = homeProject;

  // Update the UI
  projTitle.innerHTML = currentProject.name;
  listOfTasks.append(projTitle);
  displayTasks(currentProject.task);

  // Display all projects in the sidebar
  allProjectList.forEach((project) => {
    displayNewProjectWithoutForm(project);
  });
}

const manager = projectManager();
let currentProject = null;
let allProjectList;
// allProjectList = manager.getAllProjects();
// allProjectList = (loadFromLocalStorage() || manager.getAllProjects());
// allProjectList = loadFromLocalStorage();

console.log(allProjectList);

addProjectBtn.addEventListener("click", () => {
  Pdialog.showModal();
});

addTaskBtn.addEventListener("click", () => {
  positionModal(addTaskBtn);
  dialog.showModal();
});

addTaskBtnOnList.addEventListener("click", () => {
  positionModal(addTaskBtnOnList);
  dialog.showModal();
});



function positionModal(button) {
  // Get the position of the button
  const buttonRect = button.getBoundingClientRect();
  const offset = -35;
  // Position the modal below the button
  dialog.style.top = `${buttonRect.bottom + window.scrollY + offset}px`; // Add window.scrollY to account for scrolling
  dialog.style.left = `${buttonRect.left + window.scrollX}px`; // Add window.scrollX to account for scrolling
}

function createProjectElement(project) {
  const newProjectItem = document.createElement("button");
  newProjectItem.classList.add("sb-pn");

  const newProjectItemTitle = document.createElement("p");
  newProjectItemTitle.innerHTML = `${project["name"]}`;

  const deleteProjectItem = document.createElement("button");
  deleteProjectItem.classList.add("del-btn");

  const trashImg = document.createElement("img");
  trashImg.src = `${trashIcon}`;
  deleteProjectItem.append(trashImg);

  newProjectItem.append(newProjectItemTitle, deleteProjectItem);

  return { newProjectItem, newProjectItemTitle, deleteProjectItem };
}

function displayNewProject(event) {
  event.preventDefault();
  listOfTasks.textContent = "";
  projectList.textContent = "";
  console.log(allProjectList);

  // take the input value from the form when it is submitted
  // instead of this we can also get the value from the project list in the backend
  const projectTitle = document.querySelector("#proj").value;

  // create new instance of Project class
  currentProject = manager.createProject(projectTitle);
  allProjectList = manager.getAllProjects();
  console.log(allProjectList);
  saveToLocalStorage();

  projTitle.innerHTML = `${currentProject["name"]}`;
  listOfTasks.append(projTitle);

  // create a new list on the sidebar under My Project section
  allProjectList.forEach((project) => {
    const { newProjectItem, newProjectItemTitle, deleteProjectItem } =
      createProjectElement(project);

    projectList.append(newProjectItem);

    // show the project and its tasks when a project is clicked from the My Project list
    newProjectItem.addEventListener("click", () => {
      listOfTasks.textContent = "";
      currentProject = manager.projectFinder(newProjectItemTitle.innerHTML);
      if (currentProject) {
        projTitle.innerHTML = `${currentProject["name"]}`;
        listOfTasks.append(projTitle);
        displayTasks(currentProject.task);
        // saveToLocalStorage()
      }
    });

    // delete a project
    deleteProjectItem.addEventListener("click", () => {
      allProjectList = manager.removeProject(newProjectItemTitle.textContent);
      saveToLocalStorage();
      console.log(allProjectList);

      projTitle.innerHTML = ``;
      taskGroup.textContent = "";
      newProjectItem.remove();
    });
  });

  Pdialog.querySelector("form").reset();
  Pdialog.close();
}

function displayTasks(tasks) {
  taskGroup.textContent = "";

  console.log(`Tasks: ${tasks}`);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    console.log(task.priority);

    switch (task.priority) {
      case "high":
        taskItem.classList.add("p-high");
        break;
      case "medium":
        taskItem.classList.add("p-medium");
        break;
      default:
        taskItem.classList.add("p-low");
    }

    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
        <p><strong>${task.title}</strong></p><br>
        <p>Due: ${task.dueDate}</p><br>
        <p>Priority: ${task.priority}</p>
        `;
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del-btn");
    const trashImg = document.createElement("img");
    trashImg.src = `${trashIcon}`;

    deleteButton.append(trashImg);
    // deleteButton.innerText = 'Delete';
    deleteButton.addEventListener("click", () => {
      currentProject.deleteTask(index);
      displayTasks(currentProject.task); // Refresh UI after deleting task
      saveToLocalStorage();
    });
    taskItem.append(deleteButton);
    taskGroup.append(taskItem);
  });
  listOfTasks.append(taskGroup);
}

function addTaskToProject(event) {
  event.preventDefault();

  if (!currentProject) return;

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#desc").value;
  const dueDateInput = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;
  console.log(priority);

  console.log(dueDateInput);

  if (!title || !dueDateInput) {
    alert("Please enter a task and select a due date.");
    return;
  }

  const formattedDate = format(new Date(dueDateInput), "MMM d, yyyy");

  currentProject.addTask(new Todo(title, description, formattedDate, priority));

  saveToLocalStorage();

  displayTasks(currentProject.getTasks());

  dialog.querySelector("form").reset();
  dialog.close();
}

function displayNewProjectWithoutForm(project) {
  const { newProjectItem, newProjectItemTitle, deleteProjectItem } =
    createProjectElement(project);

  newProjectItem.addEventListener("click", () => {
    listOfTasks.textContent = "";
    currentProject = manager.projectFinder(newProjectItemTitle.innerHTML);
    if (currentProject) {
      projTitle.innerHTML = `${currentProject["name"]}`;
      listOfTasks.append(projTitle);
      displayTasks(currentProject.task);
      // saveToLocalStorage()
    }
  });

  // delete a project
  deleteProjectItem.addEventListener("click", () => {
    allProjectList = manager.removeProject(newProjectItemTitle.textContent);
    saveToLocalStorage();
    console.log(allProjectList);

    projTitle.innerHTML = ``;
    taskGroup.textContent = "";
    newProjectItem.remove();
  });

  projectList.append(newProjectItem);
}

function initializeHomeProject() {
  // loadFromLocalStorage();

  let homeProject = manager.projectFinder("Home");

  if (!homeProject) {
    currentProject = manager.createProject("Home");
    allProjectList = manager.getAllProjects();
  } else {
    currentProject = homeProject;
  }

  projTitle.innerHTML = currentProject.name;
  listOfTasks.append(projTitle);

  // displayNewProjectWithoutForm(currentProject);
  displayTasks(currentProject.task);
}

// when we add a new project
Pdialog.addEventListener("submit", displayNewProject);

dialog.addEventListener("submit", addTaskToProject);

function initializeApp() {
  loadFromLocalStorage(); // Load data from localStorage
  initializeHomeProject(); // Set up the "Home" project
}

initializeApp();
