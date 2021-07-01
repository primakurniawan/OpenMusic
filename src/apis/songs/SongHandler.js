/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNewSong = this.postNewSong.bind(this);
    this.getAllSongs = this.getAllSongs.bind(this);
    this.getSongById = this.getSongById.bind(this);
    this.putSongById = this.putSongById.bind(this);
    this.deleteSongById = this.deleteSongById.bind(this);
  }

  async postNewSong(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title, year, performer, genre, duration,
      } = request.payload;
      const id = await this._service.addNewSong({
        title,
        year,
        performer,
        genre,
        duration,
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId: id,
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di sistem kami',
      });
      response.code(500);
      return response;
    }
  }

  async getAllSongs(request, h) {
    const allSongs = await this._service.getAllSongs();
    const response = h.response({
      status: 'success',
      data: {
        songs: allSongs,
      },
    });
    response.code(200);
    return response;
  }

  async getSongById(request, h) {
    const { id } = request.params;
    try {
      const song = await this._service.getSongById(id);
      const response = h.response({
        status: 'success',
        data: {
          song,
        },
      });
      response.code(200);
      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di sistem kami',
      });
      response.code(500);
      return response;
    }
  }

  async putSongById(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { id } = request.params;
      const {
        title, year, performer, genre, duration,
      } = request.payload;
      await this._service.editSongById(id, {
        title,
        year,
        performer,
        genre,
        duration,
      });
      const response = h.response({
        status: 'success',
        message: 'lagu berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di sistem kami',
      });
      response.code(500);
      return response;
    }
  }

  async deleteSongById(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);
      const response = h.response({
        status: 'success',
        message: 'lagu berhasil dihapus',
      });
      response.code(200);
      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di sistem kami',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = SongHandler;
