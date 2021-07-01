const routes = require("./router");
const UserHandler = require("./UserHandler");

module.exports = {
  name: "users",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const userHandler = new UserHandler(service, validator);
    server.route(routes(userHandler));
  },
};
