import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const Create = ({ setTodos }) => {
  const [task, setTask] = useState('');

  const createTask = () => {
    if (!task.trim()) return;
    axios.post('/api/add', { task })
      .then(result => {
        setTodos(prev => [...prev, result.data]);
        setTask('');
      })
      .catch(err => console.log(err));
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') createTask();
  };

  return (
    <main>
      <h1>Todo List</h1>
      <div className='create-form'>
        <input
          type='text'
          placeholder='Enter a task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKey}
          required
        />
        <button onClick={createTask}>ADD</button>
      </div>
    </main>
  );
};

export default Create;
