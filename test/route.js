export default async function (fastify, options) {
  const genres = fastify.music();

  fastify.get("/api/list", async (request, reply) => {
    // return { hello: "john" };
    // reply.code(200).send("Hello John...");
    return genres;
  });

  fastify.get("/api/:id", async (request, reply) => {
    try {
      const genre = genres.find((music) => music.id === +request.params.id);
      return genre;
    } catch (error) {
      return reply.code(404).send("Not Found: " + error);
    }
  });

  fastify.post("/api", async (request, reply) => {
    const { genre } = request.body;
    try {
      if (!genre) {
        reply.code(500).send("Not Found");
      }
      const listOfGenres = fastify.music(genre);
      return listOfGenres;
    } catch (error) {
      return reply.code(500).send("Not Found: " + error);
    }
  });
}
