import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import axios from "axios";
import { Textarea } from "./components/ui/textarea"
import { Input } from "@/components/ui/Input"

function App() {
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    console.log("fetching notes...");
    try {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      setNotes(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (newTitle, newContent) => {
    try {
      const response = await axios.post("http://localhost:3000/notes", {
        title: newTitle,
        content: newContent,
      });
      const result = response.data;
      if (result.ok) {
        setNotes([...notes, result.data]);
      }
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (id, updateTitle, updateContent) => {
    try {
      const response = async () => {
        const response = await fetch(`http://localhost:3000/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updateTitle,
            content: updateContent,
          }),
        });
        return response;
      };

      const result = await response().then((res) => res.json());

      setNotes((prevNotes) => {
        return prevNotes.map((note) => (note.id === id ? result.data : note));
      });
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotes(notes.filter((note) => note.id !== id));
        alert("Note deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNoteById = (id) => {
    console.log(id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center bg-gray-100 pt-40 p-10">
        <NoteForm onAddNote={addNote} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={updateNote}
          onGetById={getNoteById}
        />
      </main>
    </>
  );
}

export default App;

// ================== Komponen ==================

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <section className="container max-w-xl px-5 mb-8 border-1 rounded-lg p-6 bg-white border-gray-200">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Title"
          className="rounded-sm outline outline-gray-400 p-3"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          className="resize-y min-h-14 rounded-sm outline outline-gray-400 p-3"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold rounded-lg py-3 hover:bg-blue-600 transition-colors active:bg-blue-700"
        >
          Add note
        </button>
      </form>
    </section>
  );
};

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  return (
    <div className="rounded-lg bg-white w-[300px] p-5 border border-gray-200">
      {/* edit mode */}
      {isEditing ? (
        <>
          <Input
            type="text"
            className="w-full rounded-sm outline outline-gray-400 p-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <Textarea
            type="text"
            className="w-full rounded-sm outline outline-gray-400 p-2 mt-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="mt-4 flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:bg-red-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 active:bg-green-700"
              onClick={() =>
                onUpdate(note.id, editedTitle, editedContent)
                  .then(() => setIsEditing(false))
                  .catch((err) => console.error(err))
              }
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          {/*View mode*/}
          <p className="font-medium text-xl">{note.title}</p>
          <p className="text-sm text-gray-500">
            {showFormattedDate(note.created_at)}
          </p>
          <p className="mt-2">{note.content}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 active:bg-yellow-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:bg-red-700"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const NoteList = ({ notes, onUpdate, onDelete }) => {
  return (
    <section className="container py-8 mt-42">
      <h2 className="inline-flex items-center gap-2 text-2xl font-medium mb-6">
        <img
          src="/note.svg"
          alt="note icon"
          className="w-8 h-8"
          draggable="false"
        />
        Saved Notes
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        ) : (
          <h1>There is no data, you can make new one!</h1>
        )}
      </div>
    </section>
  );
};

// helper
const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
