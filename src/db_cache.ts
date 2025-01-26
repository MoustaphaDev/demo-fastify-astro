import { drizzle } from "drizzle-orm/libsql";
export const db = drizzle(import.meta.env.DB_FILE_NAME!);
