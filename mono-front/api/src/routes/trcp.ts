import { TRPCError, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

interface GlobalContext {
  user: string;
}

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req } = opts;
  var user;

  try {
    user = req.headers.user;
  } catch (e) {
    user = "";
  }

  return {
    user,
  } as GlobalContext;
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const secureProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next(opts);
});
