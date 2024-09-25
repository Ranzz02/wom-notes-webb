import NoteItem from "@/components/NoteItem";
import { useLoaderData } from "react-router-dom";
import API from "@/utils/api";
import "@/styles/notes.css";
import { ChangeEvent, FormEvent, useState } from "react";

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
          console.log(response);
          setNotes((prevNotes) => [...prevNotes, response.data.note]);
        })
        .finally();
    }
    alert("Please provide a valid input");
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
    updatedNotes.splice(index, 1); // Remove the note at the given index
    setNotes(updatedNotes);
  };

  return (
    <>
      <div className="notes toolbar">
        <button onClick={toggleShowCreate}>New Note</button>
      </div>
      {showCreate ? (
        <div>
          <form onSubmit={handleSubmitEvent}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                id="note-name"
                name="name"
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Note:</label>
              <input
                type="text"
                id="note-note"
                name="note"
                onChange={handleInput}
              />
            </div>
            <button>Create</button>
          </form>
        </div>
      ) : null}
      <div className="notes container">
        {notes.map((note, index) => {
          return (
            <NoteItem
              key={note.id}
              index={index}
              removeNote={removeNote}
              item={note}
            />
          );
        })}
      </div>
    </>
  );
}

export const LoadData = async () => {
  const result = await API.get("/api/notes");
  return result.data.notes ? result.data.notes : [];
};
