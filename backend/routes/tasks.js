const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let tasks = [];

// Add a new task
router.post('/add', (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task is required' });
  }
  const newTask = {
    id: uuidv4(),
    task,
    done: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
router.get('/get', (req, res) => {
  res.json(tasks);
});

// Toggle complete
router.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.done = !task.done;
  res.json(task);
});

// Update task
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task: updatedTask } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.task = updatedTask;
  res.json(task);
});

// Delete task
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const removed = tasks.splice(index, 1);
  res.json(removed[0]);
});

module.exports = router;
