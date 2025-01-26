import type { drizzle } from "drizzle-orm/libsql";
declare global {
  namespace App {
    interface Locals {
      db: ReturnType<typeof drizzle>;
    }
  }
}
