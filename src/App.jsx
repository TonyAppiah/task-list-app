import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import ClearAllButton from "./components/ClearAllButton";
import { useContext } from "react";
import TaskContext from "./context/TaskContext";

function App() {
  const { tasks } = useContext(TaskContext);

  return (
    <main className="max-w-xl mx-auto px-5">
      <Header />
      <TaskForm />
      {tasks.length > 0 && (
        <>
          <Filter />
          <TaskList />
          <ClearAllButton />
        </>
      )}
    </main>
  );
}
export default App;
