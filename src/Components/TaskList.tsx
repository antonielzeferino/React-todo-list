// TaskListComponent.tsx
import React from "react";

interface Task {
  text: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskListComponent: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="taskList">
      <table>
        <thead>
          <tr>
            <th>Lista de Tarefas</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListComponent;
