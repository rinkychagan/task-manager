import "./App.css";
import Tab from "./components/Tab";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <div className="App">
      <h1 className="font-dohyeon text-4xl text-white mt-4 ml-20 text-left">
        donezo.
      </h1>
      <TaskPage />
    </div>
  );
}

export default App;
