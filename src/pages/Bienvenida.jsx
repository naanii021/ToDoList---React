import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir a la lista de tareas después de 8 segundos
    const timer = setTimeout(() => {
      navigate('/tasks');
    }, 8000);

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>¡Bienvenido a la lista de tareas, Nani!</h1>
        <div className="loader"></div>
        <p>Organizando tus tareas...</p>
      </div>
    </div>
  );
}

export default Welcome; 