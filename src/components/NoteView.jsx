import React from "react";
import "../styles/NoteView.Module.css";

import NoteHeader from "./NoteHeader";
import Input from "./Input";

const NoteView = ({ name, color, id, isMobile, display, setDisplay }) => {
  const [notes, setNotes] = React.useState([]);
  const [groupId, setGroupId] = React.useState("");
  const [newNote, setNewNote] = React.useState({});

  // 1. Create a reference for the bottom of the list
  const notesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    // 2. Function to scroll smoothly to that reference
    notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 3. Run this effect whenever the 'notes' list updates
  React.useEffect(() => {
    scrollToBottom();
  }, [notes]);

  React.useEffect(() => {
    const noteGroups = JSON.parse(localStorage.getItem("noteGroups")) || [];
    const groupIndex = noteGroups.findIndex((group) => group.id === id);
    if (groupIndex === -1) return;
    
    const group = noteGroups[groupIndex];
    setGroupId(group.id);
    setNotes(group.notes || []);
  }, [id, newNote]);

  const handleNewNote = (value) => {
    setNewNote(value);
  };

  return (
    <div
      className="note-view-container"
      style={{ display: isMobile && !display ? "none" : "" }}
    >
      <div 
        className="note-header-container" 
        style={{ 
          backgroundColor: color, 
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.2)"
        }}
      >
        <NoteHeader
          name={name}
          color={color}
          isMobile={isMobile}
          display={display}
          setDisplay={setDisplay}
        />
      </div>

      <div className="notes-list-scroll">
        {groupId === id &&
          notes &&
          notes.map((note, index) => {
            return (
              <div className="note-card-wrapper" key={index}>
                <div className="note-card">
                  <p className="note-text">{note.content}</p>
                  <div className="note-meta-data">
                    <span className="note-date-time">{note.date}</span>
                    <span className="separator-dot"> • </span>
                    <span className="note-date-time">{note.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        
        {/* 4. The invisible div that acts as the scroll anchor */}
        <div ref={notesEndRef} />
      </div>

      <div 
        className="input-area-container" 
        style={{ 
          backgroundColor: color, 
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.2)" 
        }}
      >
        <Input id={id} handleNewNote={handleNewNote} color={color} />
      </div>
    </div>
  );
};

export default NoteView;