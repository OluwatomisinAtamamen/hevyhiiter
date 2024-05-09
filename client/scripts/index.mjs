import * as sample from './sampleWorkouts.mjs';

// Global Variable
const global = {
  navBar: document.querySelector('.nav'),
};

// Function to navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

// Hide all pages
function hideAllSections() {
  document.querySelectorAll('.page').forEach(section => section.classList.add('hide'));
}

// Show a specific section
function showSection(selector) {
  hideAllSections();
  document.querySelector(selector).classList.remove('hide');
}

// Handle the home section
function handleHomeSection() {
  const currentUserId = localStorage.getItem('currentUserId');
  if (currentUserId) {
    global.currentUserId = currentUserId;
    showSection('#home');
    showNavBar();

    // Check if the workouts have been fetched
    if (!(global.fetchWorkoutCheck)) {
      fetchWorkouts(global.currentUserId);
    }
  } else {
    navigateTo('/');
  }
}

// Handle the login section
function handleLoginSection() {
  const currentUserId = localStorage.getItem('currentUserId');
  if (currentUserId) {
    global.currentUserId = currentUserId;
    navigateTo('/home');
  } else {
    showSection('#login');
  }
}

// Handle the create workout section
function handleCreateWorkoutSection() {
  const currentUserId = localStorage.getItem('currentUserId');
  if (currentUserId) {
    global.currentUserId = currentUserId;
    showSection('#createWorkout');
    showNavBar();
    fetchExercises();
  } else {
    navigateTo('/');
  }
}

function handleWorkoutSessionSection() {
  const currentUserId = localStorage.getItem('currentUserId');
  if (currentUserId && global.currentWorkout) {
    global.currentUserId = currentUserId;
    showSection('#workoutSession');
    showNavBar();
  } else {
    navigateTo('/home');
  }
}

function handleViewWorkoutSection() {
  const currentUserId = localStorage.getItem('currentUserId');
  if (currentUserId && global.currentWorkout) {
    global.currentUserId = currentUserId;
    showSection('#viewWorkout');
    showNavBar();
  } else {
    navigateTo('/home');
  }
}

