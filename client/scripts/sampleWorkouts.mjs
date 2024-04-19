export const sampleWorkouts = [
  {
    name: 'Sample Workout 1',
    description: 'This is a sample workout description.',
    exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'],
  },
  {
    name: 'Sample Workout 2',
    description: 'Another sample workout description.',
    exercises: ['Exercise 4', 'Exercise 5', 'Exercise 6'],
  },
];


if (global.homeSec.classList.contains('hide')) {
  // If the home section is hidden, add an entry to the history with the state { page: 'profile' }
  history.pushState({ page: 'login' }, '', '#login');
} else {
  // If the home section is shown, add an entry to the history with the state { page: 'home' }
  history.pushState({ page: 'home' }, '', '#home');
}


if (global.createWorkoutSec.classList.contains('hide')) {
  // If the new workout section is hidden, add an entry to the history with the state { page: 'home' }
  history.pushState({ page: 'home' }, '', '#home');
} else {
  // If the new workout section is shown, add an entry to the history with the state { page: 'create-workout' }
  history.pushState({ page: 'create-workout' }, '', '#create-workout');
}