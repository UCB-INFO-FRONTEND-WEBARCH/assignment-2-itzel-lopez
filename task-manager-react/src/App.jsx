import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import "./App.css";

// Import icons
import menuIcon from "./assets/menu_icon.png";
import searchIcon from "./assets/search_icon.png";
import checkIcon from "./assets/check_icon.png";
import inboxIcon from "./assets/inbox_icon.png";
import calendarIcon from "./assets/calendar_icon.png";
import upcomingIcon from "./assets/upcoming_icon.png";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Add a new task
  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    return tasks; // 'all'
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <header>
        <div id="left-side">
          <button className="hamburger-menu">
            <img src={menuIcon} alt="icon of a menu" />
          </button>

          <form id="search-bar">
            <img src={searchIcon} alt="icon of search" />
            <input type="search" placeholder="Quick find" />
          </form>
        </div>

        <div id="task-counter">
          <span>
            <img src={checkIcon} alt="icon of a check" />
          </span>
          <TaskCounter tasks={tasks} />
        </div>
      </header>

      <main className="main-layout">
        <aside className="column-one-nav">
          <nav className="navigation">
            <ul>
              <li>
                <img src={inboxIcon} alt="icon of an inbox" />
                <span>Inbox</span>
                <span className="task-count">{tasks.length}</span>
              </li>
              <li>
                <img src={calendarIcon} alt="icon of a calendar" />
                <span>Today</span>
                <span className="task-count">{tasks.length}</span>
              </li>
              <li>
                <img src={upcomingIcon} alt="icon of upcoming" />
                <span>Upcoming</span>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="column-two-list">
          <h1>Inbox</h1>

          <TaskForm onAddTask={addTask} />

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
