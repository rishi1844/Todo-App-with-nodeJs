import React, { useEffect, useState } from 'react';
import Create from './Create';
import '../App.css';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';
import confetti from 'canvas-confetti';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('/api/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const toggleDone = (id) => {
  axios.put(`/api/edit/${id}`)
    .then(res => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? res.data : todo
      );
      setTodos(updatedTodos);
    })
    .catch(err => console.log(err));
};

  const updateTask = (id) => {
    axios.put(`/api/update/${id}`, { task: editTask })
      .then(result => {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? result.data : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
        setEditTask('');
      })
      .catch(err => console.log(err));
  };

  const deleteTask = (id) => {
    axios.delete(`/api/delete/${id}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(err => console.log(err));
  };

  const handleEditKey = (e, id) => {
    if (e.key === 'Enter') updateTask(id);
  };

  const completedCount = todos.filter(t => t.done).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  useEffect(() => {
    if (todos.length > 0 && completedCount === todos.length) {
      fireCelebration();
    }
  }, [completedCount, todos.length]);

  const fireCelebration = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  return (
    <main>
      <Create setTodos={setTodos} />

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {
        todos.length === 0 ? <div className='task'>No tasks found</div> :
          todos.map((todo) => (
            <div className='task' key={todo.id}>
              <div className='checkbox'>
                {todo.done
                  ? <BsFillCheckCircleFill className='icon' onClick={() => toggleDone(todo.id)} />
                  : <BsCircleFill className='icon' onClick={() => toggleDone(todo.id)} />}
                {editId === todo.id ? (
                  <input
                    type='text'
                    value={editTask}
                    onChange={e => setEditTask(e.target.value)}
                    onKeyDown={(e) => handleEditKey(e, todo.id)}
                    autoFocus
                  />
                ) : (
                  <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
                )}
              </div>
              <div>
                <span>
                  <BsPencil className='icon edit' onClick={() => {
                    if (editId === todo.id) {
                      updateTask(todo.id);
                    } else {
                      setEditId(todo.id);
                      setEditTask(todo.task);
                    }
                  }} />
                  <BsFillTrashFill className='icon delete' onClick={() => deleteTask(todo.id)} />
                </span>
              </div>
            </div>
          ))
      }
    </main>
  );
};

export default Home;
