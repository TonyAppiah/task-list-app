import { FaXmark, FaRegPenToSquare } from "react-icons/fa6";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { deleteTaskFromDOM, putInEditMode } = useContext(TaskContext);

  return (
    <li className="flex justify-between">
      {task.text}
      <div className="flex gap-x-2">
        <button
          onClick={() => putInEditMode(task)}
          className="transition ease-in-out hover:-translate-y-0.5 hover:scale-150"
        >
          <FaRegPenToSquare size="10px" />
        </button>
        <button
          onClick={() => deleteTaskFromDOM(task.id)}
          className="transition ease-in-out hover:-translate-y-0.5 hover:scale-150"
        >
          <FaXmark color="red" size="12px" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
