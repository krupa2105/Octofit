import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout =
  mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
