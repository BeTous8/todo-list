import "./styles.css";
import {Todo} from "./tasks"
import {Project, projectManager} from "./projects";




const project1 = projectManager();
const workProject = project1.createProject('home');
workProject.addTask(new Todo('check emails'))


console.log(project1.getAllProjects());


