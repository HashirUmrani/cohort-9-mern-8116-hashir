import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteNote } from "../services/note.api";

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (event) => {
    event.stopPropagation();
    navigate(`/notes/${note._id}/edit`);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = (event) => {
    event.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = async (event) => {
    event.stopPropagation();
    try {
      setIsDeleting(true);
      await deleteNote({ id: note._id });
      setShowDeleteConfirm(false);

      if (onDelete) {
        onDelete(note._id);
      }
    } catch (error) {
      console.error("Unable to delete note:", error);
      setIsDeleting(false);
    }
  };

  return (
    <article className={`note-card ${isDeleting ? "note-card-deleting" : ""}`}>
      <div className="note-card-content">
        {/* NOTE LABEL */}
        <div className="note-card-top">
          <span className="note-card-label">NOTE</span>
        </div>

        <h3>{note.heading}</h3>

        <div
          className="note-card-preview"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        <div className="note-card-footer">
          <small className="note-date">
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </small>

          <div className="note-card-actions">
            {/* EDIT */}
            <button
              type="button"
              className="note-action-btn edit"
              onClick={handleEdit}
              title="Edit note"
              disabled={isDeleting}
            >
              ✎
            </button>

            <button
              type="button"
              className="note-action-btn delete"
              onClick={handleDeleteClick}
              title="Delete note"
              disabled={isDeleting}
            >
              🗑
            </button>
          </div>
        </div>

        {showDeleteConfirm && (
          <div
            className="delete-confirm"
            onClick={(event) => event.stopPropagation()}
          >
            <strong>Delete this note?</strong>

            <span>This action cannot be undone.</span>

            <div className="delete-confirm-actions">
              <button
                type="button"
                className="delete-cancel-btn"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-btn"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default NoteCard;
