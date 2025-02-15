import {Project, projectManager} from "./projects";
import {Todo} from "./tasks"
import { format } from 'date-fns';
import trashIcon from './trash-can-outline.svg';




const addProjectBtn = document.querySelector('.add-sign');
const addTaskBtn = document.querySelector('.add-task');
const addTaskBtnOnList = document.querySelector('.add-task-list');
const content = document.querySelector('.content');
const dialog = document.querySelector('.dialog');
const Pdialog = document.querySelector('.Pdialog');
const listOfTasks = document.querySelector('.show-tasks');
const taskGroup = document.querySelector('.task-group')
const tasks = document.querySelector('.tasks');
const projTitle = document.querySelector('.proj-title');
const projectList = document.querySelector('.project-list');


const manager = projectManager();
let currentProject = null;



addProjectBtn.addEventListener('click', () => {
    Pdialog.showModal();
})

addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

addTaskBtnOnList.addEventListener('click', () => {
    dialog.showModal();
});



function displayTasks(tasks) {
    taskGroup.textContent = '';

    console.log(`Tasks: ${tasks}`);

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
        <p><strong>${task.title}</strong></p><br>
        <p>Due: ${task.dueDate}</p><br>

        `;
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('del-btn')
        const trashImg = document.createElement('img');
        trashImg.src = `${trashIcon}`;
        

        deleteButton.append(trashImg);
        // deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            currentProject.deleteTask(index);
            displayTasks(currentProject.task); // Refresh UI after deleting task
        
        });
        taskItem.append(deleteButton);
        taskGroup.append(taskItem)
    });
    listOfTasks.append(taskGroup);

}

function addNewProject(event) {
    event.preventDefault();
    listOfTasks.textContent = '';

    // take the input value from the form when it is submitted
    // instead of this we can also get the value from the project list in the backend
    const projectTitle = document.querySelector('#proj').value;

    // create new instance of Project class
    currentProject = manager.createProject(projectTitle);

    projTitle.innerHTML = `Project: ${currentProject['name']}`;
    listOfTasks.append(projTitle);
    
    // create a new list on the sidebar under My Project section
    const newProjectItem = document.createElement('button');
    newProjectItem.classList.add('sb-pn')
    const newProjectItemTitle = document.createElement('p');
    const deleteProjectItem = document.createElement('button');
    deleteProjectItem.classList.add('del-btn');
    const trashImg = document.createElement('img');
    trashImg.src = `${trashIcon}`;
    // trashImg.style.width = '20px';  // Adjust size as needed
    // trashImg.style.height = '40px';
    // trashImg.style.objectFit = 'contain';
    deleteProjectItem.append(trashImg);
    
    newProjectItemTitle.innerHTML = `${currentProject['name']}`;
    
    
    newProjectItem.append(newProjectItemTitle, deleteProjectItem);
    projectList.append(newProjectItem);


    // show the project and its tasks when a project is clicked from the My Project list
    newProjectItem.addEventListener('click', () => {
        listOfTasks.textContent = ''
        currentProject = manager.projectFinder(newProjectItemTitle.innerHTML); 
        if (currentProject) {
            projTitle.innerHTML = `Project: ${currentProject['name']}`;
            listOfTasks.append(projTitle);
            displayTasks(currentProject.task);
        }
    });

    // delete a project
    deleteProjectItem.addEventListener('click', () => {
        manager.removeProject(newProjectItemTitle.textContent);
        
        projTitle.innerHTML = ``;
        taskGroup.textContent = '';
        newProjectItem.remove();
    } )

    Pdialog.querySelector("form").reset();
    Pdialog.close();


}

function addTaskToProject(event) {
    event.preventDefault();

    if (!currentProject) return;

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#desc').value;
    const dueDateInput = document.querySelector('#dueDate').value;

    console.log(dueDateInput)

    if (!title || !dueDateInput) {
        alert("Please enter a task and select a due date.");
        return;
    }


    const formattedDate = format(new Date(dueDateInput), 'MMM d, yyyy');

    currentProject.addTask(new Todo(title, description, formattedDate));

    displayTasks(currentProject.getTasks());

    dialog.querySelector("form").reset();
    dialog.close();
}



// when we add a new project
Pdialog.addEventListener('submit', addNewProject)

dialog.addEventListener('submit', addTaskToProject)