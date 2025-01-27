import type { drizzle } from "drizzle-orm/libsql";
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_FILE_NAME: string;
    }
  }
  namespace App {
    interface Locals {
      db: ReturnType<typeof drizzle>;
    }
  }
}
