import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const CreateNote = () => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/notes/create");
  };

  return (
    <button
      type="button"
      className="create-note-btn"
      onClick={handleCreateNote}
      aria-label="Create a new note"
    >
      <Plus size={20} />
      <span>Create Note</span>
    </button>
  );
};

export default CreateNote;
