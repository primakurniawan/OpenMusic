const Joi = require("joi");

const playlistsPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const playlistSongPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { playlistsPayloadSchema, playlistSongPayloadSchema };
