import { createProjectElement, displayTasks } from "./uiHandler.js";
import { saveToLocalStorage } from "./storageHandler.js";
import {Todo} from "./tasks.js";
import { state } from "./state.js";

export function setupEventListeners(Pdialog, dialog, addProjectBtn, addTaskBtn, addTaskBtnOnList, manager, currentProject, taskGroup, listOfTasks, projTitle, projectList,editDialog, Todo) {
  addProjectBtn.addEventListener("click", () => Pdialog.showModal());

  addTaskBtn.addEventListener("click", () => {
    resetInput();
    positionModal(dialog, addTaskBtn);
    dialog.showModal(dialog,addTaskBtnOnList)});

  addTaskBtnOnList.addEventListener("click", () => {
    resetInput();
    positionModal(dialog, addTaskBtnOnList);
    dialog.showModal(dialog,addTaskBtnOnList)});
    
  Pdialog.addEventListener("submit", (event) => {
    event.preventDefault();
    const projectTitle = document.querySelector("#proj").value;
    const project = manager.createProject(projectTitle);
    projectList.append(createProjectElement(project, manager, projectList, listOfTasks, projTitle, taskGroup));
    saveToLocalStorage(manager.getAllProjects());
    Pdialog.close();
  });

  dialog.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#desc").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;

    if (title && dueDate) {
      const task = new Todo(title, description, dueDate, priority);
      console.log("current Projects in task eventListener:", currentProject);
      state.currentProject.addTask(task);
      displayTasks(state.currentProject.task, taskGroup, listOfTasks, state.currentProject, manager, editDialog);
      saveToLocalStorage(manager.getAllProjects());
      dialog.close();
    }
  });
  
  function resetInput() {
    document.querySelector("#title").value = '';
    document.querySelector("#desc").value = '';
    document.querySelector("#dueDate").value = '';
    document.querySelector("#priority").value = '';
  }; 
  
}

function positionModal(dialog, button) {
  const buttonRect = button.getBoundingClientRect();
  dialog.style.top = `${buttonRect.bottom + window.scrollY - 35}px`;
  dialog.style.left = `${buttonRect.left + window.scrollX}px`;
}

// create a function openEditDiolog
// what does it do?
// it should open modal for edit
// use query selector for edit button and show modal (<dialog class="edit-dialog">)
//

export function openEditDialog(task, editDialog, currentProject, taskGroup, listOfTasks, manager) {
    const editBtn = document.querySelector(".edit-dialog");
    // load task values
    // set the task values to the query selectors
    document.querySelector("#ed-title").value = task.title;
    document.querySelector("#ed-desc").value = task.description;
    document.querySelector("#ed-dueDate").value = task.dueDate;
    document.querySelector("#ed-priority").value = task.priority
    editBtn.showModal();

    const saveBtn = document.querySelector('.save-btn');
    const newSaveBtn = saveBtn.cloneNode(true); // Clone the button
    saveBtn.replaceWith(newSaveBtn); // Replace the old button with the new
    // after open the dialog you have to save it so the data should first
    // update in the backend and then frontend

    // save the modified data:
    
    newSaveBtn.addEventListener('click', () => {
      //get the data from the form and update the backend
        const newTitle = document.querySelector("#ed-title").value;
        const newDesc = document.querySelector("#ed-desc").value;
        const newDueDate = document.querySelector("#ed-dueDate").value;
        const newPriority = document.querySelector("#ed-priority").value;

        task.title = newTitle;
        task.description = newDesc;
        task.dueDate = newDueDate;
        task.priority = newPriority;

        //update the frontEnd
        displayTasks(state.currentProject.task, taskGroup, listOfTasks, state.currentProject, manager, editDialog);
        saveToLocalStorage(manager.getAllProjects());

        editDialog.close();
    });

    
}

export function deleteTask(task, index, currentProject, taskGroup, listOfTasks, manager) {
  const editDialog = document.querySelector(".edit-dialog");
    if (!state.currentProject || !state.currentProject.deleteTask) {
        console.error("Invalid currentProject:", state.currentProject);
        return;
      }
      state.currentProject.deleteTask(index);

    displayTasks(state.currentProject.task, taskGroup, listOfTasks, state.currentProject, manager, editDialog);
    saveToLocalStorage(manager.getAllProjects());
}


