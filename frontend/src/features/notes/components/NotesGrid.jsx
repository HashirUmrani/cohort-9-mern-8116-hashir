import NoteCard from "./NoteCard";

const NotesGrid = ({ notes, onDelete }) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NotesGrid;
