import { setWeightChart, untilGoalWeight } from './anaypage.js';
import { groupBySize, L } from '../fx.js';

//목표 체중 모달
export function showGoalWeihgtModal(e) {
  const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");
  const goalWeightModalDiv = document.createElement('div');
  const goalWeightTitle = document.createElement('h3');
  const goalWeightModalClose = document.createElement('button');
  const goalWeightInput = document.createElement('input');
  const goalWeightSubmitBtn = document.createElement('button');
  let goalWeight;
  goalWeightModalDiv.classList.add("goalWeightModal");
  goalWeightTitle.classList.add("goalWeightModalTitle");
  goalWeightModalClose.classList.add("goalWeightModalClose");
  goalWeightInput.classList.add("goalWeightInput");
  goalWeightSubmitBtn.classList.add("goalWeightSubmitBtn");
  goalWeightTitle.textContent = "목표 체중";
  goalWeightModalClose.textContent = "X";
  goalWeightSubmitBtn.textContent = "목표 설정";
  goalWeightInput.setAttribute('type','number');
  goalWeightModalClose.addEventListener('click', () => {
    goalWeightModalDiv.remove();
  })
  goalWeightInput.addEventListener('change', (e) => {
    goalWeight = e.target.value;
  })
  goalWeightSubmitBtn.addEventListener('click', () => {
    localStorage.setItem("GOAL_WEIGHT", goalWeight);
    goalWeightModalDiv.remove();
    $noWeightGoalDiv.classList.add("hiddenDiv");
    untilGoalWeight();
    setGoalWeight();
  });
  goalWeightModalDiv.append(goalWeightTitle, goalWeightModalClose, goalWeightInput, goalWeightSubmitBtn);
  e.target.parentNode.parentNode.parentNode.parentNode.append(goalWeightModalDiv);
}

