import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { drizzle } from "drizzle-orm/libsql";
import "dotenv/config";

const app = Fastify({ logger: true });
const db = drizzle(process.env.DB_FILE_NAME!);

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL("./dist/client", import.meta.url)),
  })
  .register(fastifyMiddie);
app.use((req, res, next) => ssrHandler(req, res, next, { db }));

app.listen({ port: 8081 });
