import {Todo} from "./tasks.js"

export function saveToLocalStorage(allProjectList) {
    localStorage.setItem("projects", JSON.stringify(allProjectList));
}
  
export function loadFromLocalStorage(manager) {
    const storedProjects = localStorage.getItem("projects");
  
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      console.log("Loaded Projects:", parsedProjects);
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
    }
    return manager.getAllProjects();
}