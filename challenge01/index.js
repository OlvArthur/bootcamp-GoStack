const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id: id, title: title, tasks: tasks });

  return res.json(projects);
  //return res.json(`id: ${id}, title: ${title}, tasks: ${tasks}`);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  return res.json(projects);
});

server.delete('/projects/:id', (req, res) => {
  projects.splice(id, 1);
});

server.listen(3333);
