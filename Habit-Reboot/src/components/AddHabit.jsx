import { useState } from "react";

export default function AddHabit({ onAdd }) {
  const [name, setName] = useState("");

  return (
    <div className="contain">
      <input
        className="Add"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New habit"
      />
      <button
        onClick={() => {
          if (!name) return;
          onAdd(name);
          setName("");
        }}
        className="add-bt"
      >
        Add
      </button>
    </div>
  );
}
