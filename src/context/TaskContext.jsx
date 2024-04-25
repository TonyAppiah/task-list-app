import { createContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  // const [taskIDs, setTaskIDs] = useState([]);

  const [taskToEdit, SetTaskToEdit] = useState({
    task: {},
    inEditMode: false,
  });

  const [filterInputValue, setFilterInputValue] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(filterInputValue.toLowerCase())
  );

  function handleFilterInputValue(inputValue) {
    setFilterInputValue(inputValue);
  }

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    let tasksFromStorage;

    if (localStorage.getItem("tasks") === null) {
      tasksFromStorage = [];
    } else {
      const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasksFromStorage.reverse());
    }
  }

  function addTaskToDOM(newTask) {
    setTasks([newTask, ...tasks]);

    //also add to local storage
    let tasksFromStorage;

    if (localStorage.getItem("tasks") === null) {
      tasksFromStorage = [];
    } else {
      tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    }

    tasksFromStorage.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
  }

  function deleteTaskFromDOM(id) {
    setTasks(tasks.filter((task) => task.id !== id));

    //delete from local storage also
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    const tasksRemaining = tasksFromStorage.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasksRemaining));
  }

  function clearAllFromDOM() {
    if (confirm("Confirm clear all?")) {
      setTasks([]);

      //clear all from storage
      localStorage.clear("tasks");
    }
  }

  function putInEditMode(task) {
    SetTaskToEdit({ task, inEditMode: true });
  }

  function updateTask(id, editedTask) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...editedTask } : task))
    );

    //update in storage
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

    const updatedTask = tasksFromStorage.map((task) =>
      task.id === id ? { ...task, ...editedTask } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  }

  function checkExistingTask(text) {
    return tasks.some((task) => task.text.toLowerCase() === text);
  }

  // async function getData() {
  //   const response = await fetch("http://localhost:3000/tasks");
  //   const data = await response.json();
  //   setTasks(data.reverse());
  //   setTaskIDs(data.map((data) => data.id));
  // }

  /*async function addTaskToDOM(newTask) {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await response.json();

    setTasks([data, ...tasks]);
    setTaskIDs([data.id, ...taskIDs]);
  }*/

  // async function deleteTaskFromDOM(id) {
  //   await fetch(`http://localhost:3000/tasks/${id}`, {
  //     method: "DELETE",
  //   });

  //   setTasks(tasks.filter((task) => task.id !== id));
  // }

  // async function clearAllFromDOM() {
  //   if (confirm("Confirm clear all")) {
  //     for (const id of taskIDs) {
  //       await fetch(`http://localhost:3000/tasks/${id}`, {
  //         method: "DELETE",
  //       });
  //     }

  //     setTasks([]);
  //   }
  // }

  // async function updateTask(id, editedTask) {
  //   await fetch(`http://localhost:3000/tasks/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(editedTask),
  //   });

  //   setTasks(
  //     tasks.map((task) => (task.id === id ? { ...task, ...editedTask } : task))
  //   );
  // }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTaskFromDOM,
        addTaskToDOM,
        clearAllFromDOM,
        putInEditMode,
        taskToEdit,
        updateTask,
        handleFilterInputValue,
        filteredTasks,
        checkExistingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
