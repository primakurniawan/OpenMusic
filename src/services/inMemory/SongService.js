/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongService {
  constructor() {
    this._songs = [];
  }

  addNewSong({
    title, year, performer, genre, duration,
  }) {
    const id = nanoid();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newSong = {
      id,
      title,
      year: parseInt(year, 10),
      performer,
      genre,
      duration: parseInt(duration, 10),
      insertedAt,
      updatedAt,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.some((song) => song.id === id);

    if (!isSuccess) {
      throw new NotFoundError('Gagal menambahkan musik');
    }

    return id;
  }

  getAllSongs() {
    return this._songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));
  }

  getSongById(id) {
    const song = this._songs.filter((e) => e.id === id)[0];

    if (!song) {
      throw new NotFoundError('Musik tidak ditemukan. Id tidak ada.');
    }
    return song;
  }

  editSongById(id, {
    title, year, performer, genre, duration,
  }) {
    const index = this._songs.findIndex((song) => song.id === id);

    const updatedAt = new Date().toISOString();
    this._songs[index] = {
      ...this._songs[index],
      title,
      year: parseInt(year, 10),
      performer,
      genre,
      duration: parseInt(duration, 10),
      updatedAt,
    };

    if (index === -1) {
      throw new NotFoundError('Gagal mengedit musik. Id tidak ditemukan');
    }
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);
    this._songs.splice(index, 1);
    if (index === -1) {
      throw new NotFoundError('Gagal menghapus musik. Id tidak ditemukan');
    }
  }
}

module.exports = SongService;
