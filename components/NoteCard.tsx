import { Note } from "@/lib/types";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div
      onClick={() => onEdit(note)}
      className="group cursor-pointer rounded-xl border border-brown-200 bg-white p-4 shadow-sm transition-all hover:border-brown-300 hover:shadow-md active:scale-[0.98]"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="line-clamp-1 font-display text-lg font-semibold text-brown-900">
          {note.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="shrink-0 rounded-lg p-1.5 text-brown-400 opacity-0 transition-all hover:bg-brown-100 hover:text-red-500 group-hover:opacity-100"
          aria-label="Delete note"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-brown-600">
        {note.content}
      </p>
      <p className="text-xs text-brown-400">
        {new Date(note.updatedAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>
  );
}
