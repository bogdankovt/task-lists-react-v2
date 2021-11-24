import React, { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import ListTasks from "./components/ListTasks";
import Sidebar from "./components/Sidebar";
import listTasksService from "./listTasksService";
import ListTasksService from "./listTasksService";


function App() {

  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({title: "List not selected"});
  const [lastUpdate, setLastUpdate] = useState([]);


  const updateLists = () => {
    ListTasksService.getAll()
      .then(res => {
        setLists(res.lists)
      })
  }

  const updateActiveList = (listId) => {
    ListTasksService.getListById(listId)
      .then(res => {
        setActiveList(res);
      })
  }

  useEffect(() => {
    updateLists()
  }, []);
  

  useEffect(() => {
    if(activeList.listId) {
      updateActiveList(activeList.listId)
      updateLists()
    }
  }, [lastUpdate])



  

  const changeActiveList = (listId) => {
    updateActiveList(listId)
  }

  const addNewTask = (t) => {
    if(activeList.listId) {
      console.log(t);
      listTasksService.createTaskForList(activeList.listId, t)
      .then(trigerUpdate);
      }
    
    }


  const deleteTask = (taskId) => {
    ListTasksService.removeTask(taskId)
    .then(trigerUpdate)
  }
  
  return (
    
      <div className="content card flex-row ">
        <Sidebar onClick={changeActiveList} lists={lists}/>
        <div className="selected-list">
          <ListTasks activeList={activeList} onDelete={deleteTask}/>
          <AddForm onSubmit={addNewTask}/>
        </div> 
      </div>
    
  );

  function trigerUpdate() {
    setLastUpdate(new Date().getTime());
  }
}

export default App;
