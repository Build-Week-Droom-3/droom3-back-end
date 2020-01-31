const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex('users').insert([
    {username: "example", password: bcrypt.hashSync("password", 12), name: "Example User", occupation: "Software Developer", interest: "Keyboards, Cars", experience: "1 year JavaScript", description: "Software Developer in Roanoke !"},
    {username: "dan", password: bcrypt.hashSync("password", 12), name: "Dan Martin", occupation: "Software Developer", interest: "Keyboards, Cars", experience: "1 year JavaScript, React, Node, C, Java", description: "I enjoy learning and I'm looking for my dream job!"},
    {username: "lambda", password: bcrypt.hashSync("password", 12), name: "Lambda School", description: "$0 upfront tuition school, betting on students!", company: true},
    {username: "google", password: bcrypt.hashSync("password", 12), name: "Google", description: "#1 Search Engine", company: true},
  ]);
};
