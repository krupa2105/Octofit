import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    response.json(
      await Activity.find().populate('user', 'name email').sort({ completedAt: -1 }),
    );
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;
