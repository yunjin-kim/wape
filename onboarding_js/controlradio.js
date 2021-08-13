const $container = document.querySelector('.container');
const $onboardingForm = document.querySelector('.onboarding__bar__radio');
const $influScreen = document.querySelector('.onboarding-influ');
const $earnScreen = document.querySelector('.onboarding-earn');
const $mapScreen = document.querySelector('.onboarding-map');
const $planScreen = document.querySelector('.onboarding-plan');
const $loginScreen = document.querySelector('.onboarding-login');

$container.style.width = `${screen.width * 5}px`;
$influScreen.style.width = `${screen.width}px`;
$earnScreen.style.width = `${screen.width}px`;
$mapScreen.style.width = `${screen.width}px`;
$planScreen.style.width = `${screen.width}px`;
$loginScreen.style.width = `${screen.width}px`;

$influScreen.style.height = `${screen.height * 0.7}px`;
$earnScreen.style.height = `${screen.height * 0.7}px`;
$mapScreen.style.height = `${screen.height * 0.7}px`;
$planScreen.style.height = `${screen.height * 0.7}px`;
$loginScreen.style.height = `${screen.height * 0.7}px`;


$onboardingForm.addEventListener('click',(event)=>{
  if(event.target.classList.contains('inputInflu')){
    $container.style.left = "0px";
  }
  else if(event.target.classList.contains('inputEarn')){
    $container.style.left = `${-screen.width}px`;
  }
  else if(event.target.classList.contains('inputMap')){
    $container.style.left = `${-screen.width*2}px`;
  }
  else if(event.target.classList.contains('inputPlan')){
    $container.style.left = `${-screen.width*3}px`;
  }
  else if(event.target.classList.contains('inputLogin')){
    $container.style.left = `${-screen.width*4.07}px`;
  }
})

const radioArr = [];
for(let i = 0; i < $onboardingForm.childNodes.length; i++){
  if(radioArr.length > 5){
    radioArr.pop();
  }
  radioArr.push($onboardingForm.childNodes[2*(i)+1]);
}

let radioNum = 0;
let pageNum = 0;
let containerLeft = 0;
let startLeft, endLeft;
$container.addEventListener('touchstart', touchStart);
$container.addEventListener('touchend', touchEnd);

function prevPage(){
  if(pageNum > 0){
    containerLeft += screen.width;
    $container.style.left = `${containerLeft}px`;
    pageNum--;
    radioNum--;
  }
}

function nextPage(){
  if(pageNum < 4){
    containerLeft -= screen.width;
    $container.style.left = `${containerLeft}px`;
    pageNum++;
    radioNum++;
  }
}

function touchStart(event){
  startLeft = event.touches[0].pageX;
}

function touchEnd(event){
  endLeft = event.changedTouches[0].pageX;
  if(startLeft > endLeft){
    nextPage()
  }else{
    prevPage();
  }
  radioArr[radioNum].checked = "checked";
}