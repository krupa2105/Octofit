import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Avery Stone', email: 'avery@example.com', avatar: 'AS' },
      { name: 'Jordan Lee', email: 'jordan@example.com', avatar: 'JL' },
      { name: 'Morgan Patel', email: 'morgan@example.com', avatar: 'MP' },
    ]);

    await Team.create([
      {
        name: 'Morning Momentum',
        description: 'A supportive team for consistent early workouts.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Weekend Warriors',
        description: 'Training together for stronger weekends.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 320,
        completedAt: new Date('2026-09-22T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 45,
        calories: 410,
        completedAt: new Date('2026-09-21T17:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Strength training',
        durationMinutes: 30,
        calories: 240,
        completedAt: new Date('2026-09-20T10:00:00Z'),
      },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 1280, rank: 1, period: 'weekly' },
      { user: users[1]._id, points: 1040, rank: 2, period: 'weekly' },
      { user: users[2]._id, points: 860, rank: 3, period: 'weekly' },
    ]);

    await Workout.create([
      {
        title: 'Foundational Full Body',
        description: 'A balanced circuit for building strength and mobility.',
        difficulty: 'beginner',
        durationMinutes: 25,
        focus: 'Full body',
      },
      {
        title: 'Tempo Run Builder',
        description: 'Intervals that improve endurance and running pace.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        focus: 'Cardio',
      },
      {
        title: 'Power and Conditioning',
        description: 'A challenging session for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 45,
        focus: 'Strength',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
