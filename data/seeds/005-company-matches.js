
exports.seed = function(knex) {
  return knex('company_matches').insert([
    {match: true, user_id: 2, job_id: 2},
    {match: false, user_id: 1, job_id: 2},
  ]);
};
