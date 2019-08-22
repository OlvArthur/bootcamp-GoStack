const express = require('express');
const server = express();

server.use(express.json());

const projects = [];
let contRequest = 0;

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const find = projects.find(function(elemento) {
    return elemento.id === id;
  });

  if (!find) {
    return res.status(400).json('Project not found');
  }

  return next();
}

server.use((req, res, next) => {
  contRequest++;

  console.log(`Requisições feitas até o momento: ${contRequest}`);

  next();
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const tasks = [];

  const project = { id, title, tasks };

  projects.push(project);

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //const project = projects.find(item => item.id == id);
  const find = projects.find(function(elemento) {
    return elemento.id === id;
  });

  find.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const find = projects.findIndex(item => item.id == id);
  console.log(find);

  projects.splice(find, 1);

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const find = projects.find(function(elemento) {
    return elemento.id === id;
  });

  find.tasks.push(title);

  return res.json(projects);
});

server.listen(3333);
