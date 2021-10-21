//목표 체중 모달
const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");

export function showGoalWeihgtModal(e){
  const goalWeightModalDiv = document.createElement('div');
  goalWeightModalDiv.classList.add("goalWeightModal")

  const goalWeightTitle = document.createElement('h3');
  goalWeightTitle.classList.add("goalWeightModalTitle");
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

//목표 체중 설정
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
    $noWeightGoalDiv.innerHTML = `<span class="noWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}

//현재 체중 모달
const $noWeightDiv = document.querySelector(".anaypage__noweight__current");

export function showWeihgtModal(e){
  const todayWeight = new Date().getDate();

  const weightModalDiv = document.createElement('div');
  weightModalDiv.classList.add("weightModal")

  const weightTitle = document.createElement('h3');
  weightTitle.classList.add("weightModalTitle");
  weightTitle.innerText = "현재 체중"
  weightModalDiv.append(weightTitle);

  const weightModalClose = document.createElement('button');
  weightModalClose.innerText = "X";
  weightModalClose.classList.add("weightModalClose")
  weightModalDiv.append(weightModalClose);
  weightModalClose.addEventListener('click',()=>{
    weightModalDiv.remove();
  })

  const weightInput = document.createElement('input');
  weightInput.classList.add("weightInput");
  weightInput.setAttribute('type','number');
  weightModalDiv.append(weightInput);
  weightInput.addEventListener('change', (e)=>{
    localStorage.setItem("STEP_CURRENT_WEIGHT", JSON.stringify([todayWeight, e.target.value]));
  })

  const weightSubmitBtn = document.createElement('button');
  weightSubmitBtn.classList.add("weightSubmitBtn");
  weightSubmitBtn.innerText = "현재 체중";
  weightSubmitBtn.addEventListener('click', ()=>{
    weightModalDiv.remove();
    $noWeightDiv.classList.add("hiddenDiv");
    setCurrentWeight();
  });
  weightModalDiv.append(weightSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(weightModalDiv);
}

//현재 체중 설정
export function setCurrentWeight(){
  const $currnetWeight= document.querySelector(".currnetWeight");
  const $weightDiv = document.querySelector(".anaypage__weight__current");
  let getWeight = localStorage.getItem("STEP_CURRENT_WEIGHT");
  let parseWeight = JSON.parse(getWeight);
  console.log(parseWeight)

  if(parseWeight){
    $weightDiv.classList.remove("hiddenDiv");
    $currnetWeight.textContent = `${parseWeight[1]}kg`;
  }
  else{
    $noWeightDiv.classList.remove("hiddenDiv");
    $weightDiv.classList.add("hiddenDiv");
    $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
  }
}