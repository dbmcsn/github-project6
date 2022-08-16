import React from "react";
import { useParams } from 'react-router';
import Task from "./Task";

const TaskList = ({ tasks, completeTask, deleteClick }) => {
  const { status } = useParams();
  let filter = status === "done" ? true : (status === 'pending' ? false : "");
  

  return (
    <div>
        <h1></h1>
        {
            tasks.map(task => (task.done === filter || filter === "") && 
                <Task
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    status={task.done}
                    completeTask={completeTask} 
                    deleteClick={deleteClick}
        />
        )}
    </div>
  )
};

export default TaskList;