// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const {
  createCounterSet,
  createCounter,
  getCounterSet,
} = require("./services");

fastify.register(require("fastify-cors"), {
  origin: "*",
});

// Declare a route
fastify.post("/counter-set", async (request, reply) => {
  return createCounterSet();
});

fastify.post("/counter", async (request, reply) => {
  const { counterSetId, counterId } = request.body;
  createCounter({ counterSetId, counterId });
  return null;
});

fastify.get("/counter-set", async (request, reply) => {
  return getCounterSet(request.query.id) || null;
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
