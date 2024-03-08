import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaksList";
import Footer from "./components/Footer";

const tasks = [
    {text:"gay sax", completed:true},
    {text:"say gex"},
    {text:"gay sex"},
]
function App() {


  return (
      <section className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm />
        </header>
      <section className="main">
          <ul className="todo-list">
            <TaskList tasks={tasks}/>
          </ul>
      </section>
        <Footer />
      </section>
  );
}


const root = createRoot(document.getElementById('root'))
root.render(<App />);