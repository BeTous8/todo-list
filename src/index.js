import "./styles.css";

class Todo {
    constructor(title, description = '', dueDate = 'No due date', priority = 'Low') {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}




function toDoList() {
    const toDoListItems = [];

    function addTodo(item) {
        toDoListItems.push(item);
    }

    function getTodo() {
        return toDoListItems;
    }

    function selectTodo(index) {
        return toDoListItems[index]
    }

    function deleteTodo(index) {
        toDoListItems.splice(index, 1);
    }


    return {addTodo, getTodo, selectTodo, deleteTodo}
}


const list = toDoList();
list.addTodo(new Todo('laundry', "parisa's cloths", 'Wednesday', 'Medium'));
list.addTodo(new Todo('laundry', "parisa's cloths", 'Wednesday', 'Medium'));
list.addTodo(new Todo('shopping'))
// list.deleteTodo(1)


console.log(list.getTodo());
console.log(list.selectTodo(0))


