import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NuevaTarea.css';

function NewTask() {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'media'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskData.title.trim()) {
      alert('Dale un titulo a la tarea');
      return;
    }

    // Pasar los datos de la tarea a la página de tareas
    // solucion nativa y recomendada, sin librerias.
    // datos temporales y seguros, se limpian al navegar.
    // facil de mantener y escalar.
    navigate('/tasks', { 
      state: { newTask: taskData }  // <-- Aquí se pasa la nueva tarea
    });
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="new-task-container">
      <div className="new-task-card">
        <h1>✨ Nueva Tarea</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title"> Título <span className="required"> * </span></label>
            <input type="text" id="title" name="title" value={taskData.title}
              onChange={handleChange}
              placeholder="Ej: Ir al Petalos..."
              required/>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" value={taskData.description}
              onChange={handleChange}
              placeholder="Añade cosas de la tarea..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Prioridad</label>
            <select id="priority" name="priority" value={taskData.priority}
              onChange={handleChange}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}> Cancelar </button>
            <button type="submit" className="btn-submit"> Crear Tarea </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTask;