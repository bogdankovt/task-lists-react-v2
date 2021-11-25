import React, { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import EditTaskModal from "./components/EditTaskModal";
import ListTasks from "./components/ListTasks";
import Sidebar from "./components/Sidebar";
import ListTasksService from "./ListTasksService";


function App() {

  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({title: "List not selected"});
  const [lastUpdate, setLastUpdate] = useState({});
  const [modalData, setModalData] = useState({});

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

  function trigerUpdate() {
    setLastUpdate(new Date().getTime());
  }

  

  const changeActiveList = (listId) => {
    updateActiveList(listId)
  }

  const addNewTask = (t) => {
    if(activeList.listId) {
      ListTasksService.createTaskForList(activeList.listId, t)
      .then(trigerUpdate);
      }
    }


  const deleteTask = (taskId) => {
    ListTasksService.removeTask(taskId)
    .then(trigerUpdate)
  }

  const editTask = (t) => {
    ListTasksService.updateTask(t)
    .then(trigerUpdate)
  }
  
  return (
    
      <div className="content card flex-row ">
        <Sidebar onClick={changeActiveList} lists={lists}/>
        <div className="selected-list">
          <ListTasks activeList={activeList} onDelete={deleteTask} onEdit={(s) => setModalData(s)}/>
          <AddForm onSubmit={addNewTask}/>
        </div> 
        <EditTaskModal onSubmit={editTask} data={modalData}/>
      </div>
    
  );

  
}

export default App;
