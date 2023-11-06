require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

exports.getProjects = async function () {
  const [rows] = await pool.query(`SELECT * FROM projects`);
  return rows;
};

exports.getTasks = async function () {
  const [rows] = await pool.query(`SELECT * FROM todos`);
  return rows;
};
exports.getProjectTodos = async function (projectName) {
  const [rows] = await pool.query("SELECT * FROM todos where projectName = ?", [
    projectName,
  ]);
  return rows;
};

exports.getProjectTodos = async function (projectName) {
  const [rows] = await pool.query("SELECT * FROM todos where projectId = ?", [
    projectName,
  ]);
  return rows;
};

exports.getNote = async function (projectName, id) {
  const [rows] = await pool.query(
    "SELECT * FROM todos where projectName = ? and id = ?",
    [projectName, id]
  );
  return rows[0];
};
exports.addTodo = async function (projectID, projectName, task) {
  await pool.query(
    "INSERT INTO todos (projectID, projectName, task, isChecked, status) VALUES (?,?,?,?,?)",
    [projectID, projectName, task, 0, "not started"]
  );
};
