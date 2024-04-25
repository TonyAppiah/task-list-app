import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const TaskList = () => {
  const { filteredTasks } = useContext(TaskContext);

  return (
    <div className="task-list mb-5">
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TaskItem key={task.id} task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
