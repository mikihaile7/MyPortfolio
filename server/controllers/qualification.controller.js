import Qualification from '../models/qualification.model.js';

const create = async (req, res) => {
  try {
    const qualification = new Qualification(req.body);
    await qualification.save();
    return res.status(200).json({
      message: 'Qualification successfully added!'
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

export default {
  create,
  list
};