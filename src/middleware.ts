import type { MiddlewareHandler } from "astro";

export const onRequest = (async function (context, next) {
  // intercept data from a request
  // optionally, modify the properties in `locals`
  if (!context.locals.db) {
    context.locals.db = (await import("./db_cache")).db;
    console.log("Database connection established!");
  }
  // return a Response or the result of calling `next()`
  return next();
}) satisfies MiddlewareHandler;