// Router function to handle different routes
function router() {
  const routes = [
    { path: '/', view: () => handleLoginSection() },
    { path: '/home', view: () => handleHomeSection() },
    { path: '/createWorkout', view: () => handleCreateWorkoutSection() },
    { path: '/viewWorkout', view: () => handleViewWorkoutSection() },
    { path: '/workoutSession', view: () => handleWorkoutSessionSection() },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  // Call the view function of the matched route
  match.route.view();
}

// Function to search workout and exericse list
function searchList(query, list) {
  const lowerCaseQuery = query.toLowerCase();
  const items = Array.from(list.children);
  for (const item of items) {
    const itemName = item.textContent.toLowerCase();
    if (itemName.includes(lowerCaseQuery)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  }
}

// Function to clear exercises
function clearExercises() {
  global.selectedExercises.innerHTML = '';
}

// Function to create a timer input and unit
function createTimerInputAndUnit() {
  // Create a timer input
  const timerInput = document.createElement('input');
  timerInput.type = 'number';
  timerInput.min = '1'; // minimum value
  timerInput.max = '1500'; // maximum value
  timerInput.placeholder = 'Exercise Time'; // placeholder text

  timerInput.addEventListener('input', () => {
    if (timerInput.value > 1500) {
      timerInput.value = 1500;
    }
  });

  return { timerInput };
}

// Function to remove an exercise
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

  // Create an element to hold the exercise name
  const exerciseNameElement = document.createElement('p');
  exerciseNameElement.textContent = exerciseName;

  // Create exercise time input
  const { timerInput: exerciseTimeInput } = createTimerInputAndUnit();

  // Create rest time input
  const { timerInput: restTimeInput } = createTimerInputAndUnit();
  restTimeInput.placeholder = 'Rest Time'; // update placeholder

  const timerUnit = document.createElement('span');
  timerUnit.textContent = 'secs'; // unit text

  selectedExercise.append(exerciseNameElement, exerciseTimeInput, timerUnit, restTimeInput, timerUnit, removeBtn);
  global.selectedExercises.append(selectedExercise);

  return selectedExercise;
}

// Function to filter exercises by muscle
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

// Function to show all exercises
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


function runTimer(duration, isExercise, callback) {
  let remainingTime = duration;
  let timerInterval;

  function updateTimer() {
    global.timerSection.classList.remove('hide');
    global.timerValue.textContent = remainingTime;
    global.timerLabel.textContent = isExercise ? 'Exercise' : 'Rest';

    timerInterval = setInterval(() => {
      remainingTime--;
      global.timerValue.textContent = remainingTime;

      if (remainingTime === 0) {
        clearInterval(timerInterval);
        global.timerSection.classList.add('hide');
        callback();
      }
    }, 1000);
  }

  const pauseTimer = () => {
    clearInterval(timerInterval);
  };

  const resumeTimer = () => {
    timerInterval = setInterval(() => {
      remainingTime--;
      global.timerValue.textContent = remainingTime;

      if (remainingTime === 0) {
        clearInterval(timerInterval);
        global.timerSection.classList.add('hide');
        callback();
      }
    }, 1000);
  };

  updateTimer();

  return { pauseTimer, resumeTimer };
}

function startWorkout(workout) {
  const workoutDetails = global.workoutExerciseDetails.filter(
    (details) => details.WORKOUT_ID === workout.WORKOUT_ID);
  console.log(workoutDetails, 'workout details');

  let currentExerciseIndex = 0;

  const handleNextExercise = () => {
    if (currentExerciseIndex < workoutDetails.length) {
      const { EXERCISE_DURATION } = workoutDetails[currentExerciseIndex]; // Remove REST_DURATION since it's not used

      const exerciseTimer = runTimer(EXERCISE_DURATION, true, handleRestPeriod); // Only create exerciseTimer

      const pauseExerciseTimer = exerciseTimer.pauseTimer;
      const resumeExerciseTimer = exerciseTimer.resumeTimer;

      // Add event listeners for pause and resume buttons
      document.addEventListener('click', (e) => {
        if (e.target.matches('.pause-timer')) {
          pauseExerciseTimer();
        } else if (e.target.matches('.resume-timer')) {
          resumeExerciseTimer();
        }
      });

      currentExerciseIndex++;
    } else {
      // Workout completed
      console.log('Workout completed');
    }
  };


  const handleRestPeriod = () => {
    handleNextExercise();
  };

  handleNextExercise();

  navigateTo('/workoutSession');
}

function viewWorkoutPageExerciseList(workout) {
  const workoutDetails = global.workoutExerciseDetails.filter(
    (details) => details.WORKOUT_ID === workout.WORKOUT_ID,
  );

  const exerciseList = document.createElement('ul');

  for (const exercise of workoutDetails) {
    const exerciseItem = document.createElement('li');
    const exerciseName = document.createElement('p');
    const exerciseDuration = document.createElement('p');
    const restDuration = document.createElement('p');

    exerciseName.textContent = exercise.EXERCISE_NAME;
    exerciseDuration.textContent = `Exercise Duration: ${exercise.EXERCISE_DURATION} secs`;
    restDuration.textContent = `Rest Duration: ${exercise.REST_DURATION} secs`;

    exerciseItem.append(exerciseName, exerciseDuration, restDuration);
    exerciseList.append(exerciseItem);
  }

  return exerciseList;
}

// Function to view a selected workout
function viewWorkout(workout) {
  global.viewWorkoutButtons.innerHTML = '';
  console.log(workout);
  global.currentWorkout = workout;

  const startWorkoutBtn = document.createElement('button');
  const editWorkoutBtn = document.createElement('button');
  const deleteWorkoutBtn = document.createElement('button');
  const exerciseHeading = document.createElement('h3');

  startWorkoutBtn.textContent = 'Start Workout';
  editWorkoutBtn.textContent = 'Edit Workout';
  deleteWorkoutBtn.textContent = 'Delete Workout';
  global.selectedWorkoutName.textContent = workout.WORKOUT_NAME;
  global.selectedWorkoutDesc.textContent = workout.DESCRIPTION;
  exerciseHeading.textContent = 'Exercises';

  startWorkoutBtn.addEventListener('click', () => startWorkout(workout));
  editWorkoutBtn.addEventListener('click', () => editWorkout(workout));
  deleteWorkoutBtn.addEventListener('click', async () => {
    await deleteWorkout(workout.WORKOUT_ID);
    navigateTo('/home');
  });

  global.viewWorkoutButtons.append(startWorkoutBtn, editWorkoutBtn, deleteWorkoutBtn);
  global.viewWorkoutPage.append(
    global.selectedWorkoutName,
    global.viewWorkoutButtons,
    global.selectedWorkoutDesc,
    exerciseHeading,
    viewWorkoutPageExerciseList(workout),
  );
  navigateTo('/viewWorkout');
}

// Function to show all workouts
function showAllWorkouts(workouts) {
  for (const workout of workouts) {
    const workoutTile = document.createElement('section');
    const workoutTileP = document.createElement('p');
    workoutTileP.textContent = workout.WORKOUT_NAME;
    workoutTile.append(workoutTileP);
    workoutTile.classList.add('workoutTiles');
    workoutTile.addEventListener('click', () => viewWorkout(workout));
    global.workoutList.append(workoutTile);
  }
}

// Function to fetch workouts
async function fetchWorkouts(id) {
  const response = await fetch(`data/profiles/workouts/${id}`);
  let workouts;
  let workoutExerciseDetails;
  if (response.ok) {
    ({ workouts, workoutExerciseDetails } = await response.json());

    // Save the current user ID in the global variable
    global.currentUserId = id;
    localStorage.setItem('currentUserId', id);

    fetchExercises();
    showAllWorkouts(workouts);
    global.workoutExerciseDetails = workoutExerciseDetails;
    console.log(workoutExerciseDetails, 'workout exercises');
    global.fetchWorkoutCheck = true;
    console.log(workouts, id, 'logged in');
  } else {
    console.log('You have to be online', response);
  }
}

// Function to get the new workout form
function getNewWorkoutForm() {
  const workoutExercises = Array.from(global.selectedExercises.children).map((exercise) => {
    const exerciseNameElement = exercise.querySelector('p');
    const exerciseName = exerciseNameElement.textContent.trim();
    const inputsAndSelects = exercise.querySelectorAll('input');
    const exerciseTimeInput = Number(inputsAndSelects[0].value);
    const restTimeInput = Number(inputsAndSelects[1].value);

    // Check if any of the values are empty
    if (!exerciseName || !exerciseTimeInput || !restTimeInput) {
      global.incompleteFormError.classList.remove('hide');
    } else {
      global.incompleteFormError.classList.add('hide');
      return { exerciseTimeInput, restTimeInput, exerciseName };
    }
    return null;
  });
  return workoutExercises;
}

// Function to verify the new workout
function verifyNewWorkout() {
  const workoutExercises = getNewWorkoutForm();

  // Calculate total workout duration in seconds
  const totalDuration = workoutExercises.reduce((sum, exercise) => sum + exercise.exerciseTimeInput + exercise.restTimeInput, 0);

  if (global.workoutName.value === '' || global.workoutDesc.value === '') {
    global.workoutDescError.classList.remove('hide');
  } else if (workoutExercises.length !== 0 && workoutExercises !== null) {
    if (totalDuration <= 3600) {
      global.workoutDescError.classList.add('hide');
      const payload = {
        workoutName: global.workoutName.value,
        workoutDesc: global.workoutDesc.value,
        workoutExercises,
        totalDuration,
      };
      return payload;
    } else {
      global.workoutTimeError.classList.remove('hide');
    }
  } else if (workoutExercises.length === 0) {
    global.noExercisesError.classList.remove('hide');
  }
}

// Function to create a new workout
async function saveWorkout(id, payload) {
  // Set editWorkoutID explicitly
  payload.editWorkoutID = global.editWorkoutID || null;

  if (payload) {
    const response = await fetch(`data/profiles/workouts/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, editWorkoutID: payload.editWorkoutID }),
    });

    if (response.ok) {
      const newWorkout = await response.json();
      console.log(id, newWorkout);
      navigateTo('/home');
      global.editWorkoutID = null;
    } else {
      console.log('failed to create workout', response);
    }
  }
}

// Function to edit a workout
function editWorkout(workout) {
  global.editWorkoutID = workout.WORKOUT_ID;
  global.workoutName.value = workout.WORKOUT_NAME;
  global.workoutDesc.value = workout.DESCRIPTION;
  global.selectedExercises.innerHTML = '';

  const workoutDetails = global.workoutExerciseDetails.filter(
    (details) => details.WORKOUT_ID === workout.WORKOUT_ID,
  );

  workoutDetails.forEach((exercise) => {
    const exerciseSection = selectExercise(exercise.EXERCISE_NAME);
    const inputs = exerciseSection.querySelectorAll('input');
    inputs[0].value = exercise.EXERCISE_DURATION;
    inputs[1].value = exercise.REST_DURATION;
  });

  navigateTo('/createWorkout');
}

async function deleteWorkout(workoutId) {
  const response = await fetch(`data/profiles/workouts/${global.currentUserId}/${workoutId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    console.log('workout deleted', workoutId);
    navigateTo('/home');
    location.reload(true);
  } else {
    console.log('failed to delete workout', response);
  }
}

// Function to show the profile list
function showProfileList(profiles) {
  for (const profile of profiles) {
    const btn = document.createElement('button');
    btn.textContent = profile.USERNAME;
    btn.classList.add('savedProfileBtn');
    btn.dataset.profileId = profile.PROFILE_ID;
    btn.addEventListener('click', async () => {
      const profileId = btn.dataset.profileId;
      await fetchWorkouts(profileId);
      handleHomeSection();
    });
    global.profileList.append(btn);
  }
}

// Function to verify input
function verifyInput() {
  if (global.profileName.value === '') {
    return false;
  }
  return true;
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

      const sampleWorkout = sample.sampleWorkouts;
      await saveWorkout(newProfile.PROFILE_ID, sampleWorkout);

      await fetchWorkouts(newProfile.PROFILE_ID);
      handleHomeSection();
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

// Function to show navigation bar if a user is logged in
function showNavBar() {
  global.navBar.classList.remove('hide');
}

// Function to log out
function logOut() {
  localStorage.removeItem('currentUserId');
}

// Function to warn the user before reloading
function warnBeforeReload(event) {
  const currentRoute = location.pathname;
  if (currentRoute === '/viewWorkout' || currentRoute === '/workoutSession' || currentRoute === '/createWorkout') {
    const confirmMessage = 'Reloading this page will reset your selected workout. Are you sure you want to reload?';
    event.returnValue = confirmMessage; // For most browsers
    return confirmMessage; // For some older browsers
  }
}


// Function to prepare handles
function prepareHandles() {
  global.showNewWorkoutBtn = document.querySelector('.showNewWorkout');
  global.workoutName = document.querySelector('#workoutName');
  global.workoutDesc = document.querySelector('#workoutDesc');
  global.saveWorkoutBtn = document.querySelector('#saveWorkoutBtn');
  global.workoutList = document.querySelector('.workoutList');
  global.searchWorkout = document.querySelector('#searchWorkout');

  global.viewWorkoutPage = document.querySelector('#viewWorkout');
  global.viewWorkoutButtons = document.querySelector('.viewWorkoutButtons');
  global.selectedWorkoutName = document.querySelector('.selectedWorkoutName');
  global.selectedWorkoutDesc = document.querySelector('.selectedWorkoutDesc');

  global.workoutSessionSection = document.querySelector('#workoutSession');
  global.timerSection = document.querySelector('#timerSection');
  global.timerValue = document.querySelector('.timerValue');
  global.timeLabel = document.querySelector('.timeLabel');

  global.newProfileBtn = document.querySelector('#newProfileBtn');
  global.profileName = document.querySelector('#profileName');
  global.profileList = document.querySelector('.profileList');
  global.profileError = document.querySelector('.profileError');
  global.logoutBtn = document.querySelector('.logoutBtn');

  global.exerciseList = document.querySelector('.exerciseList');
  global.selectMuscle = document.querySelector('#muscleFilter');
  global.searchExercise = document.querySelector('#searchExercise');
  global.selectedExercises = document.querySelector('.selectedExercises');
  global.clearExercises = document.querySelector('#clearExercises');

  global.workoutDescError = document.querySelector('.workoutDescError');
  global.noExercisesError = document.querySelector('.noExercisesError');
  global.incompleteFormError = document.querySelector('.incompleteFormError');
  global.workoutTimeError = document.querySelector('.workoutTimeError');

  global.timerSection = document.querySelector('#timerSection');
  global.timerValue = document.querySelector('.timerValue');
  global.timerLabel = document.querySelector('.timerLabel');
}

// Function to add event listeners
function addEventListeners() {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  global.saveWorkoutBtn.addEventListener('click', () => {
    const payload = verifyNewWorkout();
    saveWorkout(global.currentUserId, payload);
  });

  if (global.currentWorkoutID) {
    global.deleteWorkoutBtn.addEventListener('click', () => deleteWorkout(global.currentWorkoutID));
  }

  global.newProfileBtn.addEventListener('click', createProfile);
  global.logoutBtn.addEventListener('click', logOut);

  global.selectMuscle.addEventListener('change', muscleFilter);
  global.searchExercise.addEventListener('input', () => searchList(global.searchExercise.value, global.exerciseList));
  global.searchWorkout.addEventListener('input', () => searchList(global.searchWorkout.value, global.workoutList));
  global.clearExercises.addEventListener('click', clearExercises);
}

// Event listener for popstate event
window.addEventListener('popstate', router);

// Function to be called when the page is loaded
function pageLoaded() {
  router();
  prepareHandles();
  addEventListeners();
  fetchAllProfiles();
  window.addEventListener('beforeunload', warnBeforeReload);
}

// Call the pageLoaded function when the page is loaded
pageLoaded();
