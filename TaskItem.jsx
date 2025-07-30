import { useState } from "react";
import axios from "axios";

const TaskItem = ({task, onDelete, onUpdate}) => {
    const [isEditing, setIsEditing] =useState(false);
    const [editedTitle, setEditedTitle] =useState(task.title);
    const [editedDescription, setEditedDescription] =useState(task.description);
    const [editedStatus, setEditedStatus] =useState(task.taskstatus);

    const isValidInput= (text)=>{
        const cleanText= text.trim();
        const forbiddenChars= /[<>]/;
        return(
            cleanText.length >0 &&
            !forbiddenChars.test(cleanText) &&
            !/<script.*?>.*?<\/script>/i.test(cleanText)
        )
    }
    
    const handleSave = ()=> {
        if(editedTitle.trim().length < 3){
            alert("Title must be at least 3 characters.");
            return;
        }

    if (!isValidInput(editedTitle)) {
      alert("Title contains invalid characters.");
      return;
    }

    if (editedDescription.trim().length < 10 || editedDescription.trim().length > 300) {
      alert("Description must be between 10 and 300 characters.");
      return;
    }

    if (!isValidInput(editedDescription)) {
      alert("Description contains invalid characters.");
      return;
    }

    if (!["todo", "in_progress", "done"].includes(editedStatus)) {
      alert("Invalid task status.");
      return;
    }

    const updatedTask= {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        taskstatus: editedStatus,
    }

        if(!isValidInput)

        axios
         .put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, updatedTask)
         .then(()=>{
            setIsEditing(false);
            onUpdate();
         })
          .catch((err)=>console.error("Error updating task:",err));
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedStatus(task.taskstatus);
    }

    return (
        <div className="task-card">
            {isEditing ? (
                <>
                <input
                 type="text"
                 value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                 />
                 <input
                 type="text"
                 value={editedDescription}
                 onChange={(e)=>setEditedDescription(e.target.value)}
                 />
                 <select
                    type="text"
                    value={editedDescription}
                    onChange={(e)=>setEditedStatus(e.target.value)}
                 >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={handleSave}>⚓ Save</button>
                <button onClick={handleCancel}>❌ Cancel</button>
                </>
            ):(
              <>  
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>
                    <strong>Status:</strong> {task.taskstatus}
                </p>
                <button onClick={() =>setIsEditing(true)}>🔧 Edit</button>
                <button className="delete-btn" onClick={()=> onDelete(task.id)}>
                    🗑️ Delete
                </button>
             </>
            )}
            </div>
    )
};

export default TaskItem;