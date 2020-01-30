
exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
      tbl.increments();

      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();

      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      
      tbl.string("occupation", 128).notNullable();
      tbl.text("interest").notNullable();
      tbl.text("experience");
      
      tbl.text("description");
  });

  await knex.schema.createTable("companies", tbl => {
      tbl.increments();

      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();

      tbl.string("name", 128).notNullable().unique();
      tbl.text("description");
  });

  await knex.schema.createTable("jobs", tbl => {
      tbl.increments();

      tbl.integer("company_id").notNullable().references("id").inTable("companies").onUpdate("CASCADE").onDelete("CASCADE");
      tbl.string("name", 128).notNullable();
      tbl.string("type", 128).notNullable();
      tbl.text("description");
  });

  await knex.schema.createTable("user_matches", tbl => {
      tbl.boolean("match").defaultTo(0);
      tbl.integer("user_id").notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
      tbl.integer("job_id").notNullable().references("id").inTable("jobs").onUpdate("CASCADE").onDelete("CASCADE");

      tbl.primary(["user_id", "job_id"]);
  });

  await knex.schema.createTable("company_matches", tbl => {
    tbl.boolean("match").defaultTo(0);
    tbl.integer("user_id").notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    tbl.integer("job_id").notNullable().references("id").inTable("jobs").onUpdate("CASCADE").onDelete("CASCADE");

    tbl.primary(["user_id", "job_id"]);
});


};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("user_matches");
  await knex.schema.dropTableIfExists("company_matches");
  await knex.schema.dropTableIfExists("jobs");
  await knex.schema.dropTableIfExists("companies");
  await knex.schema.dropTableIfExists("users");
};
