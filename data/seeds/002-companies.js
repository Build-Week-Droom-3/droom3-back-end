const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex('companies').insert([
    {username: "lambda", password: bcrypt.hashSync("password", 12), name: "Lambda School", description: "$0 upfront tuition school, betting on students!"},
    {username: "google", password: bcrypt.hashSync("password", 12), name: "Google", description: "#1 Search Engine"},
  ]);
};
