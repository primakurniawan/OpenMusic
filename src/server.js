/* eslint-disable no-console */
const Hapi = require("@hapi/hapi");
const { Pool } = require("pg");
const song = require("./apis/song");
const SongService = require("./services/postgres/SongService");
const SongValidator = require("./validator/song");

require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // eslint-disable-next-line no-unused-vars
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  const songService = new SongService();

  await server.register({
    plugin: song,
    options: { service: songService, validator: SongValidator },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
