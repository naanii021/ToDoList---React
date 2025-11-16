import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TaskList.css';

function Tarea() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);



  // Cargar tareas desde localStorage al montar el componente
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Recibir nueva tarea desde la página de nueva tarea
  // Forma oficial y recomendada, no necesita librerias.
  //datos temporales y seguros, se limpian al navegar.
  //tipado de codigo, facil de mantener y escalar.
  useEffect(() => {
    if (location.state?.newTask) { // <- AQUI SE RECIBEN LAS NUEVAS TAREAS
      const newTask = {
        ...location.state.newTask,
        id: Date.now(),
        completed: false
      };
      
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      
      // Limpiar el state para evitar duplicados
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.newTask]);

  // Recibir tarea editada
  useEffect(() => {
    if (location.state?.editedTask) {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => 
          task.id === location.state.editedTask.id 
            ? location.state.editedTask 
            : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      
      // Limpiar el state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.editedTask]);

  // Marcar tarea como completada/incompleta
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Eliminar tarea
  const deleteTask = (id) => {
    if (window.confirm('Estás seguro de que quieres eliminar esta tarea?')) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  // Navegar a editar tarea
  const editTask = (task) => {
    navigate(`/edit-task/${task.id}`, { state: { task } });
  };

    // contador de tareas y progreso 
    const total = tasks.length;
    const completadas = tasks.filter(t => t.completed).length;
    const pendientes = total - completadas;
    const porcentaje = total > 0 ? (completadas / total ) * 100 : 0;
  

  return (
    <div className="task-list-container">
      <header className="task-header">
        <h1>📝 Mis Tareas</h1>
        <button className="btn-new-task"onClick={() => navigate('/new-task')}> + Nueva Tarea </button>
      </header>

      {/* CONTADOR  */}
      {tasks.length > 0 && (
        <>
          <div className="stats-container">
            <div className='stat-card'>
              <span className='stat-number'>{total}</span>
              <span className='stat-label'>Total</span>
            </div>
            <div className='stat-card'>
              <span className='stat-number'>{pendientes}</span>
              <span className='stat-label'>Pendientes</span>
            </div>
            <div className='stat-card'>
              <span className='stat-number'>{completadas}</span>
              <span className='stat-label'>Completadas</span>
            </div>
          </div>

        <div className='progress-container'>
          <div className="progress-bar" style={{ width: `${porcentaje}%` }}>
            {porcentaje > 0 && `${porcentaje.toFixed(0)}%`}
          </div>
        </div>
        </>
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tienes tareas aún</p>
          <p className="empty-subtitle">¡Comienza agregando una nueva tarea!</p>
        </div>
      ) : (
        <div className="tasks-wrapper">
          <div className="tasks-section">
            <h2>Pendientes ({tasks.filter(t => !t.completed).length})</h2>
            <div className="tasks-grid">
              {tasks.filter(task => !task.completed).map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-content">
                    <input type="checkbox" checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="task-checkbox"/> 

                    <div className="task-info">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                      {task.priority && (
                        <span className={`priority priority-${task.priority}`}>
                          {task.priority}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="task-actions">
                    <button className="btn-edit" onClick={() => editTask(task)}title="Editar"> ✏️ </button>
                    <button className="btn-delete" onClick={() => deleteTask(task.id)} title="Eliminar"> 🗑️ </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {tasks.some(task => task.completed) && (
            <div className="tasks-section">
              <h2> Completadas ({tasks.filter(t => t.completed).length})</h2>
              <div className="tasks-grid">
                {tasks.filter(task => task.completed).map(task => (
                  <div key={task.id} className="task-card completed">
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="task-checkbox"
                      />
                      <div className="task-info">
                        <h3>{task.title}</h3>
                        {task.description && <p>{task.description}</p>}
                        {task.priority && (
                          <span className={`priority priority-${task.priority}`}>
                            {task.priority}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="task-actions">
                      <button  className="btn-edit" onClick={() => editTask(task)}
                        title="Editar"> ✏️ </button>
                      <button className="btn-delete" onClick={() => deleteTask(task.id)}
                        title="Eliminar" > 🗑️ </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Tarea;