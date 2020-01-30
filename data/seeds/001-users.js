const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex('users').insert([
    {username: "example", password: bcrypt.hashSync("password", 12), first_name: "Example", last_name: "User", occupation: "Software Developer", interest: "Keyboards, Cars", experience: "1 year JavaScript", description: "Software Developer in Roanoke !"},
    {username: "dan", password: bcrypt.hashSync("password", 12), first_name: "Dan", last_name: "Martin", occupation: "Software Developer", interest: "Keyboards, Cars", experience: "1 year JavaScript, React, Node, C, Java", description: "I enjoy learning and I'm looking for my dream job!"},
  ]);
};
