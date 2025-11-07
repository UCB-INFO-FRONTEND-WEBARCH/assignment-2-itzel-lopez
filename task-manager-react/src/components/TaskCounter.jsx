function TaskCounter({ tasks, filter }) {
  const totalTasks = tasks.length; // total number of tasks
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  let displayCount;
  if (filter === "active") displayCount = activeTasks;
  else if (filter === "completed") displayCount = completedTasks;
  else displayCount = totalTasks;

  return (
    <div className="task-counter">
      <p>
        {displayCount} / {totalTasks}
      </p>
    </div>
  );
}

export default TaskCounter;
