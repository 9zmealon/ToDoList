import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';


import 'bootstrap/dist/css/bootstrap.min.css';


function App() { 

// Tasks (toDo, list ) Main  State
const [toDo, setToDo]  = useState([]);

//Temp State
const[newTask, setNewTask] = useState('');
const[updateData, setUpdateData] = useState('');



 
//Add task
const addTask = () =>{
 if(newTask){
  let num = toDo.length+1;
  let newEntry = { id :num, title : newTask, status : false}
  setToDo([...toDo, newEntry])
  setNewTask('');
 }
}

//Delete task
const deleteTask = (id) =>{
  let newTasks = toDo.filter(task => task.id !== id)
  setToDo(newTasks);
}

//Mar task as done 
const markDone = (id) =>{
let newTask = toDo.map(task => {
  if(task.id === id){
 return({...task,status: !task.status})

  }
  return task;
})
 setToDo(newTask);
}

//cancel update
const cancelUpdate = () =>{
  setUpdateData('');
}

//cancel tassk for update
const changeTask=  (e) =>{
  let newEntry = {
    id:updateData.id,
    title:e.target.value,
    status:updateData.status? true :false
  }
  setUpdateData(newEntry);
}

//Update Task
const updateTask = () =>{
  let filterRecords = [...toDo].filter(task=> task.id !== updateData.id);
  let updatedObject = [...filterRecords, updateData]
  setToDo(updatedObject);
  setUpdateData('');
}


  return (
    <div className="container App">
      <br/>
      <h1>To Do List </h1>
      <br/>


{/* //update task */}
{updateData && updateData ? (
  <UpdateForm
  updateData={updateData} 
  changeTask={changeTask} 
  updateTask={updateTask} 
  cancelUpdate={cancelUpdate} 
  />  
):(
  <AddTaskForm
  newTask={newTask} 
  setNewTask={setNewTask} 
  addTask={addTask}
  />
)}





        


      {/* { / display to do/} */}
      {toDo && toDo.length ? '' : 'NO TASKS....'}


     <ToDo
     toDo={toDo} 
     markDone={markDone} 
     setUpdateData={setUpdateData} 
     deleteTask={deleteTask} 
     
     />


    </div>
  ); 
}

export default App;
