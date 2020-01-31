
exports.seed = function(knex) {
  return knex('user_matches').insert([
    {match: false, user_id: 1, job_id: 1},
    {match: true, user_id: 1, job_id: 2},
    {match: true, user_id: 2, job_id: 2},
  ]);
};
