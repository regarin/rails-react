import React, { useState } from "react";
import { useQuery, useMutation } from 'react-query'

export default () => {
  const [inputValue, setInputValue] = useState('');
  const { isLoading: isLoadingTasks, data: tasks, refetch: loadTasks } = useQuery('tasks', () =>
    fetch("/api/v1/tasks").then(res =>
      res.json()
    ), {
      refetchInterval: 5 * 1000,
    }
  );

  const { mutate: addTask } = useMutation(() => {
    const newTask = {
      description: inputValue,
    }
    return fetch("/api/v1/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask),
    }).then(loadTasks);
  });

  const { mutate: removeTask } = useMutation((id) => {
    return fetch(`/api/v1/tasks/${id}`, {
      method: 'DELETE',
    }).then(loadTasks);
  });

  if (isLoadingTasks) {
    return (
      <div className="p-5">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl mb-6">Tareas</h1>

      <div className="mb-6">
        <label className="">Nueva tarea:</label><br></br>
        <input className="rounded-md border-gray-300 mr-2" type="text" onChange={(e) => setInputValue(e.target.value)} />
        <button className="rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2" type="button" onClick={addTask}>Agregar</button>
      </div>

      { tasks.map((task) => (
        <div key={task.id} className="flex flex-row justify-between hover:bg-gray-100 rounded-md px-4 py-2 items-center max-w-md">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="mr-3 rounded-sm"/>
            <p className="text-gray-700">
              { task.description }
            </p>
          </div>
          <button className="" type="button" onClick={() => removeTask(task.id) } data-testid={`remove-${task.id}`}>x</button>
        </div>
      )) }
    </div>
  );
};
