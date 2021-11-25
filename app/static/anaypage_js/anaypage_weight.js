import { setWeightChart, weightWeekNum, untilGoalWeight } from './anaypage.js';

//목표 체중 모달
const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");
export function showGoalWeihgtModal(e) {
  const goalWeightModalDiv = document.createElement('div');
  goalWeightModalDiv.classList.add("goalWeightModal");

  const goalWeightTitle = document.createElement('h3');
  goalWeightTitle.classList.add("goalWeightModalTitle");
  goalWeightTitle.textContent = "목표 체중";
  goalWeightModalDiv.append(goalWeightTitle);

  const goalWeightModalClose = document.createElement('button');
  goalWeightModalClose.textContent = "X";
  goalWeightModalClose.classList.add("goalWeightModalClose");
  goalWeightModalDiv.append(goalWeightModalClose);
  goalWeightModalClose.addEventListener('click', () => {
    goalWeightModalDiv.remove();
  })

  let goalWeight;
  const goalWeightInput = document.createElement('input');
  goalWeightInput.classList.add("goalWeightInput");
  goalWeightInput.setAttribute('type','number');
  goalWeightModalDiv.append(goalWeightInput);
  goalWeightInput.addEventListener('change', (e) => {
    goalWeight = e.target.value;
  })

  const goalWeightSubmitBtn = document.createElement('button');
  goalWeightSubmitBtn.classList.add("goalWeightSubmitBtn");
  goalWeightSubmitBtn.textContent = "목표 설정";
  goalWeightSubmitBtn.addEventListener('click', () => {
    localStorage.setItem("GOAL_WEIGHT", goalWeight);
    goalWeightModalDiv.remove();
    $noWeightGoalDiv.classList.add("hiddenDiv");
    setGoalWeight();
  });
  goalWeightModalDiv.append(goalWeightSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(goalWeightModalDiv);
}

//목표 체중 설정
export function setGoalWeight() {
  const $goalWeight = document.querySelector(".goalWeight");
  const $goalWeihgtDiv = document.querySelector(".anaypage__weight__accure");
  let getGoalWeight = localStorage.getItem("GOAL_WEIGHT");
  let parseGoalWeight = JSON.parse(getGoalWeight);

  if (parseGoalWeight) {
    $goalWeihgtDiv.classList.remove("hiddenDiv");
    $goalWeight.textContent = `${parseGoalWeight}kg`;
  }
  else {
    $noWeightGoalDiv.classList.remove("hiddenDiv");
    $goalWeihgtDiv.classList.add("hiddenDiv");
    $noWeightGoalDiv.innerHTML = `<span class="noWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}

//현재 체중 모달
const $noWeightDiv = document.querySelector(".anaypage__noweight__current");
export function showWeihgtModal(e) {
  const measureDay = new Date().getDate();

  const weightModalDiv = document.createElement('div');
  weightModalDiv.classList.add("weightModal")

  const weightTitle = document.createElement('h3');
  weightTitle.classList.add("weightModalTitle");
  weightTitle.textContent = "현재 체중";
  weightModalDiv.append(weightTitle);

  const weightModalClose = document.createElement('button');
  weightModalClose.textContent = "X";
  weightModalClose.classList.add("weightModalClose")
  weightModalDiv.append(weightModalClose);
  weightModalClose.addEventListener('click', () => {
    weightModalDiv.remove();
  })

  let currnetWeight;
  const weightInput = document.createElement('input');
  weightInput.classList.add("weightInput");
  weightInput.setAttribute('type','number');
  weightModalDiv.append(weightInput);
  weightInput.addEventListener('change', (e) => {
    currnetWeight = e.target.value;
  })

  const weightSubmitBtn = document.createElement('button');
  weightSubmitBtn.classList.add("weightSubmitBtn");
  weightSubmitBtn.textContent = "체중 입력";

  weightSubmitBtn.addEventListener('click', () => {
    let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
    let parseTotalWeightData = JSON.parse(getTotalWeightData);

    parseTotalWeightData[0][0][2] = currnetWeight;
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData))
  
    weightModalDiv.remove();
    $noWeightDiv.classList.add("hiddenDiv");

    setCurrentWeight();
    rangeWeightData();
    setWeightChart(weightWeekNum);
    untilGoalWeight();
  });
  
  weightModalDiv.append(weightSubmitBtn);
  e.target.parentNode.parentNode.parentNode.parentNode.append(weightModalDiv);
}

//현재 체중 설정
export function setCurrentWeight() {
  const $currnetWeight = document.querySelector(".currnetWeight");
  const $weightDiv = document.querySelector(".anaypage__weight__current");
  let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  if (parseTotalWeightData) {
    if (parseTotalWeightData[0][0][2] === "") {
      $noWeightDiv.classList.remove("hiddenDiv");
      $weightDiv.classList.add("hiddenDiv");
      $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
    }
    else {
      $weightDiv.classList.remove("hiddenDiv");
      $currnetWeight.textContent = `${parseTotalWeightData[0][0][2]}kg`;
    }
  }
  else {
    $noWeightDiv.classList.remove("hiddenDiv");
    $weightDiv.classList.add("hiddenDiv");
    $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
  }
}

export function setuntilGoalWeight() {
  const getWeight = localStorage.getItem("GOAL_WEIGHT");
  const parseWeight = JSON.parse(getWeight);
  const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  const parseTotalWeightData = JSON.parse(getTotalWeightData);

  return parseTotalWeightData[0][0][2]-parseWeight;
}

// 체중 데이터 로직
export function rangeWeightData() {
  const weightDataArr = [[], [], [], []];
  const date = new Date();
  const thisYear = date.getFullYear();
  const lastMonth = date.getMonth();
  const thisMonth = lastMonth + 1;
  const prevLast = new Date(thisYear, lastMonth, 0)
  const prevLastDate = prevLast.getDate();
  let dateNum  = date.getDate()+1;
  let monthNum = thisMonth;
  let weightDataArrNum = 0;
  let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);
  
  if (parseTotalWeightData) { //로컬에 데이터가 있다면
    if (parseTotalWeightData[0][0][1] !== date.getDate()) { //오늘 날짜와 다르다면
      console.log("다음날이 되었다")
      for (let i = 0; i < 28; i++) {
        dateNum -= 1;
        if (dateNum === 0) {
          dateNum = prevLastDate;
          monthNum = lastMonth;
        }
        weightDataArr[weightDataArrNum].push([monthNum, dateNum, ""]);
        if (weightDataArr[weightDataArrNum].length === 7) {
          weightDataArrNum++;
        }
      }
      const weightDataArrFlat = weightDataArr.flat();
      const parseTotalWeightDataFlat = parseTotalWeightData.flat();

      let localPoint = 0;
      let dataPoint = 0;
      while (dataPoint < 27 || localPoint < 27) {

        if (parseTotalWeightDataFlat[0][0] < weightDataArrFlat[dataPoint][0]) { //로컬 첫번재 값의 달보다 새로만든 배열의 달이 더 크다
          dataPoint++;
        }
        else if (parseTotalWeightDataFlat[localPoint][0] === weightDataArrFlat[dataPoint][0] && parseTotalWeightDataFlat[localPoint][1] !== weightDataArrFlat[dataPoint][1] ) {
          //달은 같으나 날짜가 다르다
          dataPoint++;
        }
        else if (parseTotalWeightDataFlat[localPoint][0] === weightDataArrFlat[dataPoint][0] && parseTotalWeightDataFlat[localPoint][1] === weightDataArrFlat[dataPoint][1]) {
          weightDataArrFlat[dataPoint][2] = parseTotalWeightDataFlat[localPoint][2];
          dataPoint++;
          localPoint++;
        }
      }
      localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(weightDataArr));
    }
  }
  else if (!parseTotalWeightData) { //로컬에 데이터 없다면 초기 상태
    for (let i = 0; i < 28; i++) {
      dateNum -= 1;
      if (dateNum === 0) {
        dateNum = prevLastDate;
        monthNum = lastMonth;
      }
      weightDataArr[weightDataArrNum].push([monthNum, dateNum, ""]);
      if (weightDataArr[weightDataArrNum].length === 7) {
        weightDataArrNum++;
      }
    }
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(weightDataArr));
  }
}

//체중 날짜
export function setWeightDate(weightBoxArr, weightWeekNum) {
  const date = new Date();
  const oneMonthDateArr = [];
  let todayDate = date.getDate();
  const lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  todayDate -= weightWeekNum*7;
  
  if (todayDate < 0) todayDate = lastMonthDate + todayDate;
  for (let i = 0; i <= 29; i++) {
    let date = todayDate - i;
    if (date === 0) {
      for (let j = 0; j <= 30 - oneMonthDateArr.length; j++) {
        oneMonthDateArr.push(lastMonthDate - j);
      }
      break;
    } 
    oneMonthDateArr.push(date);
  }
  for (let i = 0; i < 7; i++) {
    weightBoxArr[6-i].id = oneMonthDateArr[i];
  }
}

//체중 차트 값 넣어주기
export function setWeightChartHeight(weightBoxArr, weightWeekNum) {
  const reverseWeightBoxArr = weightBoxArr.slice().reverse();
  const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  const parseTotalWeightData = JSON.parse(getTotalWeightData);

  for (let i = 0; i < parseTotalWeightData[weightWeekNum].length; i++) {
    if (parseTotalWeightData[weightWeekNum][i][2] > 0) {
      reverseWeightBoxArr[i].children[1].style.height = `${parseTotalWeightData[weightWeekNum][i][2]}px`;
      reverseWeightBoxArr[i].children[0].textContent = `${parseTotalWeightData[weightWeekNum][i][2]}`;
    }
    else {
      reverseWeightBoxArr[i].children[1].style.height = "0px";
      reverseWeightBoxArr[i].children[0].textContent = "";
    }
  }
}

export function setUserBmi() {
  const $userBmi = document.querySelector(".userBmi");
  const getHeihgtFromLocal = localStorage.getItem("USER_HEIGHT");
  const parseHeight = JSON.parse(getHeihgtFromLocal);
  const getWeightFromLocal = localStorage.getItem("CURRENT_WEIGHT");
  const parseWeightFromLocal = JSON.parse(getWeightFromLocal);
  
  $userBmi.textContent = parseInt((parseWeightFromLocal[0][0][2]) / (parseHeight/100)**2);
}