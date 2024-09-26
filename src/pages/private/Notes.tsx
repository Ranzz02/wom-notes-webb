import NoteItem from "@/components/NoteItem";
import { useLoaderData } from "react-router-dom";
import API from "@/utils/api";
import "@/styles/notes.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export type Note = {
  id: string;
  name: string;
  note: string;
  createdAt: Date;
  updatedAt?: Date;
};

export default function NotesPage() {
  const loaderData = useLoaderData();
  const [notes, setNotes] = useState<Note[]>(
    Array.isArray(loaderData) ? loaderData : []
  );

  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [input, setInput] = useState<Partial<Note>>({});

  if (!Array.isArray(notes)) {
    return <div>Error: Notes data is not an array...</div>;
  }

  const toggleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleSubmitEvent = (e: FormEvent) => {
    e.preventDefault();
    if (input.name !== "" && input.note !== "") {
      return API.post("/api/notes", { ...input })
        .then((response) => {
          toast("New note created!", {
            type: "success",
            closeOnClick: true,
            onClick: () => {
              console.log(response.data.note);
            },
          });
          setInput({ name: "", note: "" });
          setNotes((prevNotes) => [...prevNotes, response.data.note]);
        })
        .finally();
    }
    toast("You need to fill all input field!", {
      type: "error",
      closeOnClick: true,
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeNote = (index: number) => {
    const updatedNotes = [...notes];
    const deletedNote = notes[index];
    updatedNotes.splice(index, 1); // Remove the note at the given index
    setNotes(updatedNotes);
    toast("Removed note: " + deletedNote.name, {
      type: "success",
      closeOnClick: true,
    });
  };

  return (
    <>
      <div className="notes toolbar">
        <button onClick={toggleShowCreate}>New Note</button>
      </div>
      {showCreate && (
        <form onSubmit={handleSubmitEvent} className="notes create-container">
          <div>
            <label>Title:</label>
            <input
              type="text"
              id="note-name"
              name="name"
              value={input.name}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Note:</label>
            <input
              type="text"
              id="note-note"
              name="note"
              value={input.note}
              onChange={handleInput}
            />
          </div>
          <button>Create</button>
        </form>
      )}
      <div className="notes container">
        {notes.length > 0 ? (
          notes.map((note, index) => {
            return (
              <NoteItem
                key={note.id}
                index={index}
                removeNote={removeNote}
                item={note}
              />
            );
          })
        ) : (
          <div>No notes create one!</div>
        )}
      </div>
    </>
  );
}

export const LoadData = async () => {
  const result = await API.get("/api/notes");
  return result.data.notes ? result.data.notes : [];
};
