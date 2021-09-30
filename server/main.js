// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

let counter = 0;

// Declare a route
fastify.get("/", async (request, reply) => {
  counter++;
  return { hello: counter };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(4000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
