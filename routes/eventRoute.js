import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
import { createanEvent, getAllEvents, getSingleEvent, deleteEvent, getJoinedEvents, getHostedEvents, unregisterEvent, deleteTeamFromEvent } from '../controllers/eventController.js';
import { createTeam } from '../controllers/teamController.js';

const router = express.Router();

router.post('/new', isAuth, uploadFile, createanEvent);
router.get('/allEvents', isAuth, getAllEvents);
router.get('/joined', isAuth, getJoinedEvents);
router.get('/hosted', isAuth, getHostedEvents); // New hosted events route
router.get('/:id', isAuth, getSingleEvent);
router.post('/register/:id', isAuth, createTeam);
router.delete('/:id', isAuth, deleteEvent);
router.post('/unregister/:id', isAuth, unregisterEvent);
// New endpoint: delete team from event and remove from database
router.delete('/:eventId/teams/:teamId', isAuth, deleteTeamFromEvent);

export default router;
