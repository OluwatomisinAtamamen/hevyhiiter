import * as sample from './sampleWorkouts.mjs';
// Global Variable
const global = {
  navBar: document.querySelector('.nav'),
};

/**
 * @function navigateTo
 * @description Function to navigate to a specific URL
 * @param {string} url - The URL to navigate to
 */
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

/**
 * @function hideAllSections
 * @description Function to hide all pages
 */
function hideAllSections() {
  document.querySelectorAll('.page').forEach(section => section.classList.add('hide'));
}

/**
 * @function showSection
 * @description Function to show a specific section
 * @param {string} selector - The CSS selector for the section to show
 */
function showSection(selector) {
  hideAllSections();
  document.querySelector(selector).classList.remove('hide');
}

/**
 * Handles the home section by checking if the user is logged in and fetching workouts if necessary.
 */
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

/**
 * Handles the login section by checking if the user is logged in and navigating to the home page if necessary.
 */
function handleLoginSection() {
  const currentUserId = localStorage.getItem('currentUserId');
  if (currentUserId) {
    global.currentUserId = currentUserId;
    navigateTo('/home');
  } else {
    showSection('#login');
  }
}

/**
 * Handles the create workout section by checking if the user is logged in and fetching exercises if necessary.
 */
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

/**
 * Handles the workout session section by checking if the user is logged in and a workout is selected.
 */
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

/**
 * Handles the view workout section by checking if the user is logged in and a workout is selected.
 */
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

/**
 * Router function to handle different routes.
 */
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


/**
 * Searches a list for a query and hides items that do not match the query.
 *
 * @param {string} query - The search query.
 * @param {HTMLElement} list - The list to search.
 */
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

/**
 * Clears the selected exercises.
 */
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

/**
 * Removes an exercise when the remove button is clicked.
 *
 * @param {Event} event - The click event.
 */
function removeExercise(event) {
  // Get the button that was clicked
  const removeBtn = event.target;

  // Get the parent section of the button
  const exerciseSection = removeBtn.parentNode;

  // Remove the section
  exerciseSection.remove();
}

/**
 * Selects an exercise and adds it to the selected exercises.
 *
 * @param {string} exerciseName - The name of the exercise to select.
 * @returns {HTMLElement} The selected exercise element.
 */
function selectExercise(exerciseName) {
  const selectedExercise = document.createElement('section');
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
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
  global.selectedExercises.classList.add('groupedExercises');

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

/**
 * Shows all exercises in the exercise list.
 *
 * @param {Array} exercises - An array of exercise objects.
 */
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

/**
 * Fetches exercises by muscle group from the server.
 *
 * @param {string} muscleName - The name of the muscle group.
 */
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
    global.noInternet.classList.remove('hide');
  }
}

/**
 * Timer class for managing exercise and rest intervals.
 */
class Timer {
  /**
     * Creates a new Timer.
     * @param {number} duration - The duration of the timer in seconds.
     * @param {boolean} isExercise - Whether the timer is for an exercise (true) or rest (false).
     * @param {function} callback - The function to call when the timer reaches zero.
     */
  constructor(duration, isExercise, callback) {
    this.duration = duration;
    this.isExercise = isExercise;
    this.callback = callback;
    this.remainingTime = duration;
    this.timerInterval = null;
    this.isPaused = false;
  }

  updateTimer() {
    global.timerSection.classList.remove('hide');
    global.timerValue.textContent = this.remainingTime + ' secs';
    global.timerLabel.textContent = this.isExercise ? 'Exercise' : 'Rest';
  }


  startTimer() {
    this.updateTimer();
    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      global.timerValue.textContent = this.remainingTime + ' secs';

      if (this.remainingTime === 0) {
        this.stopTimer();
        this.callback();
      }
    }, 1000);
  }


  pauseTimer() {
    clearInterval(this.timerInterval);
    this.isPaused = true;
  }


  resumeTimer() {
    if (this.isPaused) {
      this.startTimer();
      this.isPaused = false;
    }
  }


  stopTimer() {
    clearInterval(this.timerInterval);
  }
}


