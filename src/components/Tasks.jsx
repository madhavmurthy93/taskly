import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagIcon from "@mui/icons-material/Tag";

export default function Tasks({ categories, filter }) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  function handleAddTask(task) {
    setTasks((cur) => [...cur, task]);
    setShowForm(false);
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
    if (!task.date) return filter === "today";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(task.date);
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
    <Stack spacing={1} alignItems="flex-start">
      <Typography variant="h4">{header()}</Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {tasks
          .filter(filterTask)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((task, index) => (
            <Task
              key={index}
              task={task}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </List>
      {showForm && <AddTask onAddTask={handleAddTask} categories={categories} />}
      <Button variant="outlined" onClick={() => setShowForm((cur) => !cur)}>
        {showForm ? "Close" : "Add Task"}
      </Button>
    </Stack>
  );
}

function Task({ task, onToggleTask, onDeleteTask }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(task.id)}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge="start" checked={task.completed} onChange={() => onToggleTask(task.id)} />
        </ListItemIcon>
        <ListItemText
          primary={task.task}
          primaryTypographyProps={{
            sx: { textDecoration: task.completed ? "line-through" : "none" },
          }}
          secondary={
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              <Box display="flex">
                <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {task.date}
                </Typography>
              </Box>
              <Box display="flex">
                <TagIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {task.category}
                </Typography>
              </Box>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

function AddTask({ onAddTask, categories }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      task,
      date: date,
      category,
      completed: false,
    };

    onAddTask(newTask);
    setTask("");
    setDate("");
    setCategory("");
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-start" }}
    >
      <FormControl>
        <TextField
          label="Task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
}
