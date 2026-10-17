import Project from '../models/project.model.js';

// Create a new project
const create = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    return res.status(200).json({
      message: 'Project successfully added!'
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

// Get all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
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