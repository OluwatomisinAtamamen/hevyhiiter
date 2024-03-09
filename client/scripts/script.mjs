const global = {};

// async function accessProfile(){
// }

function showProfileList(profiles){
  for (const profile of profiles) {
    const btn = document.createElement('button');
    btn.innerText = profile.USERNAME;
    btn.classList.add('.profileBtn');
    global.profileList.append(btn);

  }
}

async function createProfile() {
  const payload = { USERNAME: global.profileName.value };

  const response = await fetch('data/profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    // accessProfile(payload.USERNAME);
    loadProfiles();
  } else {
    console.log('failed to create profile', response);
  }

  global.profileSec.classList.add('hide');
  global.homeSec.classList.remove('hide');
}

async function loadProfiles(){
  const response = await fetch('data/profiles');
  let profiles;
  if (response.ok) {
    profiles = await response.json();
  } else {
    profiles = [{ p: 'failed to load profiles :-(' }];
  }
  showProfileList(profiles);
  // console.log(profiles[0].USERNAME);6
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
  global.profileBtn = document.querySelector('#newProfileBtn');
  global.profileName = document.querySelector('#profileName');
  global.profileList = document.querySelector('.profileList');
  global.profileSec = document.querySelector('.profileSec');
  global.homeSec = document.querySelector('.homeSec');
}

function addEventListeners() {
  global.createBtn.addEventListener('click', createWorkout);
  global.profileBtn.addEventListener('click', createProfile);
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadProfiles();
}

window.addEventListener('load', pageLoaded);