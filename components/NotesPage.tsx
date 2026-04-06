"use client";

import { useState, useTransition } from "react";
import { Note } from "@/lib/types";
import {
  getNotes as fetchNotes,
  addNote,
  updateNote,
  deleteNote,
} from "@/app/actions";
import NoteCard from "@/components/NoteCard";
import NoteForm from "@/components/NoteForm";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";

interface NotesPageProps {
  initialNotes: Note[];
}

export default function NotesPage({ initialNotes }: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function refreshNotes(query?: string) {
    startTransition(async () => {
      const data = await fetchNotes(query);
      setNotes(data);
    });
  }

  function handleSearch(query: string) {
    setSearch(query);
    refreshNotes(query || undefined);
  }

  function handleSave(title: string, content: string) {
    startTransition(async () => {
      if (editingNote) {
        await updateNote(editingNote.id, title, content);
      } else {
        await addNote(title, content);
      }
      setShowForm(false);
      setEditingNote(null);
      const data = await fetchNotes(search || undefined);
      setNotes(data);
    });
  }

  function handleEdit(note: Note) {
    setEditingNote(note);
    setShowForm(true);
  }

  function handleDeleteConfirm(id: string) {
    setShowDelete(id);
  }

  function handleDelete() {
    if (!showDelete) return;
    startTransition(async () => {
      await deleteNote(showDelete);
      setShowDelete(null);
      const data = await fetchNotes(search || undefined);
      setNotes(data);
    });
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditingNote(null);
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-brown-200 bg-brown-700 px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl text-white">My Notes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brown-700 shadow-sm transition-all hover:bg-brown-50 active:scale-90"
            aria-label="Add note"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Search */}
      {notes.length > 0 || search ? (
        <div className="px-4 py-3">
          <SearchBar value={search} onChange={handleSearch} />
        </div>
      ) : null}

      {/* Loading indicator */}
      {isPending && (
        <div className="flex justify-center py-2">
          <div className="h-1 w-16 animate-pulse rounded-full bg-brown-300" />
        </div>
      )}

      {/* Notes List */}
      {notes.length > 0 ? (
        <div className="flex-1 px-4 pb-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDeleteConfirm}
              />
            ))}
          </div>
        </div>
      ) : search ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
          <p className="text-sm text-brown-500">
            No notes match &ldquo;{search}&rdquo;
          </p>
        </div>
      ) : (
        <EmptyState onAdd={() => setShowForm(true)} />
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <NoteForm
          note={editingNote}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-brown-900/40 backdrop-blur-sm"
            onClick={() => setShowDelete(null)}
          />
          <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-slide-up">
            <h3 className="mb-2 font-display text-lg font-semibold text-brown-900">
              Delete Note?
            </h3>
            <p className="mb-6 text-sm text-brown-500">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(null)}
                className="flex-1 rounded-lg border border-brown-200 px-4 py-2.5 text-sm font-medium text-brown-700 transition-colors hover:bg-brown-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
