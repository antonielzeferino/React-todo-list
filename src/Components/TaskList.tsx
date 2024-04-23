import React from "react";

interface Task {
  text: string;
  data: Date;
  done: boolean;
  id: number
}

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {

  const handleDelete = (index: number) => {
    console.log(index)
    setTasks(prevTasks => prevTasks.filter((task) => task.id !== index));
  };

  const markDone = (index: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === index) {
        return {...task, done: !task.done};
      }
      return task;
    });
    setTasks(updatedTasks);
  };


  return (
    <div className="taskList">
      <table>
        <thead>
          <tr>
            <th>Lista de Tarefas</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={task.done ? "doneTask" : ""}>
              <td>{task.text}
                <div className="taskBtn">
                  <button
                    className={"btn " + (task.done ? "undoneBtn" : "doneBtn")}
                    onClick={() => markDone(task.id)}
                  >
                    {task.done ? "desfazer" : "Feita"}
                  </button>
                  <button
                    className="btn deleteBtn"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
