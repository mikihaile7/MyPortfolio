import Contact from "../models/contact.model.js";
import crudController from "./crud.factory.js";

export default crudController(Contact, "Contact");
