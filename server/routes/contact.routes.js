import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();
const { requireSignin, isAdmin } = authCtrl;

// Anyone can submit the contact form; only the admin can read/manage messages
router
  .route("/api/contacts")
  .post(contactCtrl.create)
  .get(requireSignin, isAdmin, contactCtrl.list)
  .delete(requireSignin, isAdmin, contactCtrl.removeAll);

router
  .route("/api/contacts/:id")
  .get(requireSignin, isAdmin, contactCtrl.read)
  .put(requireSignin, isAdmin, contactCtrl.update)
  .delete(requireSignin, isAdmin, contactCtrl.remove);

router.param("id", contactCtrl.byID);

export default router;
