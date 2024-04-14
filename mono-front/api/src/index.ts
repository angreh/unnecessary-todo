import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import cors from "@fastify/cors";
import { Server, IncomingMessage, ServerResponse } from "http";

import { appRouter } from "./routes/index";
import { globalContext } from "./global-context";
import { DB } from "./data/database";

const server: FastifyInstance = Fastify({
  logger: false,
});

server.register(cors, {
  origin: "*",
});

globalContext.DB = DB;

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
  },
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async (_request, _reply) => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    await server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
      if (err) throw err;

      console.log(`server listening on ${address}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
