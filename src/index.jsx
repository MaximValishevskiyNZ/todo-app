import React, {useState} from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaksList";
import Footer from "./components/Footer";

const data = [
    {id: crypto.randomUUID(), text:"gay sax", completed:true },
    {id: crypto.randomUUID(), text:"say gex", completed:true},
    {id: crypto.randomUUID(), text:"gay sex", completed:false},
]
function App() {

    const [tasks, setTasks] = useState(data)
    const [filter, setFilter] = useState('All')

    const addTask = (event) => {
        if (event.key === 'Enter') {
            const newTask = { id: crypto.randomUUID(), text: event.target.value };
            setTasks([...tasks, newTask]);
            // eslint-disable-next-line no-param-reassign
            event.target.value = '';
        }
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    return (
      <section className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm addTask={addTask}/>
        </header>
      <section className="main">
          <ul className="todo-list">
            <TaskList tasks={tasks} onDelete={deleteTask} filter={filter} setTasks={setTasks}/>
          </ul>
      </section>
        <Footer setFilter={setFilter} tasks={tasks} setTasks={setTasks}/>
      </section>
  );
}


const root = createRoot(document.getElementById('root'))
root.render(<App />);