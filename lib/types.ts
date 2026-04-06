import type { InferSelectModel } from "drizzle-orm";
import type { notes } from "./schema";

export type Note = InferSelectModel<typeof notes>;