/**
 * @function startWorkout
 * @description Function to start a countdown timer
 * @param {Object} workout - The workout object containing exercise details
 */
function startWorkout(workout) {
  const workoutDetails = global.workoutExerciseDetails.filter(
    (details) => details.WORKOUT_ID === workout.WORKOUT_ID,
  );
  console.log(workoutDetails, 'workout details');

  let currentExerciseIndex = 0;

  // Clear the workout session section
  global.workoutSessionSection.innerHTML = '';

  // Create elements for the workout session
  const workoutSessionName = document.createElement('section');
  workoutSessionName.classList.add('workoutSessionName');
  workoutSessionName.textContent = workout.WORKOUT_NAME;

  global.exerciseDesc = document.createElement('p');
  global.exerciseName = document.createElement('h3');

  const workoutSessionDesc = document.createElement('section');
  workoutSessionDesc.classList.add('workoutSessionDesc');
  workoutSessionDesc.textContent = workout.DESCRIPTION;

  const timerControlsSection = document.createElement('section');
  timerControlsSection.classList.add('timerControls');

  const pauseButton = document.createElement('button');
  pauseButton.textContent = 'Pause';
  pauseButton.classList.add('pause-timer');

  const resumeButton = document.createElement('button');
  resumeButton.textContent = 'Resume';
  resumeButton.classList.add('resume-timer');

  timerControlsSection.append(pauseButton, resumeButton);

  global.workoutSessionSection.append(
    workoutSessionName,
    workoutSessionDesc,
    global.timerSection,
    global.exerciseDesc,
    timerControlsSection,
  );

  // Start countdown before the first exercise
  startCountdown(5, () => {
    handleNextExercise();
  });

  const handleNextExercise = () => {
    if (currentExerciseIndex < workoutDetails.length) {
      const { EXERCISE_NAME, EXERCISE_DURATION, REST_DURATION, DESCRIPTION } =
        workoutDetails[currentExerciseIndex];

      // Update the timer label with the exercise name
      global.timerLabel.textContent = EXERCISE_NAME;

      global.exerciseSessionArray = [EXERCISE_NAME, DESCRIPTION];
      appendExerciseDetails(global.exerciseSessionArray);

      // Start the exercise timer
      const exerciseTimer = new Timer(
        EXERCISE_DURATION,
        true,
        () => handleRestPeriod(REST_DURATION),
        handleNextExercise,
      );
      exerciseTimer.startTimer();

      // Add event listeners for pause and resume buttons
      pauseButton.addEventListener('click', exerciseTimer.pauseTimer.bind(exerciseTimer));
      resumeButton.addEventListener('click', exerciseTimer.resumeTimer.bind(exerciseTimer));

      currentExerciseIndex++;
    } else {
      global.workoutSessionSection.innerHTML = '';
      global.workoutSessionSection.textContent = 'Workout Completed';
    }
  };

  const handleRestPeriod = (restDuration) => {
    // Start the rest timer
    const restTimer = new Timer(restDuration, false, handleNextExercise);
    restTimer.startTimer();

    // Add event listeners for pause and resume buttons
    pauseButton.addEventListener('click', restTimer.pauseTimer.bind(restTimer));
    resumeButton.addEventListener('click', restTimer.resumeTimer.bind(restTimer));
  };

  navigateTo('/workoutSession');
}

/**
 * Appends exercise details to the workout session section.
 *
 * @param {Array} exerciseDetails - An array containing the exercise name and description.
 */
function appendExerciseDetails(exerciseDetails) {
  global.exerciseName.textContent = '';
  global.exerciseDesc.textContent = '';
  const exerciseSession = document.createElement('section');

  exerciseSession.innerHTML = '';

  global.exerciseName.textContent = exerciseDetails[0];
  global.exerciseDesc.textContent = exerciseDetails[1];

  exerciseSession.append(global.exerciseName, global.exerciseDesc);
  global.workoutSessionSection.append(exerciseSession);
}

