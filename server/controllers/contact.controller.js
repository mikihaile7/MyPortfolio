import Contact from '../models/contact.model.js';

// Create a new contact
const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(200).json({
      message: 'Contact successfully added!'
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

// Get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
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