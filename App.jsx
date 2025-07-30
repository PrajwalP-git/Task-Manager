import "./App.css";
import { useEffect, useState, useRef} from "react";
import axios from "axios";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const hasFetched= useRef(false);

  const fetchTasks=() => {
    console.log("Fetching tasks...")
    axios
      .get("http://127.0.0.1:8000/api/tasks/")
      .then((res) =>{
         console.log("Tasks fetched:",res.data);
         setTasks(res.data);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }

  useEffect(()=>{
    if(!hasFetched.current){
    fetchTasks();
    hasFetched.current=true;
    }
  }, [])

  const handleDelete= (id) =>{
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
      .then(() => fetchTasks())
      .catch((err) => console.error("Error deleting task:",err))
  }

  const handleUpdate = (updatedTask)=>{
    axios
      .put(`http:/127.0.0.1:8000/api/tasks/${updatedTask.id}/`, updatedTask)
      .then(()=>fetchTasks())
      .catch((err)=>console.error("Error updating task:",err));
  }

  return (
    <div className="container">
      <h1 className="heading">Task List</h1>

      <TaskForm onTaskAdded={fetchTasks}/>
      <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate}/>
    </div>
  );
}

export default App;
