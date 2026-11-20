import Project from "../models/project.model.js";
import crudController from "./crud.factory.js";

export default crudController(Project, "Project");
