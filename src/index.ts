import fp from "fastify-plugin";
import { Server } from "socket.io";
import { createServer } from "http";

async function fastifySocketIO(fastify, options) {
    if (!fastify.server) {
        throw new Error("Fastify v5 requires an external HTTP server. Use `serverFactory`.");
    }

    // Create and attach Socket.io server
    const io = new Server(fastify.server, options);

    fastify.decorate("io", io);

    fastify.addHook("onClose", async (instance, done) => {
        io.close();
        done();
    });
}

export default fp(fastifySocketIO, {
    fastify: ">=5.0.0",
    name: "fastify-socket.io"
});
