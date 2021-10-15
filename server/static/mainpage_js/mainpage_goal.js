import { stepGoal } from './mainpage.js';

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
  })

  const goadlSubmitBtn = document.createElement('button');
  goadlSubmitBtn.classList.add("goalSubmitBtn");
  goadlSubmitBtn.innerText = "목표 설정";
  goadlSubmitBtn.addEventListener('click', ()=>{
    modalDiv.remove();
  });
  modalDiv.append(goadlSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(modalDiv);
}