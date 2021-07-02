const InvariantError = require("../../exceptions/InvariantError");
const {
  playlistsPayloadSchema,
  playlistSongPayloadSchema,
} = require("./schema");

const PlaylistValidator = {
  validatePlaylistsPayload: (payload) => {
    const validationResult = playlistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePlaylistSongPayload: (payload) => {
    const validationResult = playlistSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistValidator;
