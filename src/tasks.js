class Todo {
  constructor(
    title,
    description = "",
    dueDate = "No due date",
    priority = "Low",
  ) {
    this.id = Date.now() + Math.random(); // Ensure unique ID;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export { Todo };
