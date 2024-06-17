const knex = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return knex('cars');
}

const getById = (id) => {
  // DO YOUR MAGIC
  return knex.select('make', 'mileage', 'model', 'title', 'transmission', 'vin')
  .from('cars')
  .where('id', id)
  .first();
}

const create = (payload) => {
  // DO YOUR MAGIC
  return knex('cars')
  .insert(payload)
}

module.exports = {
  getAll,
  getById,
  create
}