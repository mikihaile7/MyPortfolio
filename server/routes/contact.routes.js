import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';

const router = express.Router();

router.route('/api/contacts')
  .get(contactCtrl.list)
  .post(contactCtrl.create);

export default router; 