/**
 * Starts a countdown timer.
 *
 * @param {number} duration - The duration of the countdown in seconds.
 * @param {Function} callback - The function to call when the countdown reaches zero.
 */
function startCountdown(duration, callback) {
  let remainingTime = duration;
  let countdownInterval;

  function updateCountdown() {
    global.timerSection.classList.remove('hide');
    global.timerValue.textContent = remainingTime + ' secs';
    global.timerLabel.textContent = 'Get Ready';

    countdownInterval = setInterval(() => {
      remainingTime--;
      global.timerValue.textContent = remainingTime + ' secs';

      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        callback();
      }
    }, 1000);
  }

  updateCountdown();
}

/**
 * @function calculateExerciseDifficulty
 * @description Function to calculate the difficulty level of an exercise based on its duration
 * @param {number} exerciseDuration - The duration of the exercise in seconds
 * @returns {string} - The difficulty level of the exercise ('Easy', 'Medium', or 'Hard')
 */
function calculateExerciseDifficulty(exerciseDuration) {
  let difficultyLevel;
  if (exerciseDuration <= 45) {
    difficultyLevel = 'Easy';
  } else if (exerciseDuration >= 46 && exerciseDuration <= 60) {
    difficultyLevel = 'Medium';
  } else if (exerciseDuration > 60) {
    difficultyLevel = 'Hard';
  }
  return difficultyLevel;
}

/**
 * @function viewWorkoutPageExerciseList
 * @description Function to create an exercise list for a given workout
 * @param {Object} workout - The workout object containing exercise details
 * @returns {HTMLElement} - An unordered list element containing the exercise details
 */
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
    const exerciseDifficulty = document.createElement('p');
    const difficultyLevel = calculateExerciseDifficulty(exercise.EXERCISE_DURATION);

    exerciseName.textContent = exercise.EXERCISE_NAME;
    exerciseDuration.textContent = `Exercise Duration: ${exercise.EXERCISE_DURATION} secs`;
    restDuration.textContent = `Rest Duration: ${exercise.REST_DURATION} secs`;
    exerciseDifficulty.textContent = `Difficulty: ${difficultyLevel}`;

    exerciseItem.append(exerciseName, exerciseDifficulty, exerciseDuration, restDuration);
    exerciseList.append(exerciseItem);
  }

  return exerciseList;
}

/**
 * @function viewWorkout
 * @description Function to display the details of a selected workout
 * @param {Object} workout - The workout object to be displayed
 */
// Function to view a selected workout
function viewWorkout(workout) {
  global.viewWorkoutButtons.innerHTML = '';
  global.viewWorkoutPage.innerHTML = '';
  console.log(workout);
  global.currentWorkout = workout;

  const startWorkoutBtn = document.createElement('button');
  const editWorkoutBtn = document.createElement('button');
  const deleteWorkoutBtn = document.createElement('button');
  const exerciseHeading = document.createElement('h3');
  const totalTime = document.createElement('p');

  startWorkoutBtn.textContent = 'Start Workout';
  editWorkoutBtn.textContent = 'Edit Workout';
  deleteWorkoutBtn.textContent = 'Delete Workout';
  global.selectedWorkoutName.textContent = workout.WORKOUT_NAME;
  global.selectedWorkoutDesc.textContent = workout.DESCRIPTION;
  exerciseHeading.textContent = 'Exercises';
  totalTime.textContent = `Total Time: ${workout.WORKOUT_DURATION} secs`;

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
    totalTime,
    exerciseHeading,
    viewWorkoutPageExerciseList(workout),
  );
  navigateTo('/viewWorkout');
}

