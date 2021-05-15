import Fastify from "fastify";
import path from "path";
import autoLoad from "fastify-autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

// fastify.register(import("./plugins/index.js"));

fastify.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

fastify.register(import("./test/route.js"));

fastify.get("/", async function (request, reply) {
  return "hello world";
});

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
