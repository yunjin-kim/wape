//목표 체중 모달
const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");

export function showGoalWeihgtModal(e){
  const goalWeightModalDiv = document.createElement('div');
  goalWeightModalDiv.classList.add("goalWeightModal")

  const goalWeightTitle = document.createElement('h3');
  goalWeightTitle.classList.add("weightModalTitle");
  goalWeightTitle.innerText = "목표 체중"
  goalWeightModalDiv.append(goalWeightTitle);

  const goalWeightModalClose = document.createElement('button');
  goalWeightModalClose.innerText = "X";
  goalWeightModalClose.classList.add("goalWeightModalClose")
  goalWeightModalDiv.append(goalWeightModalClose);
  goalWeightModalClose.addEventListener('click',()=>{
    goalWeightModalDiv.remove();
  })

  const goalWeightInput = document.createElement('input');
  goalWeightInput.classList.add("goalWeightInput");
  goalWeightInput.setAttribute('type','number');
  goalWeightModalDiv.append(goalWeightInput);
  goalWeightInput.addEventListener('change', (e)=>{
    localStorage.setItem("STEP_GOAL_WEIGHT", e.target.value);
  })

  const goalWeightSubmitBtn = document.createElement('button');
  goalWeightSubmitBtn.classList.add("goalWeightSubmitBtn");
  goalWeightSubmitBtn.innerText = "목표 설정";
  goalWeightSubmitBtn.addEventListener('click', ()=>{
    goalWeightModalDiv.remove();
    $noWeightGoalDiv.classList.add("hiddenDiv");
    setGoalWeight();
  });
  goalWeightModalDiv.append(goalWeightSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(goalWeightModalDiv);
}

export function setGoalWeight(){
  const $goalWeight = document.querySelector(".goalWeight");
  const $goalWeihgtDiv = document.querySelector(".anaypage__weight__accure");
  let getGoalWeight = localStorage.getItem("STEP_GOAL_WEIGHT");
  let parseGoalWeight = JSON.parse(getGoalWeight);

  if(parseGoalWeight){
    $goalWeihgtDiv.classList.remove("hiddenDiv");
    $goalWeight.textContent = `${parseGoalWeight}kg`;
  }
  else{
    $noWeightGoalDiv.classList.remove("hiddenDiv");
    $goalWeihgtDiv.classList.add("hiddenDiv");
    $noWeightGoalDiv.innerHTML = `<span class="NoWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}