
exports.seed = function(knex) {
  return knex('jobs').insert([
    {company_id: 3, name: "Software Engineer", type: "Software", description: "Build awesome things with us"},
    {company_id: 4, name: "React Developer", type: "Software", description: "React Developer with 2 years experience "},
  ]);
};
