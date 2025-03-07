import "./styles.css";
import { projectManager } from "./modules/projects"; // Updated path
import { initializeApp } from "./modules/appInitializer"; // Updated path
import { Todo } from "./modules/tasks"; // Updated path
import { displayTasks } from "./modules/uiHandler"; // Updated path
import { state } from "./modules/state"; // Updated path

document.addEventListener("DOMContentLoaded", () => {
  const manager = projectManager();
  state.manager = manager;

  const addProjectBtn = document.querySelector(".add-sign");
  const addTaskBtn = document.querySelector(".add-task");
  const addTaskBtnOnList = document.querySelector(".add-task-list");
  const Pdialog = document.querySelector(".Pdialog");
  const dialog = document.querySelector(".dialog");
  const taskGroup = document.querySelector(".task-group");
  const listOfTasks = document.querySelector(".show-tasks");
  const projTitle = document.querySelector(".proj-title");
  const projectList = document.querySelector(".project-list");
  const editDialog = document.querySelector(".edit-dialog");

  

  state.currentProject = initializeApp(manager, Pdialog, dialog, addProjectBtn, addTaskBtn, addTaskBtnOnList, taskGroup, listOfTasks, projTitle, projectList, editDialog, Todo);



  projectList.addEventListener("click", (event) => {
    const projectElement = event.target.closest(".sb-pn");
    if (projectElement) {
      const projectName = projectElement.querySelector("p").textContent;
      state.currentProject = manager.projectFinder(projectName);
      projTitle.textContent = state.currentProject.name;
      listOfTasks.textContent = "";
      listOfTasks.append(projTitle);
      displayTasks(state.currentProject.task, taskGroup, listOfTasks, state.currentProject, manager, editDialog);
    }
  });
});
