"use client";

import { useState, useEffect } from "react";
import { Note } from "@/lib/types";

interface NoteFormProps {
  note: Note | null;
  onSave: (title: string, content: string) => void;
  onClose: () => void;
}

export default function NoteForm({ note, onSave, onClose }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: false, content: false });

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  function handleSave() {
    const newErrors = {
      title: title.trim() === "",
      content: content.trim() === "",
    };
    setErrors(newErrors);

    if (newErrors.title || newErrors.content) return;
    onSave(title, content);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brown-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex w-full max-h-[90vh] flex-col rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brown-100 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-brown-900">
            {note ? "Edit Note" : "New Note"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-brown-400 transition-colors hover:bg-brown-100 hover:text-brown-700"
            aria-label="Close"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-brown-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: false }));
              }}
              placeholder="Enter note title"
              className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-brown-900 placeholder-brown-400 outline-none transition-colors focus:ring-1 ${
                errors.title
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                  : "border-brown-200 focus:border-brown-500 focus:ring-brown-500"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">Title is required</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-brown-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setErrors((prev) => ({ ...prev, content: false }));
              }}
              placeholder="Write your note here..."
              rows={6}
              className={`w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm leading-relaxed text-brown-900 placeholder-brown-400 outline-none transition-colors focus:ring-1 ${
                errors.content
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                  : "border-brown-200 focus:border-brown-500 focus:ring-brown-500"
              }`}
            />
            {errors.content && (
              <p className="mt-1 text-xs text-red-500">Content is required</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-brown-100 px-5 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-brown-200 px-4 py-2.5 text-sm font-medium text-brown-700 transition-colors hover:bg-brown-50 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-brown-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brown-900 active:scale-95"
          >
            {note ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
