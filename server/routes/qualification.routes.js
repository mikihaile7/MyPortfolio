import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();
const { requireSignin, isAdmin } = authCtrl;

// Everyone can view (read); only the admin can create / update / delete
router
  .route("/api/qualifications")
  .get(qualificationCtrl.list)
  .post(requireSignin, isAdmin, qualificationCtrl.create)
  .delete(requireSignin, isAdmin, qualificationCtrl.removeAll);

router
  .route("/api/qualifications/:id")
  .get(qualificationCtrl.read)
  .put(requireSignin, isAdmin, qualificationCtrl.update)
  .delete(requireSignin, isAdmin, qualificationCtrl.remove);

router.param("id", qualificationCtrl.byID);

export default router;
