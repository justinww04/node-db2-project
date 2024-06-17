exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', (table) => {
    table.increments('id').primary();
    table.string('vin', 17).notNullable().unique();
    table.string('model', 128).notNullable();
    table.string('make', 128).notNullable();
    table.integer('mileage').notNullable();
    table.string('title');
    table.string('transmission');
  })
};

exports.down = (knex) => {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};