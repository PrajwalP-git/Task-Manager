import TaskItem from "./TaskItem";

const TaskList= ({tasks, onDelete, onUpdate}) =>{
    if(tasks.length === 0){
        return<p className="no-tasks">✅ No tasks left!</p>
    }
    return(
        <div>
            {tasks.map((task) =>(
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  />
            )
            )

            }
        </div>
    )
}

export default TaskList;