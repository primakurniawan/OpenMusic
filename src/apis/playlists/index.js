const PlaylistHandler = require("./PlaylistsHandler");
const routes = require("./routes");

module.exports = {
  name: "playlists",
  version: "1.0.0",
  register: (server, { playlistsService, songsService, validator }) => {
    const playlistsHandler = new PlaylistHandler(
      playlistsService,
      songsService,
      validator
    );
    server.route(routes(playlistsHandler));
  },
};
