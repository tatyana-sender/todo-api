const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const corsOptions = {
  origin: ['http://localhost:3002', 'http://localhost'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

let tasks = [];

// GET endpoint to fetch all task items
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST endpoint to create a new task item
app.post("/tasks", (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createDate: req.body.createDate,
    deadline: req.body.deadline,
    project: req.body.project
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT endpiont to update an existing task item with the specified id
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;
  task.deadline = req.body.deadline || task.deadline;
  task.project = req.body.project || task.project;
  res.json(task);
});

// DELETE endpoint to remove an existing task item with the specified id
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "task not found" });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

let projects = [];

// GET endpoint to fetch all projects items
app.get("/projects", (req, res) => {
  res.json(projects);
});

// POST endpoint to create a new project item
app.post("/projects", (req, res) => {
  const project = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    tasks: req.body.tasks || [],
    createDate: req.body.createDate,
    deadline: req.body.deadline
  };
  projects.push(project);
  res.status(201).json(project);
});

// PUT endpiont to update an existing project item with the specified id
app.put("/projects/:id", (req, res) => {
  const id = req.params.id;
  const project = projects.find((t) => t.id === id);
  if (!project) {
    return res.status(404).json({ error: "project not found" });
  }
  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  project.tasks = req.body.tasks || project.tasks;
  project.deadline = req.body.deadline || project.deadline;
  res.json(project);
});

// DELETE endpoint to remove an existing project item with the specified id
app.delete("/projects/:id", (req, res) => {
  const id = req.params.id;
  const index = projects.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "project not found" });
  }
  projects.splice(index, 1);
  res.status(204).send();
});

// run the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
