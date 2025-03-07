import { loadFromLocalStorage } from "./storageHandler.js";
import { setupEventListeners } from "./eventHandlers.js";
import {displayTasks, createProjectElement} from "./uiHandler.js";
import {Todo} from "./tasks.js"
import { Project } from "./projects.js";
import { state } from "./state.js";

export function initializeApp(manager, Pdialog, dialog, addProjectBtn, addTaskBtn, addTaskBtnOnList, taskGroup, listOfTasks, projTitle, projectList, editDialog, Todo) {
  const projects = loadFromLocalStorage(manager);

  // Ensure "Home" project exists
  let homeProject = manager.projectFinder("Home");
  if (!homeProject) {
    homeProject = manager.createProject("Home");
  }

  state.currentProject = homeProject;
  


  projTitle.textContent = state.currentProject.name;
  listOfTasks.append(projTitle);
  console.log("Current Project from appinitiolizer:", state.currentProject);
  displayTasks(state.currentProject.task, taskGroup, listOfTasks, state.currentProject, manager, editDialog);

  // Display all projects in the sidebar
  projects.forEach((project) => {
    projectList.append(createProjectElement(project, manager, projectList, listOfTasks, projTitle, taskGroup));
  });

  setupEventListeners(Pdialog, dialog, addProjectBtn, addTaskBtn, addTaskBtnOnList, manager, state.currentProject, taskGroup, listOfTasks, projTitle, projectList,editDialog, Todo);

  return state.currentProject;
}