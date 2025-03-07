import { Todo } from "./tasks.js";

class Project {
  constructor(name) {
    this.id = Date.now();
    this.name = name;
    this.task = [];
  }

  addTask(task) {
    this.task.push(task);
  }

  taskFinder(id) {
    return this.task.find(item => item.id === id);
  }

  updateTask(task) {
    const targetTask = this.taskFinder(task.id);
    targetTask.title = task.title;
    targetTask.description = task.description;
    targetTask.dueDate = task.dueDate;
    targetTask.priority = task.priority;

  }

  getTasks() {
    return this.task;
  }

  deleteTask(index) {
    this.task.splice(index, 1);
  }
}

function projectManager() {
  let projects = [];

  function createProject(projectName) {
    const newProject = new Project(projectName);
    projects.push(newProject);
    // saveToLocalStorage();
    return newProject;
  }

  function getAllProjects() {
    return projects;
  }

  function projectFinder(projectName) {
    // loop through all the projects if one of them match the given one then return that project
    return projects.find((item) => item.name === projectName);
  }

  function removeProject(projectName) {
    projects = projects.filter((item) => item.name !== projectName);
    // saveToLocalStorage();
    return projects;
  }

  function clearProjects() {
    projects = [];
  }

  return {
    createProject,
    getAllProjects,
    projectFinder,
    removeProject,
    clearProjects,
    
  };
}

export { Project, projectManager };