/**
 * @function showAllWorkouts
 * @description Function to display all available workouts
 * @param {Array} workouts - An array of workout objects
 */
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

/**
 * @function fetchWorkouts
 * @description Function to fetch workouts from the server
 * @param {string} id - The user ID for which to fetch workouts
 */
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
    global.noInternet.classList.remove('hide');
  }
}

/**
 * @function fetchWorkouts
 * @description Function to fetch workouts from the server
 * @param {string} id - The user ID for which to fetch workouts
 */
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

/**
 * @function verifyNewWorkout
 * @description Function to verify the new workout form data
 * @returns {Object|null} - An object containing the workout details, or null if the form is incomplete
 */
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

/**
 * @function saveWorkout
 * @description Function to save a new or edited workout
 * @param {string} id - The user ID for which to save the workout
 * @param {Object} payload - An object containing the workout details
 */
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
      global.noInternet.classList.remove('hide');
    }
  }
}


/**
 * @function editWorkout
 * @description Function to edit an existing workout
 * @param {Object} workout - The workout object to be edited
 */
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

/**
 * @function deleteWorkout
 * @description Function to delete a workout
 * @param {string} workoutId - The ID of the workout to be deleted
 */
async function deleteWorkout(workoutId) {
  const response = await fetch(`data/profiles/workouts/${global.currentUserId}/${workoutId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    console.log('workout deleted', workoutId);
    navigateTo('/home');
    location.reload(true);
  } else {
    global.noInternet.classList.remove('hide');
  }
}

/**
 * @function showProfileList
 * @description Function to display a list of user profiles
 * @param {Array} profiles - An array of user profile objects
 */
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

/**
 * @function verifyInput
 * @description Function to verify the input value for creating a new profile
 * @returns {boolean} - True if the input value is valid, false otherwise
 */
function verifyInput() {
  if (global.profileName.value === '') {
    return false;
  }
  return true;
}

/**
 * @function createProfile
 * @description Function to create a new user profile
 */
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
  }
}

/**
 * @function fetchAllProfiles
 * @description Function to fetch all user profiles from the server
 */
async function fetchAllProfiles() {
  const response = await fetch('data/profiles');
  let profiles;
  if (response.ok) {
    profiles = await response.json();
  } else {
    global.noInternet.classList.remove('hide');
  }
  showProfileList(profiles);
  global.profileArray = profiles;
  console.log(global.profileArray, 'all profiles');
}

/**
 * @function fetchAllProfiles
 * @description Function to fetch all user profiles from the server
 */
function showNavBar() {
  global.navBar.classList.remove('hide');
  global.navBar.classList.add('navShow');
}

/**
 * @function logOut
 * @description Function to log out the current user
 */
function logOut() {
  localStorage.removeItem('currentUserId');
}

/**
 * @function warnBeforeReload
 * @description Function to warn the user before reloading the page
 * @param {Event} event - The beforeunload event object
 * @returns {string} - A message to be displayed in the confirmation dialog
 */
function warnBeforeReload(event) {
  const currentRoute = location.pathname;
  if (currentRoute === '/viewWorkout' || currentRoute === '/workoutSession' || currentRoute === '/createWorkout') {
    const confirmMessage = 'Reloading this page will reset your selected workout. Are you sure you want to reload?';
    event.returnValue = confirmMessage; // For most browsers
    return confirmMessage; // For some older browsers
  }
}


/**
 * @function prepareHandles
 * @description Function to prepare handles for DOM elements
 */
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

  global.noInternet = document.querySelector('.noInternet');
}

/**
 * @function addEventListeners
 * @description Function to add event listeners
 */
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

/**
 * @function pageLoaded
 * @description Function to be called when the page is loaded
 */
function pageLoaded() {
  router();
  prepareHandles();
  addEventListeners();
  fetchAllProfiles();
  window.addEventListener('beforeunload', warnBeforeReload);
}

// Call the pageLoaded function when the page is loaded
pageLoaded();
