const express = require("express");
const db = require("./database");
const app = express();
let cors = require("cors");

const port = process.env.PORT || 3000;
app.use(cors());

app.get("/test", async (req, res) => {
  res.send("WOrking");
});

app.get("/projects", async (req, res) => {
  const projects = await db.getProjects();
  res.send(projects);
});

app.get("/tasks", async (req, res) => {
  const projects = await db.getTasks();
  res.send(projects);
});

app.get("/:projectName", async (req, res) => {
  const projectName = req.params.projectName;
  const projectTodos = await db.getProjectTodos(projectName);
  res.send(projectTodos);
});

app.get("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const projectTodos = await db.getProjectTodos(projectId);
  res.send(projectTodos);
});

app.get("/:projectName/:id", async (req, res) => {
  const projectName = req.params.projectName;
  const id = req.params.id;
  const todoNote = await db.getNote(projectName, id);
  res.send(todoNote);
});

app.post("/:projectName", async (req, res) => {
  const todo = await db.addTodo(100, "Personal", "This is my new Task");
  res.send(todo);
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
