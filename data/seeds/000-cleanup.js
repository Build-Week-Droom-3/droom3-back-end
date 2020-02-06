
exports.seed = async function(knex) {
  // await knex("user_matches").del();
  // await knex("jobs").del();
  // await knex("users").del();
  await knex("user_matches").truncate();
  await knex("jobs").truncate();
  await knex("users").truncate();
};
