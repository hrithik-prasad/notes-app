import { getNotes } from "@/app/actions";
import NotesPage from "@/components/NotesPage";

export default async function Home() {
  const notes = await getNotes();

  return <NotesPage initialNotes={notes} />;
}
