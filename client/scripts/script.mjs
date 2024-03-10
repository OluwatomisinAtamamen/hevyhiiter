const global = {};

function verifyInput() {
  if (global.profileName.value === '') {
    return false;
  }
  return true;
}

async function fetchWorkouts(id){
  const response = await fetch(`data/profiles/workouts/${id}`);
  let workouts;
  if (response.ok) {
    workouts = await response.json();
  } else {
    console.log('failed to load workouts', response);
  }
  console.log(workouts, 'success');
}

function showProfileList(profiles){
  for (const profile of profiles) {
    const btn = document.createElement('button');
    btn.innerText = profile.USERNAME;
    btn.classList.add('savedProfileBtn');
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
      fetchWorkouts(payload.username);
    } else {
      console.log('failed to create profile', response);
    }

    global.profileSec.classList.add('hide');
    global.homeSec.classList.remove('hide');
  }else{
    global.profileError.classList.remove('hide');
    global.profileName.focus();
  }
}


async function loadProfiles(){
  const response = await fetch('data/profiles');
  let profiles;
  if (response.ok) {
    profiles = await response.json();
  } else {
    console.log('failed to load profiles', response);
  }
  showProfileList(profiles);
  global.profileArray = profiles;
}

function createWorkout() {
  global.createSec.classList.remove('hide');
  global.createSec.classList.add('show');
}

function loadSavedWorkouts() {

}

function prepareHandles() {
  global.createBtn = document.querySelector('#createBtn');
  global.createSec = document.querySelector('.createWorkout');
  global.workoutName = document.querySelector('#workoutName');
  global.newProfileBtn = document.querySelector('#newProfileBtn');
  global.profileName = document.querySelector('#profileName');
  global.profileList = document.querySelector('.profileList');
  global.profileSec = document.querySelector('.profileSec');
  global.homeSec = document.querySelector('.homeSec');
  global.profileError = document.querySelector('.profileError');
  global.savedProfileBtn = document.querySelector('.savedProfileBtn');
}

function addEventListeners() {
  global.createBtn.addEventListener('click', createWorkout);
  global.newProfileBtn.addEventListener('click', createProfile);
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadProfiles();
}

window.addEventListener('load', pageLoaded);