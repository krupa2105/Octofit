import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    response.json(
      await Leaderboard.find().populate('user', 'name email').sort({ rank: 1 }),
    );
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;
