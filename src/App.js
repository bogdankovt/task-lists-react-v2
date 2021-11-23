import React, { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import ListTasks from "./components/ListTasks";
import Sidebar from "./components/Sidebar";
import listTasksService from "./listTasksService";


function App() {

  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({});
  


  useEffect(() => {
    listTasksService.getAll()
      .then(res => {
        setLists(res)
        listTasksService.getListById(res[0].listId)
        .then(res => setActiveList(res))
      })
  }, []);
  


  

  const useChangeActiveList = (listId) => {
    listTasksService.getListById(listId)
      .then(res => {
        setActiveList(res);
        console.log(res);
      })
    // .then(res => );
  }

  // const addNewTask = (t) => {
  //   setActiveList({...activeList, tasks: [...activeList.tasks, t]})
  //   const newList = [...lists];
  //   let findIndex = newList.findIndex(l => l.id == activeList.id)
  //   newList[findIndex] = {...activeList, tasks:[...activeList.tasks, t]}
  //   setLists(newList)
  // }
  
  return (
    
      <div className="content card flex-row ">
        <Sidebar onClick={useChangeActiveList} lists={lists}/>
        <div className="selected-list">
          <ListTasks activeList={activeList} />
          {/* <AddForm onSubmit={addNewTask}/> */}
        </div> 
      </div>
    
  );
}

export default App;
