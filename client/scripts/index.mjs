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

// Function to select an exercise
function selectExercise(exerciseName){
  console.log(exerciseName, 'YESS');
}

// Function to show all exercises
function showAllExercises(exercises){
  for (const exercise of exercises) {
    const tile = document.createElement('section');
    const tileP = document.createElement('p');
    tileP.innerText = exercise.EXERCISE_NAME;
    tile.append(tileP)
    tile.classList.add('exerciseTiles');
    tile.addEventListener('click', () => selectExercise(exercise.EXERCISE_NAME));
    global.exerciseList.append(tile);
  }
}

// Function to fetch exercises by muscle
async function fetchExercisesByMuscle (muscleName){
  // TODO: Implement fetching exercises by muscle
}

// Function to fetch exercises by equipment
async function fetchExercisesbyEquipment(){
  // TODO: Implement fetching exercises by equipment
}

// Function to fetch all exercises
async function fetchExercises() {
  const response = await fetch('data/exercises/all');
  let exercises;
  if (response.ok) {
    exercises = await response.json();
    console.log(exercises, 'success');
    showAllExercises(exercises)
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
async function fetchWorkouts(id){
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
function showProfileList(profiles){
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
  if (verifyInput()){
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
  }else{
    global.profileError.classList.remove('hide');
    global.profileName.focus();
  }
}

// Function to fetch all profiles
async function fetchAllProfiles(){
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
}

// Function to add event listeners
function addEventListeners() {
  global.showNewWorkoutBtn.addEventListener('click', toggleNewWorkout);
  global.newProfileBtn.addEventListener('click', createProfile);
  global.cancelBtn.addEventListener('click', toggleNewWorkout);
}

// Function to be called when the page is loaded
function pageLoaded() {
  prepareHandles();
  addEventListeners();
  fetchAllProfiles();
}

window.addEventListener('load', pageLoaded);