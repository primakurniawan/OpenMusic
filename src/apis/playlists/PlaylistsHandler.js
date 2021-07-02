const ClientError = require("../../exceptions/ClientError");

class PlaylistHandler {
  constructor(playlistsService, songsSercice, validator) {
    this._playlistsService = playlistsService;
    this._songsSercice = songsSercice;
    this._validator = validator;

    this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistsByIdHandler =
      this.deletePlaylistsByIdHandler.bind(this);
    this.postSongToPlaylistsByIdHandler =
      this.postSongToPlaylistsByIdHandler.bind(this);
    this.getSongFromPlaylistsByIdHandler =
      this.getSongFromPlaylistsByIdHandler.bind(this);
    this.deleteSongFromPlaylistsByIdHandler =
      this.deleteSongFromPlaylistsByIdHandler.bind(this);
  }

  async postPlaylistsHandler(request, h) {
    try {
      this._validator.validatePlaylistsPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { name } = request.payload;
      const playlistId = await this._playlistsService.addPlaylist(
        { name },
        credentialId
      );
      const response = h.response({
        status: "success",
        message: "Playlist berhasil ditambahkan",
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Maaf terjadi kegagaln pada server kami",
      });
      response.code(500);
      return response;
    }
  }

  async getPlaylistsHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const playlists = await this._playlistsService.getPlaylists(credentialId);
      return {
        status: "success",
        data: {
          playlists,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Maaf terjadi kegagaln pada server kami",
      });
      response.code(500);
      return response;
    }
  }

  async deletePlaylistsByIdHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId
      );
      await this._playlistsService.deletePlaylistById(playlistId);
      return {
        status: "success",
        message: "Playlist berhasil dihapus",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Maaf terjadi kegagaln pada server kami",
      });
      response.code(500);
      return response;
    }
  }

  async postSongToPlaylistsByIdHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId
      );
      await this._songsSercice.getSongById(songId);
      await this._playlistsService.addSongToPlaylist({
        playlistId,
        songId,
      });
      const response = h.response({
        status: "success",
        message: "Lagu berhasil ditambahkan ke playlist",
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Maaf terjadi kegagaln pada server kami",
      });
      response.code(500);
      return response;
    }
  }

  async getSongFromPlaylistsByIdHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._playlistsService.getPlaylistById(playlistId);

      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId
      );

      const songs = await this._playlistsService.getSongsFromPlaylistById(
        playlistId,
        credentialId
      );

      return {
        status: "success",
        data: {
          songs,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Maaf terjadi kegagaln pada server kami",
      });
      response.code(500);
      return response;
    }
  }

  async deleteSongFromPlaylistsByIdHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      const { songId } = request.payload;
      await this._songsSercice.verifySongById(songId);
      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId
      );
      await this._playlistsService.deleteSongFromPlaylist(
        { songId },
        playlistId
      );
      return {
        status: "success",
        message: "Lagu berhasil dihapus dari playlist",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: "error",
        message: "Maaf terjadi kegagaln pada server kami",
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = PlaylistHandler;
