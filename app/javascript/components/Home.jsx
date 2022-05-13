import React, { useState } from "react";

export default () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function addTask () {
    const newTask = {
      description: inputValue,
      id: tasks.length + 1,
    }
    const newTasks = tasks.concat([newTask]);
    setTasks(newTasks);
  }

  function removeTask (id) {
    const newTasks = tasks.filter((task) => (
      task.id !== id
    ));
    setTasks(newTasks);
  }

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
