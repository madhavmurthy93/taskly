import { useState } from "react";

export default function Tasks({ categories, filter }) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  function handleAddTask(task) {
    setTasks((cur) => [...cur, task]);
  }

  function handleToggleTask(id) {
    setTasks((cur) =>
      cur.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  function handleDeleteTask(id) {
    setTasks((cur) => cur.filter((task) => task.id !== id));
  }

  function filterTask(task) {
    if (filter === "all") return true;
    if (!task.datetime) return filter === "today";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(task.datetime);
    taskDate.setHours(0, 0, 0, 0);
    if (filter === "today") return taskDate.getTime() === today.getTime();
    if (filter === "upcoming") return taskDate.getTime() > today.getTime();
    if (filter === "past") return taskDate.getTime() < today.getTime();
    return true;
  }

  function header() {
    if (filter === "all") return "All Tasks";
    if (filter === "today") return "Today's Tasks";
    if (filter === "upcoming") return "Upcoming Tasks";
    if (filter === "past") return "Past Tasks";
  }

  return (
    <div className="tasks">
      <h2>{header()}</h2>
      <ul>
        {tasks
          .filter(filterTask)
          .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
          .map((task, index) => (
            <Task
              key={index}
              task={task}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
      {showForm && <AddTask onAddTask={handleAddTask} categories={categories} />}
      <button onClick={() => setShowForm((cur) => !cur)}>{showForm ? "Close" : "Add Task"}</button>
    </div>
  );
}

function Task({ task, onToggleTask, onDeleteTask }) {
  return (
    <li>
      <input type="checkbox" checked={task.completed} onChange={() => onToggleTask(task.id)} />
      <span style={task.completed ? { textDecoration: "line-through" } : {}}>{task.task}</span>
      <span className="category">{task.category}</span>
      <span className="datetime">{task.datetime}</span>
      <button onClick={() => onDeleteTask(task.id)}>❌</button>
    </li>
  );
}

function AddTask({ onAddTask, categories }) {
  const [task, setTask] = useState("");
  const [datetime, setDatetime] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      task,
      datetime,
      category,
      completed: false,
    };

    onAddTask(newTask);
    setTask("");
    setDatetime("");
    setCategory("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Task</label>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <label>Date and time</label>
      <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index}>{category}</option>
        ))}
      </select>
      <button>Add</button>
    </form>
  );
}
