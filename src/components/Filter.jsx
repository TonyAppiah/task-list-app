import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const Filter = () => {
  const { handleFilterInputValue } = useContext(TaskContext);

  const handleFilterInput = (e) => {
    handleFilterInputValue(e.target.value);
  };

  return (
    <div className="my-7 p-2">
      <input
        onChange={handleFilterInput}
        type="text"
        name="filter-input"
        id="filter"
        placeholder="Filter tasks"
        className="p-1 w-full"
      />
    </div>
  );
};

export default Filter;
