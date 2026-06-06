import { useState } from "react";

export function Test() {
  return (
    <div className="overlay">
      Hello
    </div>
  );
}

export function OkPopup({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}


export function TextPopup({ isOpen, onSubmit, onClose }) {
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="popup2">
        <h3>Enter text</h3>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={() => {
            onSubmit(text);
            setText("");
            onClose();
          }}
        >
          Submit
        </button>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export function OptionPopup({ isOpen, options, onSubmit, onClose }) {
  const [selected, setSelected] = useState(options[0] || "");

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="popup3">
        <h3>Choose an option</h3>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            onSubmit(selected);
            onClose();
          }}
        >
          Confirm
        </button>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}