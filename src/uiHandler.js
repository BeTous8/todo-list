import trashIcon from "./trash-can-outline.svg";
import pencilIcon from "./pencil.svg";
import {openEditDialog, deleteTask, setupEventListeners} from "./eventHandlers.js";
import { state } from "./state.js";


export function displayTasks(tasks, taskGroup, listOfTasks, currentProject, manager, editDialog) {
  taskGroup.textContent = "";
  console.log("current Projects in uiHandler:", state.currentProject);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item", `p-${task.priority}`);

    taskItem.innerHTML = `
      <p><strong>${task.title}</strong></p><br>
      <p>Due: ${task.dueDate}</p><br>
      <p>Priority: ${task.priority}</p>
    `;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-container");

    const editButton = createButton(pencilIcon, "edit-btn", () => openEditDialog(task, editDialog, state.currentProject, taskGroup, listOfTasks, manager));
    console.log("Current Project in displayTasks:", state.currentProject);
    const deleteButton = createButton(trashIcon, "del-btn", () => deleteTask(task, index, state.currentProject, taskGroup, listOfTasks, manager));

    buttonContainer.append(editButton, deleteButton);
    taskItem.append(buttonContainer);
    taskGroup.append(taskItem);
  });

  listOfTasks.append(taskGroup);
}

export function createProjectElement(project, manager, projectList, listOfTasks, projTitle, taskGroup) {
  const newProjectItem = document.createElement("button");
  newProjectItem.classList.add("sb-pn");

  const newProjectItemTitle = document.createElement("p");
  newProjectItemTitle.textContent = project.name;

  const deleteProjectItem = createButton(trashIcon, "del-btn", () => {
    manager.removeProject(project.name);
    projectList.removeChild(newProjectItem);
    if (projTitle.textContent === project.name) {
      projTitle.textContent = "";
      taskGroup.textContent = "";
    }
  });

  newProjectItem.append(newProjectItemTitle, deleteProjectItem);

  newProjectItem.addEventListener("click", () => {
    listOfTasks.textContent = "";
    projTitle.textContent = project.name;
    listOfTasks.append(projTitle);
    displayTasks(project.task, taskGroup, listOfTasks);
  });

  return newProjectItem;
}

function createButton(iconSrc, className, onClick) {
  const button = document.createElement("button");
  button.classList.add(className);

  const icon = document.createElement("img");
  icon.src = iconSrc;
  button.append(icon);

  button.addEventListener("click", onClick);
  return button;
}