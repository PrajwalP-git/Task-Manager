import { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskstatus, setTaskStatus] = useState("todo");

const isValidInput =(text)=>{
  const cleanText= text.trim();
  const forbiddenChars= /[<>]/;
  return(
    cleanText.length > 0 &&
    !forbiddenChars.test(cleanText)&&
    !/<script.*>.*?<\/script>/i.test(cleanText)
  )
}
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter both title and description");
      return;
    }

    if(!isValidInput(title)){
      alert("Title contains invalid characters.");
      return;
    }

    if(description.trim().length<10 || description.trim().length>300){
      alert("Description must be between 10 and 300 characters.");
      return;
    }

    if(!isValidInput(description)){
      alert("Description contains invalid characters.");
      return;
    }

    if(!["todo","in_progress", "done"].includes(taskstatus)){
      alert("Invalid task status selected.");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/tasks/", {
        title,
        description,
        taskstatus,
      })
      .then((res) => {
        onTaskAdded();
        setTitle("");
        setDescription("");
        setTaskStatus("todo");
      })
      .catch((err) => console.error("Failed to add task:", err));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add new task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={taskstatus} onChange={(e) => setTaskStatus(e.target.value)}>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
