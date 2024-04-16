import { sampleWorkouts } from './sampleWorkouts.mjs';

// Global Variable
const global = { };

// Function to toggle the home section
function toggleHome() {
  global.profileSec.classList.toggle('hide');
  global.homeSec.classList.toggle('hide');

  if (global.homeSec.classList.contains('hide')) {
    // If the home section is hidden, add an entry to the history with the state { page: 'profile' }
    history.pushState({ page: 'login' }, '', '#login');
  } else {
    // If the home section is shown, add an entry to the history with the state { page: 'home' }
    history.pushState({ page: 'home' }, '', '#home');
  }
}

function clearExercises() {
  global.selectedExercises.innerHTML = '';
}

// Function to verify input
function verifyInput() {
  if (global.profileName.value === '') {
    return false;
  }
  return true;
}

function createTimerInputAndUnit() {
  // Create a timer input
  const timerInput = document.createElement('input');
  timerInput.type = 'number';
  timerInput.min = '0'; // minimum value
  timerInput.max = '60'; // maximum value
  timerInput.placeholder = 'Exercise Time'; // placeholder text

  timerInput.addEventListener('input', () => {
    if (timerInput.value > 60) {
      timerInput.value = 60;
    }
  });

  // Create a timer unit select
  const timerUnit = document.createElement('select');
  const secsOption = document.createElement('option');
  secsOption.value = 'secs';
  secsOption.text = 'secs';
  const minOption = document.createElement('option');
  minOption.value = 'min';
  minOption.text = 'min';
  timerUnit.append(secsOption, minOption);

  return { timerInput, timerUnit };
}

function removeExercise(event) {
  // Get the button that was clicked
  const removeBtn = event.target;

  // Get the parent section of the button
  const exerciseSection = removeBtn.parentNode;

  // Remove the section
  exerciseSection.remove();
}

// Function to select an exercise
function selectExercise(exerciseName) {
  const selectedExercise = document.createElement('section');
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('removeBtn');
  removeBtn.addEventListener('click', removeExercise);

  // Create exercise time input and unit
  const { timerInput: exerciseTimeInput, timerUnit: exerciseTimeUnit } = createTimerInputAndUnit();

  // Create rest time input and unit
  const { timerInput: restTimeInput, timerUnit: restTimeUnit } = createTimerInputAndUnit();
  restTimeInput.placeholder = 'Rest Time'; // update placeholder

  selectedExercise.textContent = exerciseName;
  selectedExercise.append(exerciseTimeInput, exerciseTimeUnit, restTimeInput, restTimeUnit, removeBtn);
  global.selectedExercises.append(selectedExercise);
}

function searchExerciseList() {
  const query = global.searchExercise.value.toLowerCase();
  const exercises = Array.from(global.exerciseList.children);
  for (const exercise of exercises) {
    const exerciseName = exercise.textContent.toLowerCase();
    if (exerciseName.includes(query)) {
      exercise.style.display = '';
    } else {
      exercise.style.display = 'none';
    }
  }
}

function muscleFilter() {
  const selectedOption = global.selectMuscle.options[global.selectMuscle.selectedIndex];
  // Get the text content of the selected option
  const selectedMuscle = selectedOption.textContent;
  if (selectedMuscle !== 'All Exercises') {
    fetchExercisesByMuscle(selectedMuscle);
  } else {
    fetchExercises();
  }
}

// Function to show exercises
function showAllExercises(exercises) {
  // Clear the existing exercise list
  global.exerciseList.innerHTML = '';

  for (const exercise of exercises) {
    const tile = document.createElement('section');
    const tileP = document.createElement('p');
    tileP.textContent = exercise.EXERCISE_NAME;
    tile.append(tileP);
    tile.classList.add('exerciseTiles');
    tile.addEventListener('click', () => selectExercise(exercise.EXERCISE_NAME));
    global.exerciseList.append(tile);
  }
}

// Function to fetch exercises by muscle
async function fetchExercisesByMuscle(muscleName) {
  const response = await fetch(`data/exercises/by-muscle/${muscleName}`);
  let exercises;
  if (response.ok) {
    exercises = await response.json();
    console.log(exercises, 'success');
    showAllExercises(exercises);
  } else {
    console.log('failed to load exercises', response);
  }
}

// Function to fetch all exercises
async function fetchExercises() {
  const response = await fetch('data/exercises/all');
  let exercises;
  if (response.ok) {
    exercises = await response.json();
    console.log(exercises, 'success');
    showAllExercises(exercises);
  } else {
    console.log('failed to load exercises', response);
  }
}

// Function to toggle the new workout section
function toggleNewWorkoutSec() {
  global.createWorkoutSec.classList.toggle('hide');
  global.showNewWorkoutBtn.classList.toggle('hide');

  if (global.createWorkoutSec.classList.contains('hide')) {
    // If the new workout section is hidden, add an entry to the history with the state { page: 'home' }
    history.pushState({ page: 'home' }, '', '#home');
  } else {
    // If the new workout section is shown, add an entry to the history with the state { page: 'create-workout' }
    history.pushState({ page: 'create-workout' }, '', '#create-workout');
  }
}

