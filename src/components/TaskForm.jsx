import { FaPlus } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import TaskContext from "../context/TaskContext";

const TaskForm = () => {
  const [inputValue, setInputValue] = useState("");

  const { addTaskToDOM, taskToEdit, updateTask, checkExistingTask } =
    useContext(TaskContext);

  useEffect(() => {
    if (taskToEdit.inEditMode) {
      setInputValue(taskToEdit.task.text);
    }
  }, [taskToEdit]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: crypto.randomUUID(),
      text: inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase(),
    };

    if (taskToEdit.inEditMode) {
      if (checkExistingTask(newTask.text.toLowerCase())) {
        alert("Task already exists.");
        return;
      }
      updateTask(taskToEdit.task.id, newTask);
      taskToEdit.inEditMode = false;
    } else if (checkExistingTask(newTask.text.toLowerCase())) {
      alert("Task already exists.");
      return;
    } else {
      addTaskToDOM(newTask);
    }

    setInputValue("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex border-double border-4 border-olive-400 rounded-xl p-2">
        <input
          onChange={handleInputChange}
          type="text"
          name="form-input"
          id="input"
          placeholder="Enter task here"
          className="w-full"
          value={inputValue || ""}
        />
        <button type="submit" className="btn btn-sm btn-circle">
          <FaPlus size="1rem" color="#76885B" />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
