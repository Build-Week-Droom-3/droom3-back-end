
exports.seed = async function(knex) {
  // await knex("matches").truncate();
  await knex("user_matches").del();
  await knex("jobs").del();
  // await knex("companies").truncate();
  await knex("users").del();
};
