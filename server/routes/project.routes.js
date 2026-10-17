import express from 'express';
import projectCtrl from '../controllers/project.controller.js';

const router = express.Router();

router.route('/api/projects')
  .get(projectCtrl.list)
  .post(projectCtrl.create);

export default router;