// Global Variable
const global = {};

// Function to toggle the home section
function toggleHome() {
  global.profileSec.classList.toggle('hide');
  global.homeSec.classList.toggle('hide');
}

// Function to verify input
function verifyInput() {
  if (global.profileName.value === '') {
    return false;
  }
  return true;
}

function removeExercise(exerciseName) {
  const selectedExercises = Array.from(global.selectedExercises.children);
  for (const exercise of selectedExercises) {
    if (exercise.textContent.includes(exerciseName)) {
      exercise.remove();
    }
  }
}

// Function to select an exercise
function selectExercise(exerciseName) {
  const selectedExercise = document.createElement('section');
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('removeBtn');
  removeBtn.addEventListener('click', () => removeExercise(exerciseName));

  // Create a timer input
  const timerInput = document.createElement('input');
  timerInput.type = 'number';
  timerInput.min = '0'; // minimum value
  timerInput.max = '60'; // maximum value
  timerInput.placeholder = 'Time'; // placeholder text

  // Create a timer unit select
  const timerUnit = document.createElement('select');
  const secsOption = document.createElement('option');
  secsOption.value = 'secs';
  secsOption.text = 'secs';
  const minOption = document.createElement('option');
  minOption.value = 'min';
  minOption.text = 'min';
  timerUnit.append(secsOption, minOption);

  selectedExercise.innerText = exerciseName;
  selectedExercise.append(timerInput, timerUnit, removeBtn);
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
  }
}

// Function to show exercises
function showAllExercises(exercises) {
  // Clear the existing exercise list
  global.exerciseList.innerHTML = '';

  for (const exercise of exercises) {
    const tile = document.createElement('section');
    const tileP = document.createElement('p');
    tileP.innerText = exercise.EXERCISE_NAME;
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
function toggleNewWorkout() {
  global.createWorkoutSec.classList.toggle('hide');
  global.showNewWorkoutBtn.classList.toggle('hide');
}

// Function to fetch workouts
async function fetchWorkouts(id) {
  const response = await fetch(`data/profiles/workouts/${id}`);
  let workouts;
  if (response.ok) {
    workouts = await response.json();
    fetchExercises();
    toggleHome();
    console.log(workouts, id, 'success');
  } else {
    console.log('failed to load workouts', response);
  }
}

// Function to show the profile list
function showProfileList(profiles) {
  for (const profile of profiles) {
    const btn = document.createElement('button');
    btn.innerText = profile.USERNAME;
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
  console.log(global.profileArray);
}

// Function to prepare handles
function prepareHandles() {
  global.showNewWorkoutBtn = document.querySelector('.showNewWorkout');
  global.createWorkoutSec = document.querySelector('.createWorkout');
  global.workoutName = document.querySelector('#workoutName');
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
}

// Function to add event listeners
function addEventListeners() {
  global.showNewWorkoutBtn.addEventListener('click', toggleNewWorkout);
  global.newProfileBtn.addEventListener('click', createProfile);
  global.cancelBtn.addEventListener('click', toggleNewWorkout);
  global.selectMuscle.addEventListener('change', muscleFilter);
  global.searchExercise.addEventListener('input', searchExerciseList);
}

// Function to be called when the page is loaded
function pageLoaded() {
  prepareHandles();
  addEventListeners();
  fetchAllProfiles();
}

window.addEventListener('load', pageLoaded);
