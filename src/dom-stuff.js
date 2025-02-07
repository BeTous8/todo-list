import {Project, projectManager} from "./projects";
import {Todo} from "./tasks"

const addTask = document.querySelector('.add-task');
const content = document.querySelector('.content');
const dialog = document.querySelector('.dialog');
const showTasks = document.querySelector('.show-tasks');


addTask.addEventListener('click', () => {
    dialog.showModal();
});

const myProjects = projectManager();
const home = myProjects.createProject('home');

dialog.addEventListener('submit', (event) => {
    event.preventDefault();
    

    const title = document.querySelector('#title').value;
    home.addTask(new Todo(title));
    displayTasks();

    dialog.querySelector("form").reset();
    dialog.close();
})



function displayTasks() {
    showTasks.textContent = '';
    const taskArr = home.getTaskTitles();
    console.log(taskArr)
    taskArr.forEach(item => {
        const task = document.createElement('p');
        task.textContent = item;
        showTasks.append(task)
    })

}