"use server";

import { db } from "@/lib/db";
import { notes } from "@/lib/schema";
import { eq, like, or, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getNotes(query?: string) {
  if (query) {
    const pattern = `%${query}%`;
    return db
      .select()
      .from(notes)
      .where(or(like(notes.title, pattern), like(notes.content, pattern)))
      .orderBy(desc(notes.updatedAt));
  }

  return db.select().from(notes).orderBy(desc(notes.updatedAt));
}

export async function addNote(title: string, content: string) {
  await db.insert(notes).values({
    title: title.trim(),
    content: content.trim(),
  });
  revalidatePath("/");
}

export async function updateNote(id: string, title: string, content: string) {
  await db
    .update(notes)
    .set({ title: title.trim(), content: content.trim() })
    .where(eq(notes.id, id));
  revalidatePath("/");
}

export async function deleteNote(id: string) {
  await db.delete(notes).where(eq(notes.id, id));
  revalidatePath("/");
}
