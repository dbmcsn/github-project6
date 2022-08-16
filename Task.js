import React from "react";

const Task = ({ id, name, status, completeTask, deleteClick }) => {

    return (
      <div className="Task">
        <h2>{name}</h2>
        {status && <p><small>Well done!</small></p>}
        {!status && 
                <button className="doneB" onClick={() =>completeTask(id)}>
                D o n e
                </button> }
        <button className="deleteB" onClick={() => deleteClick(id)}>D e l e t e</button>
      </div>
    );
}
export default Task;