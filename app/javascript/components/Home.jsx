import React, { useState, useEffect } from "react";

export default () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  async function addTask () {
    const newTask = {
      description: inputValue,
    }
    const response = await fetch("/api/v1/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask),
    });
    if (response.ok) {
      loadTasks();
    }
  }

  async function removeTask (id) {
    const response = await fetch(`/api/v1/tasks/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      loadTasks();
    }
  }

  async function loadTasks () {
    const response = await fetch("/api/v1/tasks")
    if (response.ok) {
      const jsonResponse = await response.json();
      setTasks(jsonResponse);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="main-container">
      <h1 className="title">Tareas</h1>

      <div className="new-task">
        <label className="label">Nueva tarea:</label><br></br>
        <input className="task-input" type="text" onChange={(e) => setInputValue(e.target.value)} />
        <button className="add-task" type="button" onClick={addTask}>Agregar</button>
      </div>

      { tasks.map((task) => (
        <div key={task.id} className="task-container">
          <div className="task-subcontainer">
            <input type="checkbox" className="checkbox"/>
            <p className="description">
              { task.description }
            </p>
          </div>
          <button className="remove-button" type="button" onClick={() => removeTask(task.id) }>x</button>
        </div>
      )) }
    </div>
  );
};
