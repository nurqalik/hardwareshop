import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { productRouter } from "./routers/product";
import { studentRoter } from "./routers/student";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  product: productRouter,
  student: studentRoter
});

// export type definition of API
export type AppRouter = typeof appRouter;
