import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import {Routes, Route} from 'react-router';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [message, setMessage] = useState("");

  const initialTasks = [
    {
      id: uuidv4(),
      name: "Fix Bed",
      done: false,
    },
    {
      id: uuidv4(),
      name: "Walk dog",
      done: false,
    },
    {
      id: uuidv4(),
      name: "Clean bathroom",
      done: false,
    },
    {
      id: uuidv4(),
      name: "Clean PC",
      done: false,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const completeTaskHandler = (id) => {
    let newState = [...tasks];

    //look for the index of the given ID
    const index = newState.findIndex((task) => task.id === id);

    //change the done from false to true
    newState[index].done = true;

    //set the State to the new value
    setTasks(newState);
  };

  //binding of new task
  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleDeleteClick = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);
    setTasks(deleteTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTask = {
      id: uuidv4(),
      name: message,
      done: false,
    };
  
  const targetTask = tasks.filter((task) => task.name.toLowerCase().trim() === message.toLowerCase().trim());

  if (targetTask.length <= 0 && message.trim() !== "") {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    } else if (
    message.trim() == "") {
      alert('No task included.');
    } else {
      alert('Already here.');
    }
   setMessage('');
  }

  return (
    <div className="App">
      <div>
        <form>
        <h1>To Do List :</h1>
        <br />
        <input className="textBox" type="text" value={message} onChange={changeMessage} />
        <button className="addB" type="submit" onClick={(e) => handleSubmit(e)}> A d d </button>
        <br /> <br />
        </form>

        <nav className="taskOps">
          <Link to="">All Tasks</Link>
          <Link to="done"> Done Tasks</Link>
          <Link to="pending"> Pending Tasks</Link>
        </nav>
      </div>

        <Routes>
          <Route path="" element={<TaskList tasks={tasks} completeTask={completeTaskHandler} deleteClick={handleDeleteClick}/>} />
          <Route path=":status" element={<TaskList tasks={tasks} completeTask={completeTaskHandler} deleteClick={handleDeleteClick}/>} />
        </Routes>
    </div>
  );
};

export default App;