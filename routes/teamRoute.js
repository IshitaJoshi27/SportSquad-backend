import express from 'express';
import {isAuth} from '../middlewares/isAuth.js';
import {getSingleTeam} from '../controllers/teamController.js';

const router = express.Router();

router.get('/:id', isAuth, getSingleTeam);

export default router;