// Function to fetch workouts
async function fetchWorkouts(id) {
  const response = await fetch(`data/profiles/workouts/${id}`);
  let workouts;
  if (response.ok) {
    workouts = await response.json();

    // Save the current user ID in the global variable
    global.currentUserId = id;
    fetchExercises();
    toggleHome();
    console.log(workouts, id, 'logged in');
  } else {
    console.log('failed to load workouts', response);
  }
}

function getNewWorkoutForm() {
  const workoutExercises = Array.from(global.selectedExercises.children).map((exercise) => {
    const exerciseName = exercise.textContent.trim();
    const inputsAndSelects = exercise.querySelectorAll('input, select');
    const exerciseTimeInput = inputsAndSelects[0].value;
    const exerciseTimeUnit = inputsAndSelects[1].value;
    const restTimeInput = inputsAndSelects[2].value;
    const restTimeUnit = inputsAndSelects[3].value;

    // Check if any of the values are empty
    if (!exerciseName || !exerciseTimeInput || !exerciseTimeUnit || !restTimeInput || !restTimeUnit) {
      global.incompleteFormError.classList.remove('hide');
    } else {
      global.incompleteFormError.classList.add('hide');
      return { exerciseTimeInput, exerciseTimeUnit, restTimeInput, restTimeUnit, exerciseName };
    }
    return null;
  });

  if (global.workoutName.value === '' || global.workoutDesc.value === '') {
    global.workoutDescError.classList.remove('hide');
  } else if (workoutExercises.length !== 0 && !workoutExercises == null) {
    global.workoutDescError.classList.add('hide');
    const payload = {
      workoutName: global.workoutName.value,
      workoutDesc: global.workoutDesc.value,
      workoutExercises,
    };
    console.log(payload);
    return payload;
  } else if (workoutExercises.length === 0) {
    global.noExercisesError.classList.remove('hide');
  }
}

// Function to create a new workout
async function createNewWorkout() {
  const payload = getNewWorkoutForm();
  console.log(payload);

  // Add workoutId property to payload
  payload.workoutId = global.currentUserId;

  const response = await fetch(`data/profiles/workouts/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newWorkout = await response.json();
    console.log(id, payload, newWorkout, 'success');
  } else {
    console.log('failed to create workout', response);
  }
}


// Function to show the profile list
function showProfileList(profiles) {
  for (const profile of profiles) {
    const btn = document.createElement('button');
    btn.textContent = profile.USERNAME;
    btn.classList.add('savedProfileBtn');
    btn.dataset.profileId = profile.PROFILE_ID;
    btn.addEventListener('click', () => fetchWorkouts(profile.PROFILE_ID));
    global.profileList.append(btn);
  }
}

// Function to create a new profile
async function createProfile() {
  if (verifyInput()) {
    const payload = { username: global.profileName.value };
    const response = await fetch('data/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const newProfile = await response.json();
      fetchWorkouts(newProfile.PROFILE_ID);
      console.log(newProfile);
    } else {
      console.log('failed to create profile', response);
    }
  } else {
    global.profileError.classList.remove('hide');
    global.profileName.focus();
  }
}

// Function to fetch all profiles
async function fetchAllProfiles() {
  const response = await fetch('data/profiles');
  let profiles;
  if (response.ok) {
    profiles = await response.json();
  } else {
    console.log('failed to load profiles', response);
  }
  showProfileList(profiles);
  global.profileArray = profiles;
  console.log(global.profileArray, 'all profiles');
}

// Function to prepare handles
function prepareHandles() {
  global.showNewWorkoutBtn = document.querySelector('.showNewWorkout');
  global.createWorkoutSec = document.querySelector('.createWorkoutSec');
  global.workoutName = document.querySelector('#workoutName');
  global.workoutDesc = document.querySelector('#workoutDesc');
  global.createWorkoutBtn = document.querySelector('#createWorkoutBtn');

  global.newProfileBtn = document.querySelector('#newProfileBtn');
  global.profileName = document.querySelector('#profileName');
  global.profileList = document.querySelector('.profileList');
  global.profileSec = document.querySelector('.profileSec');
  global.homeSec = document.querySelector('.homeSec');
  global.profileError = document.querySelector('.profileError');
  global.cancelBtn = document.querySelector('#cancelBtn');

  global.exerciseList = document.querySelector('.exerciseList');
  global.selectMuscle = document.querySelector('#muscleFilter');
  global.searchExercise = document.querySelector('#searchExercise');
  global.selectedExercises = document.querySelector('.selectedExercises');
  global.clearExercises = document.querySelector('#clearExercises');

  global.workoutDescError = document.querySelector('.workoutDescError');
  global.noExercisesError = document.querySelector('.noExercisesError');
  global.incompleteFormError = document.querySelector('.incompleteFormError');
}

// Function to add event listeners
function addEventListeners() {
  global.showNewWorkoutBtn.addEventListener('click', toggleNewWorkoutSec);
  global.createWorkoutBtn.addEventListener('click', createNewWorkout);

  global.newProfileBtn.addEventListener('click', createProfile);
  global.cancelBtn.addEventListener('click', toggleNewWorkoutSec);

  global.selectMuscle.addEventListener('change', muscleFilter);
  global.searchExercise.addEventListener('input', searchExerciseList);
  global.clearExercises.addEventListener('click', clearExercises);
}

// Function to be called when the page is loaded
function pageLoaded() {
  prepareHandles();
  addEventListeners();
  fetchAllProfiles();
}

pageLoaded();
