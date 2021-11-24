import React, { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import ListTasks from "./components/ListTasks";
import Sidebar from "./components/Sidebar";
import listTasksService from "./listTasksService";
import ListTasksService from "./listTasksService";


function App() {

  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({title: "List not selected"});
  const [update, setUpdate] = useState([]);


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
      console.log('updated');
      updateActiveList(activeList.listId)
      updateLists()
    }
  }, [update])



  

  const changeActiveList = (listId) => {
    updateActiveList(listId)
    // .then(res => );
  }

  const addNewTask = (t) => {
    if(activeList.listId) {
      listTasksService.createTaskForList(activeList.listId, t)
      .then(res => console.log(res))
      setUpdate(new Date().getTime())
    }
  }
  
  return (
    
      <div className="content card flex-row ">
        <Sidebar onClick={changeActiveList} lists={lists}/>
        <div className="selected-list">
          <ListTasks activeList={activeList} />
          <AddForm onSubmit={addNewTask} onSubmit={addNewTask}/>
        </div> 
      </div>
    
  );
}

export default App;
