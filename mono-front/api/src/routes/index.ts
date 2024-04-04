import { router } from "./trcp";
import { apiRouter as todos } from "./todos";

export const appRouter = router({ todos });

export type AppRouter = typeof appRouter;
