import { setWeightChart, untilGoalWeight } from './anaypage.js';
import { groupBySize, L } from '../fx.js';

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
    untilGoalWeight();
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
  } else {
    $noWeightGoalDiv.classList.remove("hiddenDiv");
    $goalWeihgtDiv.classList.add("hiddenDiv");
    $noWeightGoalDiv.innerHTML = `<span class="noWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}

//현재 체중 모달
export function showWeihgtModal(e) {
  const $noWeightDiv = document.querySelector(".anaypage__noweight__current");
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
  
  weightModalDiv.append(weightSubmitBtn);
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
    for (const [weightData, localWeightData] of _.zip(monthWeightDataArrFlat, parseTotalWeightDataFlat)) {
      if (weightData[0] === localWeightData[0] && weightData[1] === localWeightData[1]) {
        weightData[2] = localWeightData[2];
      } console.log(monthWeightDataArr) // 내일 잘 되는지 확인
    }
  } else if (!parseTotalWeightData) { //로컬에 데이터 없다면 초기 상태
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(monthWeightDataArr));
  }
}

//체중 날짜
export function setWeightDate(weightWeekNum) {
  const weekNumArr = [];
  const date = new Date();
  const lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  let todayDate = date.getDate();
  todayDate -= weightWeekNum*7;
  if (todayDate < 0) {
    todayDate = lastMonthDate + todayDate;
  }
  let i = 0;
  while (weekNumArr.length !== 7) {
    let date = todayDate - i;
    i++;
    if (date === 1) {
      todayDate = lastMonthDate;
      i = 0;
    } 
    weekNumArr.unshift(date);
  }
  for (let [weekNum, weightDiv] of _.zip(weekNumArr, setWeightChart())) {
    weightDiv.id = weekNum;
  }
}

//체중 차트 값 넣어주기
export function setWeightChartHeight(weightWeekNum) {
  const reverseWeightBoxArr = setWeightChart().slice().reverse();
  const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  const parseTotalWeightData = JSON.parse(getTotalWeightData);
  if (!weightWeekNum) weightWeekNum = 0;

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