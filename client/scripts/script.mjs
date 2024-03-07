const global = {};

function createWorkout() {
  global.createSec.classList.remove('hide');
  global.createSec.classList.add('show');
  global.workoutName.focus();
  
}

function prepareHandles() {
  global.createBtn = document.querySelector('#createBtn');
  global.createSec = document.querySelector('.createWorkout');
  global.workoutName = document.querySelector('#workoutName');
}

function addEventListeners() {
  global.createBtn.addEventListener('click', createWorkout);
}

function loadSavedWorkouts() {

}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadSavedWorkouts();
}

window.addEventListener('load', pageLoaded);