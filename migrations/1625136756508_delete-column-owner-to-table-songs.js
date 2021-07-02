/* eslint-disable camelcase */


exports.up = (pgm) => {
    pgm.dropColumn("songs", "owner");
  };
  
  exports.down = (pgm) => {
    pgm.addColumn("songs", {
      owner: {
        type: "VARCHAR(50)",
      },
    });
  };
  