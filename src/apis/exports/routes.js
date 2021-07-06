const routes = (handler) => [
  {
    method: "POST",
    path: "/exports/playlists/{playlistId}",
    handler: handler.postExportPlaylistById,
    options: {
      auth: "songsapp_jwt",
    },
  },
];

module.exports = routes;
