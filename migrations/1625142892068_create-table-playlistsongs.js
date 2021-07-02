/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("playlistsongs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    playlist_id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    song_id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("playlistsongs");
};
