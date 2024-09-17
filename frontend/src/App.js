import "./App.css";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Logo />
      <main className="flex-grow">
        <TaskPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
