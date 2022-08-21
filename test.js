import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      name: { type: 'string' },
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    if (!request.headers.authorization) {
      throw { code: 401, message: 'Unauthenticated' };
    }
  },
  handler: async (request, reply) => {
    console.log('CALLED THE METHOD...');
    return { hello: 'world' };
  },
});

fastify.setErrorHandler(async (error, request, reply) => {
  console.error(error);
  if (!error.code || error.code > 500) reply.code(error.code ?? 500);
  if (error.code > 400) reply.code(error.code);
  return { error: { message: error.message } };
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
