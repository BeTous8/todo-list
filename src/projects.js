import {Todo} from "./tasks"

class Project {
    constructor(name) {
        this.id = Date.now();
        this.name = name;
        this.task = [];
    }

    addTask(task) {
        this.task.push(task)
    }

    getTasks() {
        return this.task;
    }
}


function projectManager() {
    const projects = [];


    function createProject(projectName) {
        const newProject = new Project(projectName)
        projects.push(newProject);
        return newProject
    }

    function getAllProjects() {
        return projects;
    }


    return {createProject, getAllProjects}
}

export {Project, projectManager}
