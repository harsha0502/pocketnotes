import React from "react";
import "../styles/Input.Module.css";

const Input = ({ id, handleNewNote, color }) => {
  const [note, setNote] = React.useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  const handleSendClick = () => {
    if (!note.trim()) return; // Don't send empty notes

    const dateObj = new Date();

    // 1. Format Date: "9 Mar 2023"
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // 2. Format Time: "10:10 AM"
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const newNote = {
      date: formattedDate,
      time: formattedTime,
      content: note,
      id: Math.floor(Math.random() * 1000),
    };

    handleNewNote(newNote);

    const notesGroup = JSON.parse(localStorage.getItem("noteGroups")) || [];
    const groupIndex = notesGroup.findIndex((group) => group.id === id);
    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);
      return;
    }

    const group = notesGroup[groupIndex];
    group.notes.push(newNote);
    localStorage.setItem("noteGroups", JSON.stringify(notesGroup));
    setNote("");
  };

  return (
    // FIX: Removed the inline style background color here 
    // to prevent the "double layer" issue. 
    // The parent (NoteView) handles the dark background.
    <div className="input-container">
      <div className="input-div flex flex-row">
        <textarea
          name="note"
          id=""
          cols="30"
          rows="6"
          className="note-input"
          placeholder="Enter your text here..........."
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent new line on Enter
              handleSendClick();
            }
          }}
          value={note}
        ></textarea>
        
        <svg
          className={`send-btn ${!note ? "disabled" : ""}`}
          width="25"
          height="29"
          viewBox="0 0 35 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSendClick}
          style={{ cursor: note ? "pointer" : "default" }}
        >
          <path
            d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
            // Change color if active (blue) or disabled (gray)
            fill={note ? "#001F8B" : "#ABABAB"} 
          />
        </svg>
      </div>
    </div>
  );
};

export default Input;