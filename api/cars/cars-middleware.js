const vinValidator = require('vin-validator');
const Database = require('./cars-model');

const validatePayload = (payload) => {
  const requiredFields = ['vin', 'make', 'model', 'mileage'];
  for (const field of requiredFields) {
    if (!payload[field]) {
      throw new Error(`${field} is required`);
    }
  }
};

const getFirstWordOfError = (message) => {
  return message.split(' ')[0];
};

const checkCarId = async (req, res, next) => {
  const id = req.params.id;
  req.errStatus = 404;
  req.errMessage = `car with id ${id} is not found`;
  try {
    const result = await Database.getById(id);
    if (result.length === 0) {
      throw new Error();
    }
    req.payload = result;
    req.carId = id;
    next();
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    validatePayload(req.body);
    next();
  } catch (err) {
    req.errStatus = 400;
    req.errMessage = `${getFirstWordOfError(err.message)} is missing`;
    next(err);
  }
};

const checkVinNumberValid = (req, res, next) => {
  console.log("checkVinNumberValid Middleware Running");
  const isValid = vinValidator.validate(req.body.vin);
  if (isValid) {
    next();
  } else {
    const error = new Error();
    req.errStatus = 400;
    req.errMessage = `vin ${req.body.vin} is invalid`;
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  console.log("checkVinNumberUnique Middleware Running");
  const vin = req.body.vin;
  try {
    const result = await Database.getAll();
    const vinExists = result.some(car => car.vin === vin);
    if (vinExists) {
      const error = new Error();
      req.errStatus = 400;
      req.errMessage = `vin ${req.body.vin} already exists`;
      next(error);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};