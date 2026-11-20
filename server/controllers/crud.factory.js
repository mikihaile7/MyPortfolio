import errorHandler from "../helpers/dbErrorHandler.js";

// Builds list / create / read / update / remove handlers for a Mongoose model
export default function crudController(Model, label) {
  const create = async (req, res) => {
    try {
      const doc = new Model(req.body);
      await doc.save();
      return res.status(201).json(doc);
    } catch (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) || err.message });
    }
  };

  const list = async (req, res) => {
    try {
      const docs = await Model.find().sort({ completion: -1, _id: -1 });
      return res.json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // router.param handler: loads the document into req.doc
  const byID = async (req, res, next, id) => {
    try {
      const doc = await Model.findById(id);
      if (!doc) return res.status(404).json({ error: `${label} not found` });
      req.doc = doc;
      next();
    } catch (err) {
      return res.status(400).json({ error: `Could not retrieve ${label}` });
    }
  };

  const read = (req, res) => res.json(req.doc);

  const update = async (req, res) => {
    try {
      const { _id, __v, ...fields } = req.body;
      req.doc.set(fields);
      await req.doc.save();
      return res.json(req.doc);
    } catch (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) || err.message });
    }
  };

  const remove = async (req, res) => {
    try {
      await req.doc.deleteOne();
      return res.json({ message: `${label} deleted`, _id: req.doc._id });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  const removeAll = async (req, res) => {
    try {
      const result = await Model.deleteMany({});
      return res.json({ message: `All ${label}s deleted`, deletedCount: result.deletedCount });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  return { create, list, byID, read, update, remove, removeAll };
}
