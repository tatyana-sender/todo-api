// require dependencies so they can be used throughout this code
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// initialize Express.js server and save as a variable
// so it can be referred to as app
const app = express();

app.use(bodyParser.json());

let tasks = []; // In-memory storage for tasks

// GET endpoint to fetch all task items
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST endpoint to create a new task item
// provide title and optionally completed in the request body as JSON
app.post("/tasks", (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createDate: req.body.createDate,
    deadline: req.body.deadline
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT endpiont to update an existing task item with the specified id
// provide updated title and/or completed in the request body as JSON
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  console.log(task, 'request task')
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;
  task.deadline = req.body.deadline || task.deadline;
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

// run the server on port 3000
// for example the app can run locally at this URL: http://localhost:3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});