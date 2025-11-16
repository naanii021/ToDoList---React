import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NuevaTarea.css";

function EditTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "media",
  });

  useEffect(() => {
    if (location.state?.task) {
      setTaskData(location.state.task);
    } else {
      navigate("/tasks");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskData.title.trim()) {
      alert("Por favor, ingresa un título para la tarea");
      return;
    }

    // Pasar la tarea editada de vuelta a la página de tareas
    navigate("/tasks", {
      state: { editedTask: taskData },
    });
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  return (
    <div className="new-task-container">
      <div className="new-task-card">
        <h1>✏️ Editar Tarea</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title"> Título <span className="required">*</span></label>
            <input type="text" id="title" name="title" value={taskData.title}
              onChange={handleChange}
              placeholder="Ej: Comprar alimentos"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" value={taskData.description}
              onChange={handleChange}
              placeholder="Añade detalles sobre la tarea..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Prioridad</label>
            <select id="priority" name="priority" value={taskData.priority}
              onChange={handleChange}>

              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit"> Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
