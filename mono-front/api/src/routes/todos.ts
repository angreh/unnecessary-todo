import { z } from "zod";

import { router, publicProcedure } from "./trcp";
import { getAll, insert } from "model/todos";

export const apiRouter = router({
  getAll: publicProcedure.query(async () => await getAll()),
  insert: publicProcedure
    .input(
      z.object({
        title: z.string(),
        type: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input }) => await insert(input)),
});
