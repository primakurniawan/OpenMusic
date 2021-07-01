const routes = require('./routes');
const SongHandler = require('./SongHandler');

exports.plugin = {
  name: 'song',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new SongHandler(service, validator);

    server.route(routes(handler));
  },
};
