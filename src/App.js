import react from "react";
import React, { useState, useEffect } from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import AddForm from "./components/AddForm";
import EditTaskModal from "./components/EditTaskModal";
import ListTasks from "./components/ListTasks";
import Sidebar from "./components/Sidebar";
import ListTasksService from "./ListTasksService";
import {Routes,Route} from "react-router-dom";
import ListNotSelected from "./components/ListNotSelected";
import TasksForToday from "./components/TasksForToday"
function App() {

  return (
    
      <div className="content card flex-row ">
        <Sidebar/>
        <div className="selected-list">
          <div className="card p-4 h-100">
            <Routes>
              <Route path="/" element={<ListNotSelected/>} />
              <Route path="/lists-tasks/:id" element={<ListTasks />} />
              <Route path="/today" element={<TasksForToday />} />
            </Routes>
          </div>
        </div>
      </div>
    
  );

  
}

export default App;
