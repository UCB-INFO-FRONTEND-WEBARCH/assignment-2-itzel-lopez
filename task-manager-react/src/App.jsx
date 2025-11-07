import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import "./App.css";

import menuIcon from "./assets/menu_icon.png";
import searchIcon from "./assets/search_icon.png";
import checkIcon from "./assets/check_icon.png";
import inboxIcon from "./assets/inbox_icon.png";
import calendarIcon from "./assets/calendar_icon.png";
import upcomingIcon from "./assets/upcoming_icon.png";

function App() {
  // state for all tasks
  const [tasks, setTasks] = useState([]);
  // state for current filter: all / active / completed
  const [filter, setFilter] = useState("all");

  // add a new task to the list
  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // toggle a task's completed status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // delete a task from the list
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // get tasks based on current filter
  const getFilteredTasks = () => {
    if (filter === "active") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <header>
        <div id="left-side">
          <button className="hamburger-menu">
            <img src={menuIcon} alt="menu icon" />
          </button>

          <form id="search-bar">
            <img src={searchIcon} alt="search icon" />
            <input type="search" placeholder="Quick find" />
          </form>
        </div>

        <div id="task-counter">
          <span>
            <img src={checkIcon} alt="check icon" />
          </span>
          {/* show task completion ratio based on filter */}
          <TaskCounter tasks={tasks} filter={filter} />
        </div>
      </header>

      <main className="main-layout">
        <aside className="column-one-nav">
          <nav className="navigation">
            <ul>
              <li>
                <img src={inboxIcon} alt="inbox icon" />
                <span>Inbox</span>
                <span className="task-count">{tasks.length}</span>
              </li>
              <li>
                <img src={calendarIcon} alt="calendar icon" />
                <span>Today</span>
                <span className="task-count">{tasks.length}</span>
              </li>
              <li>
                <img src={upcomingIcon} alt="upcoming icon" />
                <span>Upcoming</span>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="column-two-list">
          <h1>Inbox</h1>

          {/* form to add a new task */}
          <TaskForm onAddTask={addTask} />

          {/* filter buttons for task list */}
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          {/* show filtered tasks */}
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>
      </main>
    </>
  );
}

export default App;
