import { FormEvent, useEffect, useState } from "react";

interface Task {
  text: string;
  data?: Date;
}

type sortType = "recent" | "oldest"

function App() {
  const [orderedTasks, setOrderedTasks] = useState<Task[]>([]);
  const [sortType, setSortType] = useState<sortType>("oldest");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      return JSON.parse(savedTasks)
    }
    return []
  });
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    sortBy(sortType, tasks)
  }, [tasks]);

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (inputValue) {
      const newTask: Task = { text: inputValue, data: new Date() };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const sortBy = (sortType: sortType, tasks: Task[]) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.data && b.data) {
        if (sortType === "recent") {
          setSortType('recent')
          return new Date(b.data).getTime() - new Date(a.data).getTime();
        }
        if (sortType === "oldest") {
          setSortType("oldest")
          return new Date(a.data).getTime() - new Date(b.data).getTime();
        }
      }
      return 0;
    });
    setOrderedTasks(sortedTasks);
  };

  return (
    <div>
      <header>
        <h1>My todo list!</h1>
      </header>
      <main>
        <form onSubmit={(ev) => { handleSubmit(ev) }}>
          <label htmlFor="taskContent">tarefa: </label>
          <input type="text" id="taskContent" value={inputValue} onChange={(el) => handleChange(el.target.value)} /><br />
          <button type="submit">salvar</button>
        </form>
        <div className="taskList">
          <table>
            <thead>
              <tr>
                <th>Lista de tarefas</th>
              </tr>
            </thead>
            <tbody>
              {orderedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => sortBy("recent", tasks)}>organizar pela mais recente</button>
        <button onClick={() => sortBy("oldest", tasks)}>organizar pela mais antiga</button>
      </main>
    </div>
  )
}

export default App;
