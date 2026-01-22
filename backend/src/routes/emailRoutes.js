import express from 'express';
import { getScheduledEmails, getSentEmails, scheduleEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/schedule',scheduleEmail);
router.get("/scheduled", getScheduledEmails);
router.get("/sent", getSentEmails);

export default router;