const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");

class PlaylistsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addPlaylist({ name }, owner) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO playlists VALUES($1, $2, $3) RETURNING id",
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Playlist gagal ditambahakan");
    }

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: "SELECT playlists.id, playlists.name, users.username FROM playlists LEFT JOIN users ON users.id = playlists.owner WHERE playlists.owner=$1",
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylistById(id) {
    const query = {
      text: "DELETE FROM playlists WHERE id=$1 RETURNING id",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw NotFoundError("Song gagal dihapus. Id tidak ditemukan");
    }

    await this._cacheService.delete(`playlistsong:${id}`);
  }

  async getPlaylistById(id) {
    const query = {
      text: "SELECT * FROM playlists WHERE id=$1",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw NotFoundError("Song gagal dihapus. Id tidak ditemukan");
    }
    return result.rows[0];
  }

  async addSongToPlaylist({ playlistId, songId }) {
    const playlistSongId = nanoid(16);
    const query = {
      text: "INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id",
      values: [playlistSongId, playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError("Gagal menambahkan lagu ke playlist");
    }

    await this._cacheService.delete(`playlistsong:${playlistId}`);
  }

  async getSongsFromPlaylistById(id) {
    try {
      const result = await this._cacheService.get(`playlistsong:${id}`);
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: "SELECT songs.id, songs.title, songs.performer FROM playlistsongs LEFT JOIN songs ON songs.id = playlistsongs.song_id LEFT JOIN playlists ON playlists.id = playlistsongs.playlist_id WHERE playlistsongs.playlist_id=$1",
        values: [id],
      };
      const result = await this._pool.query(query);

      await this._cacheService.set(
        `playlistsong:${id}`,
        JSON.stringify(result.rows)
      );

      return result.rows;
    }
  }

  async deleteSongFromPlaylist({ songId }, id) {
    const query = {
      text: "DELETE FROM playlistsongs WHERE song_id=$1 AND playlist_id = $2 RETURNING id",
      values: [songId, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Song gagal dihapus. Id tidak ditemukan");
    }

    await this._cacheService.delete(`playlistsong:${id}`);
  }

  async verifyPlaylistOwner(playlistId, userId) {
    const query = {
      text: "SELECT * FROM playlists WHERE id=$1",
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw NotFoundError("Playlist tidak ditemukan");
    }
    const playlist = result.rows[0];
    if (playlist.owner !== userId) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }
}

module.exports = PlaylistsService;
