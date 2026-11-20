import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();
const { requireSignin, isAdmin } = authCtrl;

// Everyone can view (read); only the admin can create / update / delete
router
  .route("/api/projects")
  .get(projectCtrl.list)
  .post(requireSignin, isAdmin, projectCtrl.create)
  .delete(requireSignin, isAdmin, projectCtrl.removeAll);

router
  .route("/api/projects/:id")
  .get(projectCtrl.read)
  .put(requireSignin, isAdmin, projectCtrl.update)
  .delete(requireSignin, isAdmin, projectCtrl.remove);

router.param("id", projectCtrl.byID);

export default router;
