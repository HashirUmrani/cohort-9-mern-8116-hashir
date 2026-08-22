import "../dashboard.scss";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NotesGrid from "../components/NotesGrid";
import CreateNote from "../components/CreateNote";
import { getNotes } from "../services/note.api";
import { useAuth } from "../../auth/hooks/useAuth";

export const NotePage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getNotes();
        setNotes(data.notes);
      } catch (err) {
        console.error("unable to fetch notes", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteDelete = (deletedNoteId) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note._id !== deletedNoteId),
    );
  };

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return true;
    }
    return (
      note.heading.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  const getGreetings = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }
    if (hour < 18) {
      return "Good Afternoon";
    }
    return "Good evening";
  };

  const displayName = user?.username || "there";
  return (
    <div className="notes-page">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="dashboard">
        <section className="dashboard-content">
          {/* Welcome */}
          <div className="dashboard-welcome">
            <div>
              <span className="dashboard-eyebrow">Note Library</span>

              <h1>
                {getGreetings()}, {displayName}
              </h1>

              <p>Capture your thoughts and keep your ideas organized.</p>
            </div>
          </div>

          {/* Notes Header */}
          <div className="notes-heading">
            <div>
              <h2>My Notes</h2>

              <p>
                {filteredNotes.length === 0
                  ? "No notes yet"
                  : `${filteredNotes.length} ${
                      filteredNotes.length === 1 ? "note" : "notes"
                    } in your workspace`}
              </p>
            </div>

            <CreateNote />
          </div>

          {/* Notes */}
          <div className="notes-content">
            {loading && <p>Loading notes...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
              <NotesGrid notes={filteredNotes} onDelete={handleNoteDelete} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotePage;
