import React from "react";
import "../styles/Sidebar.Module.css";

const Sidebar = ({
  setNoteBtnClick,
  noteGroups,
  setSelectedNote,
  selectedNote,
  isMobile,
  display,
  setDisplay,
}) => {
  const handleSelect = (note) => {
    if (isMobile) {
      setDisplay(true);
    }
    setSelectedNote(note);
  };

  return (
    <div
      className={`sidebar ${isMobile ? "mob-sidebar" : ""}`}
      style={{ display: isMobile && display ? "none" : "" }}
    >
      <div className="sidebar-heading">
        <p className="sidebar-title">Pocket Notes</p>
      </div>
      <div className="sidebar-notes-list flex justify-start">
        {noteGroups &&
          noteGroups.map((note, index) => {
            const notes = note.name.split(" ");
            const firstLetters = notes.map((word) => word.charAt(0));
            const initials = firstLetters.join('').toUpperCase().substring(0, 2); 

            return (
              <div
                className={`sidebar-note-element flex flex-row justify-start ${
                  note.id === selectedNote.id ? "note-selected" : ""
                }`}
                key={index}
                onClick={() => handleSelect(note)}
              >
                <div
                  className="circle note-list-icon flex"
                  style={{ marginRight: "0.5rem", backgroundColor: note.color }}
                >
                  {initials}
                </div>
                <p className="sidebar-note-title">{note.name}</p>
              </div>
            );
          })}
      </div>
      <button
        className="create-notes-fab" // Reusing the class name
        onClick={() => setNoteBtnClick(true)}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4V20M4 12H20"
            stroke="white"
            strokeWidth="3"
            
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;