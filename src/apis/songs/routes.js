const routes = (handler) => [
  {
    method: "POST",
    path: "/songs",
    handler: handler.postNewSong,
  },
  {
    method: "GET",
    path: "/songs",
    handler: handler.getAllSongs,
  },
  {
    method: "GET",
    path: "/songs/{id}",
    handler: handler.getSongById,
  },
  {
    method: "PUT",
    path: "/songs/{id}",
    handler: handler.putSongById,
  },
  {
    method: "DELETE",
    path: "/songs/{id}",
    handler: handler.deleteSongById,
  },
];

module.exports = routes;
