function addHandlers(){
  const firstloginBtn = document.querySelector('#login');
  firstloginBtn.addEventListener('click', loginHandler);

  const firstsignupBtn = document.querySelector('#signup');
  firstsignupBtn.addEventListener('click', signupHandler);
}

function loginHandler(){
  const introSec = document.querySelector('#intro');
  const loginSec = document.querySelector('#log_in');
  introSec.classList.add('hide');
  loginSec.classList.add('show');
}

function signupHandler(){
  const introSec = document.querySelector('#intro');
  const signupSec = document.querySelector('#sign_up');
  introSec.classList.add('hide');
  signupSec.classList.add('show');
}

window.addEventListener('load', addHandlers);