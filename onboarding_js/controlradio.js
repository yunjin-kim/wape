const $wrapper = document.querySelector('.wrapper');
const $onboardingForm = document.querySelector('.onboarding__bar__radio');
const $influScreen = document.querySelector('.onboarding-influ');
const $earnScreen = document.querySelector('.onboarding-earn');
const $mapScreen = document.querySelector('.onboarding-map');
const $planScreen = document.querySelector('.onboarding-plan');
const $loginScreen = document.querySelector('.onboarding-login');

$influScreen.style.width = `${screen.width}px`;
$earnScreen.style.width = `${screen.width}px`;
$mapScreen.style.width = `${screen.width}px`;
$planScreen.style.width = `${screen.width}px`;
$loginScreen.style.width = `${screen.width}px`;


$onboardingForm.addEventListener('click',(event)=>{
  if(event.target.classList.contains('influ')){
    $wrapper.style.left = `0px`;
    console.log( $wrapper.style.left)
  }
  else if(event.target.classList.contains('earn')){
    $wrapper.style.left = `-${screen.width}px`;
    console.log( $wrapper.style.left)
  }
})

// function changePageToRadio(){
//   const form = document.onboradingform;
//   if(form.onboarding[0].checked === true){
//     form.action = 'onboarding_influ.html'
//   }
//   else if(form.onboarding[1].checked === true){
//     form.action = 'onboarding_earn.html'
//   }
//   form.submit();
// }