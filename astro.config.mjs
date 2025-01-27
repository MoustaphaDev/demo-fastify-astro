// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  integrations: [setupDbIntegration()],
});

const db = drizzle(process.env.DB_FILE_NAME);
console.log("Database connection established!");
/**
 * @returns {import('astro').AstroIntegration}
 */
function setupDbIntegration() {
  /**
   * @type {string}
   */
  let command;

  return {
    name: "dev-db-setup",
    hooks: {
      "astro:config:setup": ({ command: _command }) => {
        command = _command;
      },
      "astro:server:setup": async ({ server }) => {
        server.middlewares.use(async (req, _, next) => {
          if (command != "dev") return next();

          const localsSymbol = Symbol.for("astro.locals");
          let locals = Reflect.get(req, localsSymbol);

          if (!locals) {
            locals = {};
          }
          if (locals?.db) {
            return next();
          }

          locals.db = db;
          Reflect.set(req, localsSymbol, locals);

          next();
        });
      },
    },
  };
}
