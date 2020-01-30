
exports.seed = async function(knex) {
  await knex("user_matches").truncate();
  await knex("company_matches").truncate();
  await knex("jobs").truncate();
  await knex("companies").truncate();
  await knex("users").truncate();
};
