interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="mb-6 text-6xl opacity-30">📝</div>
      <h2 className="mb-2 font-display text-xl font-semibold text-brown-900">
        No notes yet
      </h2>
      <p className="mb-6 text-center text-sm text-brown-500">
        Tap the button below to create your first note
      </p>
      <button
        onClick={onAdd}
        className="rounded-lg bg-brown-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brown-900 active:scale-95"
      >
        + Create Note
      </button>
    </div>
  );
}
