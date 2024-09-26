import API from "@/utils/api";
import { Note } from "../pages/private/Notes";
import "@/styles/note.css";
import { toast } from "react-toastify";

export interface NoteItemProps {
  item: Note;
  index: number;
  removeNote: (index: number) => void;
}

function NoteItem(props: NoteItemProps) {
  const { id, name, note, createdAt, updatedAt } = props.item;
  const { index, removeNote } = props;

  const deleteNote = async () => {
    const result = await API.delete("/api/notes/" + id);
    if (result) {
      return removeNote(index);
    }
    toast("Failed to delete note", { type: "error", closeOnClick: true });
  };

  return (
    <div className="note container" key={id}>
      <div className="header">
        <h3>{name}</h3>
        <button onClick={deleteNote}>Delete</button>
      </div>
      <div className="content">{note}</div>
      <span>Created at: {createdAt.toLocaleString()}</span>
      {updatedAt && <span>Updated at: {updatedAt.toLocaleString()}</span>}
    </div>
  );
}

export default NoteItem;
