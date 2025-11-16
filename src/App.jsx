import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bienvenida from './pages/bienvenida';
import Tarea from './pages/tarea';
import NuevaTarea from './pages/nuevaTarea';
import EditarTarea from './pages/editarTarea';
import './App.css';

function App() {
  return (
    // Envolvemos la aplicación con el Router
    // mantiene sincrionizado el UI y la URL
    // usa la api de historial del navegador

    <Router> {/*habilita la navegación entre componentes*/}
      <div className="App">
        <Routes>  {/*definimos las rutas de la app*/}
          <Route path="/" element={<Bienvenida />} /> {/*Ruta de bienvenida*/}
          <Route path="/tasks" element={<Tarea />} /> 
          <Route path="/new-task" element={<NuevaTarea />} />
          <Route path="/edit-task/:id" element={<EditarTarea />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/* Flujo completo en la aplicación
```
1. entramos a http://localhost:5173/
    ↓
2. Router busca la ruta "/"
    ↓
3. Renderiza <Bienvenida />
    ↓
4. Después de 8 segundos: enavigate('/tasks')
    ↓
5. Router busca la ruta "/tasks"
    ↓
6. Renderiza <Tarea />
    ↓
7. hacemos clic en "+ Nueva Tarea" para crear una 
    ↓
8. navigate('/new-task')
    ↓
9. Router renderiza <NuevaTarea />
    ↓
10. enviamos el formulario relleno
    ↓
11. navigate('/tasks', { state: { newTask } })
    ↓
12. Router renderiza <Tarea /> con los datos nuevos
    ↓
13. useEffect detecta location.state?.newTask 
    ↓
14. Agrega la tarea a la lista y localStorage*/
