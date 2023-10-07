import "bootstrap/dist/css/bootstrap.min.css"
import React, { Component } from "react";
import {BrowserRouter as Router, Link, Routes, Route} from ":react-router-dom";
 
import CreateTodos from "./Components/create-todo-component"; 
import TodosList from "./Components/todos-list-component";
import EditTodo from "./Components/edit-todo-component";

class App extends Component{

  render(){
    return (
      <Router>
      
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light-bg-light"></nav>

            <Route path="/" exact element={<TodosList/>}/>
            <Route path="/edit:id" element={<EditTodo/>}/>
            <Route path="/createtodos" element={<CreateTodos/>} />
        </div>
        
  
      </Router>
     )
    }
  };

  

