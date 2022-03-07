const express = require('express');

const app = express();

const socket = require('socket.io');

const tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user is connected');

  //updateData
  socket.emit('updateData', tasks);

  //addTask
  socket.on('addTask', (task) => {
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });

  socket.on('removeTask', (id) => {
    tasks.splice(tasks.findIndex((task) => task.id === id), 1);
    socket.broadcast.emit('removeTask', id);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});