//목표 체중 설정
export function setGoalWeight() {
  const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");
  const $goalWeight = document.querySelector(".goalWeight");
  const $goalWeihgtDiv = document.querySelector(".anaypage__weight__accure");
  const getGoalWeight = localStorage.getItem("GOAL_WEIGHT");
  const parseGoalWeight = JSON.parse(getGoalWeight);

  if (parseGoalWeight) {
    $goalWeihgtDiv.classList.remove("hiddenDiv");
    $goalWeight.textContent = `${parseGoalWeight}kg`;
  } else {
    $noWeightGoalDiv.classList.remove("hiddenDiv");
    $goalWeihgtDiv.classList.add("hiddenDiv");
    $noWeightGoalDiv.innerHTML = `<span class="noWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}

//현재 체중 모달
export function showWeihgtModal(e) {
  const $noWeightDiv = document.querySelector(".anaypage__noweight__current");
  const weightModalClose = document.createElement('button');
  const weightModalDiv = document.createElement('div');
  const weightTitle = document.createElement('h3');
  const weightInput = document.createElement('input');
  const weightSubmitBtn = document.createElement('button');
  weightModalDiv.classList.add("weightModal");
  weightTitle.classList.add("weightModalTitle");
  weightModalClose.classList.add("weightModalClose");
  weightInput.classList.add("weightInput");
  weightSubmitBtn.classList.add("weightSubmitBtn");
  weightModalClose.textContent = "X";
  weightTitle.textContent = "현재 체중";
  weightSubmitBtn.textContent = "체중 입력";
  weightInput.setAttribute('type','number');
  let currnetWeight;
  weightModalClose.addEventListener('click', () => {
    weightModalDiv.remove();
  })
  weightInput.addEventListener('change', (e) => {
    currnetWeight = e.target.value;
  })
  weightSubmitBtn.addEventListener('click', () => {
    const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
    let parseTotalWeightData = JSON.parse(getTotalWeightData);
    parseTotalWeightData[0][0][2] = currnetWeight;
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData));
    weightModalDiv.remove();
    $noWeightDiv.classList.add("hiddenDiv");
    setCurrentWeight($noWeightDiv);
    rangeWeightData();
    setWeightChart();
    untilGoalWeight();
    setUserBmi();
    setWeightChartHeight();
  });
  weightModalDiv.append(weightTitle, weightModalClose, weightInput, weightSubmitBtn);
  e.target.parentNode.parentNode.parentNode.parentNode.append(weightModalDiv);
}

//현재 체중 설정
export function setCurrentWeight() {
  const $noWeightDiv = document.querySelector(".anaypage__noweight__current");
  const $currnetWeight = document.querySelector(".currnetWeight");
  const $weightDiv = document.querySelector(".anaypage__weight__current");
  const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  if (parseTotalWeightData) {
    if (parseTotalWeightData[0][0][2] === "") {
      $noWeightDiv.classList.remove("hiddenDiv");
      $weightDiv.classList.add("hiddenDiv");
      $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
    } else {
      $weightDiv.classList.remove("hiddenDiv");
      $currnetWeight.textContent = `${parseTotalWeightData[0][0][2]}kg`;
    }
  } else {
    $noWeightDiv.classList.remove("hiddenDiv");
    $weightDiv.classList.add("hiddenDiv");
    $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
  }
}

// 체중 데이터 로직
export function rangeWeightData() {
  const date = new Date();
  const thisYear = date.getFullYear();
  const lastMonth = date.getMonth();
  const prevLast = new Date(thisYear, lastMonth, 0)
  const prevLastDate = prevLast.getDate();
  const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  const parseTotalWeightData = JSON.parse(getTotalWeightData);
  let todayDate = date.getDate();
  let thisMonth = lastMonth + 1;
  let monthWeightDataArr = [];

  _.go(
    L.range(Infinity),
    L.map(rangeNum => rangeNum == todayDate ? (thisMonth -= 1, rangeNum) : rangeNum),
    L.map(rangeNum => rangeNum >= todayDate 
          ? monthWeightDataArr.push([thisMonth, prevLastDate + todayDate - rangeNum]) 
          : monthWeightDataArr.push([thisMonth, todayDate - rangeNum])),
    _.take(28),
    _.map(rangeNum => monthWeightDataArr[rangeNum-1][2] = ""));

  monthWeightDataArr = _.go(
    monthWeightDataArr,
    _.map(weightData => weightData),
    groupBySize(7),
    _.values);
    
  if (parseTotalWeightData && parseTotalWeightData[0][0][1] !== date.getDate()) { //로컬에 데이터가 있다면 오늘 날짜와 다르다면
    console.log("다음날이 되었다")
    const monthWeightDataArrFlat = monthWeightDataArr.flat();
    const parseTotalWeightDataFlat = parseTotalWeightData.flat();

    _.go(
      parseTotalWeightDataFlat,
      _.filter(localWeightData => localWeightData[2] > 0),
      _.map(localWeightData => _.go(
        monthWeightDataArrFlat,
          _.filter(weightData => weightData[0] === localWeightData[0]),
          _.filter(weightData => weightData[1] === localWeightData[1]),
          _.map(weightData => weightData[2] = localWeightData[2]))));

    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(monthWeightDataArr));
  } else if (!parseTotalWeightData) { //로컬에 데이터 없다면 초기 상태
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(monthWeightDataArr));
  }
}

//체중 차트 값 넣어주기
export function setWeightChartHeight(weightWeekNum) {
  const reverseWeightBoxArr = setWeightChart().slice().reverse();
  const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  const parseTotalWeightData = JSON.parse(getTotalWeightData);
  if (!weightWeekNum) weightWeekNum = 0;

  console.log(parseTotalWeightData)
  console.log(reverseWeightBoxArr)
  for (let i = 0; i < parseTotalWeightData[weightWeekNum].length; i++) {
    if (parseTotalWeightData[weightWeekNum][i][2] > 0) {
      reverseWeightBoxArr[i].children[1].style.height = `${parseTotalWeightData[weightWeekNum][i][2]}px`;
      reverseWeightBoxArr[i].children[0].textContent = `${parseTotalWeightData[weightWeekNum][i][2]}`;
    } else {
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