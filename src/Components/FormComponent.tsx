// InputTaskComponent.tsx
import React, { useState } from "react";

interface InputTaskProps {
  onSubmit: (value: string) => void;
}

const InputTaskComponent: React.FC<InputTaskProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (inputValue) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskContent">Tarefa: </label>
      <input
        type="text"
        id="taskContent"
        value={inputValue}
        onChange={(el) => handleChange(el.target.value)}
      /><br />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default InputTaskComponent;
