import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const ClearAllButton = () => {
  const { clearAllFromDOM } = useContext(TaskContext);
  return (
    <button
      onClick={clearAllFromDOM}
      className="btn btn-block btn-outline text-lg"
    >
      Clear All Tasks
    </button>
  );
};

export default ClearAllButton;
