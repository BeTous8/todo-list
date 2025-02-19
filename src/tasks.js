class Todo {
  constructor(
    title,
    description = "",
    dueDate = "No due date",
    priority = "Low",
  ) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export { Todo };
