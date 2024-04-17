// SortButtonComponent.tsx
import React from "react";

interface SortButtonProps {
  onClick: () => void;
  sortType: "recent" | "oldest";
}

const SortButtonComponent: React.FC<SortButtonProps> = ({ onClick, sortType }) => {
  return (
    <button onClick={onClick}>
      {sortType === "recent" ? "Organizar pela mais recente" : "Organizar pela mais antiga"}
    </button>
  );
};

export default SortButtonComponent;
