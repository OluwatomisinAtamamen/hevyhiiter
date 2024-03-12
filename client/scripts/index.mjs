const global = {};

function showHome() {
  global.profileSec.classList.add('hide');
  global.homeSec.classList.remove('hide');
}

function verifyInput() {
  if (global.profileName.value === '') {
    return false;
  }
  return true;
}

function selectExercise(exerciseName){
  console.log(exerciseName, 'YESS');
}

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

async function fetchExercisesByMuscle (muscleName){
  
}

async function fetchExercisesbyEquipment(){}

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

function toggleNewWorkout() {
  global.createWorkoutSec.classList.toggle('hide');
  global.showNewWorkoutBtn.classList.toggle('hide');
}

async function fetchWorkouts(id){
  const response = await fetch(`data/profiles/workouts/${id}`);
  let workouts;
  if (response.ok) {
    workouts = await response.json();
    fetchExercises();
    showHome();
    console.log(workouts, id, 'success');
  } else {
    console.log('failed to load workouts', response);
  }
}

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

function addEventListeners() {
  global.showNewWorkoutBtn.addEventListener('click', toggleNewWorkout);
  global.newProfileBtn.addEventListener('click', createProfile);
  global.cancelBtn.addEventListener('click', toggleNewWorkout);
}


function pageLoaded() {
  prepareHandles();
  addEventListeners();
  fetchAllProfiles();
}

window.addEventListener('load', pageLoaded);