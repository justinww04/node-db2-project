// STRETCH
const cars = [
    {
        vin: '11111111111112222',
        make: 'toyota',
        model: 'preeyus',
        mileage: 59154,
        title: 'clean',
        transmission: 'manual'
    }, 
    {
        vin: '11111111111123333',
        make: 'toyota',
        model: 'corrolla',
        mileage: 59,
        title: 'dirty',
    }, 
    {
        vin: '11111111111134444',
        make: 'ford',
        model: 'F150',
        mileage: 59143654,
    }, 
]

exports.seed = async function (knex) {
    await knex('cars').truncate();
    await knex('cars').insert(cars);
} 