import { useEffect, useState } from "react";
import FormComponent from "./Components/FormComponent";
import TaskList from "./Components/TaskList";
import NavBtn from "./Components/navBtn";
import SideBar from "./Components/SideBar";

interface Task {
  text: string;
  data: Date;
  done: boolean;
  id:number
}

type SortType = "recent" | "oldest" | "done" | "undone"| "allTasks";

function App() {
  const [orderedTasks, setOrderedTasks] = useState<Task[]>([]);
  const [sortType, setSortType] = useState<SortType>("oldest");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });
  const [activedNav, setActivedNav] = useState<string>("")
  const [animateSidebar, setAnimateSidebar] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    sortBy(sortType);
  }, [tasks, sortType]);

  const handleSubmit = (inputValue: string) => {
    const id = Math.floor(Math.random() * 1000)
    const newTask: Task = { text: inputValue, data: new Date(), done: false ,id: id};
    setTasks([...tasks, newTask]);
  };

  const sortBy = (sortType: SortType) => {
    const sortedTasks = [...tasks];

    switch (sortType) {
      case "recent":
        sortedTasks.sort((a, b) => {
          if (a.data && b.data) {
            return new Date(b.data).getTime() - new Date(a.data).getTime();
          }
          return 0;
        });
        setSortType('recent');
        break;
      case "oldest":
        sortedTasks.sort((a, b) => {
          if (a.data && b.data) {
            return new Date(a.data).getTime() - new Date(b.data).getTime();
          }
          return 0;
        });
        setSortType("oldest");
        break;
      case "done":
        setOrderedTasks(sortedTasks.filter((task) => task.done ))
        setSortType("done");
        return
      case "undone":
        setOrderedTasks(sortedTasks.filter((task) => task.done !== true))
        setSortType("undone");
        return 
      case "allTasks":
        setOrderedTasks(sortedTasks)
        setSortType("allTasks");
        return sortedTasks
      default:
        alert('algum erro ocorreu');
        break;
    }
    setOrderedTasks(sortedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <div id="main-container" className={animateSidebar ? "scrollLock" : ""}>
      <header>
        <NavBtn
          nav={activedNav}
          setNav={setActivedNav}
          AnimateSidebar={setAnimateSidebar}
          setConfig={"invisible"}
        />
        <h1>My todo list!</h1>
      </header>
      <div className="mobileSidebar">
        <SideBar
          classes={`sidebar ${animateSidebar ? 'show' : 'sidebarHide'}`}
          AnimateSidebar={setAnimateSidebar}
          setNav={setActivedNav}
          clearAllTasks={clearAllTasks}
          setSortType={sortBy}
        />
      </div>
      <main onClick={() => {
        setActivedNav("visible");
        setAnimateSidebar(false);
      }}>
        <SideBar
          classes="desktopSidebar "
          clearAllTasks={clearAllTasks}
          setSortType={sortBy}
        />
        <div className="container">
          <FormComponent onSubmit={handleSubmit} />
          {tasks.length > 0 ?
            <TaskList tasks={orderedTasks} setTasks={setTasks} />
            : (
              <div>
                <p>Nenhuma tarefa ainda &#128532;<br /> adicione tarefas e organize sua vida</p>
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
}

export default App;
