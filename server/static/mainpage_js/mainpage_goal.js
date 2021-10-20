import { stepGoal, setGoalGraph } from './mainpage.js';

//목표 겅음 모달
export function showSetGoalModal(e){
  const modalDiv = document.createElement('div');
  modalDiv.classList.add("goalModal")

  const goalTitle = document.createElement('h3');
  goalTitle.classList.add("goalModalTitle");
  goalTitle.innerText = "목표 걸음 수"
  modalDiv.append(goalTitle);

  const modalClose = document.createElement('button');
  modalClose.innerText = "X";
  modalClose.classList.add("goalModalClose")
  modalDiv.append(modalClose);
  modalClose.addEventListener('click',()=>{
    modalDiv.remove();
  })

  const goalInput = document.createElement('input');
  goalInput.classList.add("goalInput");
  goalInput.setAttribute('type','number');
  modalDiv.append(goalInput);
  goalInput.addEventListener('change', (e)=>{
    localStorage.setItem("STEP_GOAL", e.target.value);
    stepGoal();
    setGoalGraph();
  })

  const goallSubmitBtn = document.createElement('button');
  goallSubmitBtn.classList.add("goalSubmitBtn");
  goallSubmitBtn.innerText = "목표 설정";
  goallSubmitBtn.addEventListener('click', ()=>{
    modalDiv.remove();
  });
  modalDiv.append(goallSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(modalDiv);
}

//오늘 걸음 데이터
export function getTodayStep(){
  const lastDateStepDataArr = localStorage.getItem("STEP_DATA");
  let lastDateStepData = JSON.parse(lastDateStepDataArr).steps_count[JSON.parse(lastDateStepDataArr).steps_count.length-2].value;
  return lastDateStepData;
}

//목표 걸음 수 그래프 
export function setStepGragh(){
  let myGoal = localStorage.getItem("STEP_GOAL");
  let goalGraphPercent = getTodayStep()/myGoal;

  return goalGraphPercent;
}