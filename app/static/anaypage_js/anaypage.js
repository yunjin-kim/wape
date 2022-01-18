//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
//날짜 세팅하고 버튼 클릭은 4개 다 같아서 나중에 다 구현하고 리펙토링해서 하나로
import AnayModal from './model/AnayModel.js';
import AnaySleepView from './views/AnaySleepView.js';
import AnayController from './controller/AnayController.js';
import AnayWeightView from './views/AnayWeightView.js';
import AnayGoalView from './views/AnayGoalView.js';
import AnayStepView from './views/AnayStepView.js';
import { groupBySize, add, L } from "../fx.js";

(function hasStepData() {
  setUsername();
  onStepData();
})();


document.addEventListener("DOMContentLoaded", anayMain);

function anayMain() {
  const anayModal = new AnayModal();

  const views = {
    anayStepView: new AnayStepView(),
    anaySleepView: new AnaySleepView(),
    anayWeightView: new AnayWeightView(),
    anayGoalView: new AnayGoalView(),
  };

  new AnayController(anayModal, views);
}

function setUsername() {
  const $anayUsername = document.querySelector(".anayUsername");
  // $anayUsername.textContent = getNameFromCookie();
}



 function hadStepData() {
  const stepDataArr = setStepDataArr();
  let weekNum = 0;
  setStepChart(weekNum, stepDataArr);
  chartButtonClickEvent(weekNum, stepDataArr);
}


 async function onStepData() {
  const googleStepCountUrl =
    "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=30days";
  try {
    const response = await fetch(googleStepCountUrl);
    const data = await response.json();
    setValidateData(data);
    console.log(data);
  } catch (e) {
    stepDataErrorModal();
    console.log(e);
  }
}

function setValidateData(data) {
  //12시에 들어오는 건 아님 10시 50분에도 들어온다  더 빨리 확인 필요
  const date = new Date();
  const lastStepDataDate =
    data.steps_count[data.steps_count.length - 1].endTime[0] +
    data.steps_count[data.steps_count.length - 1].endTime[1];
  if (lastStepDataDate < date.getDate()) {
    if (date.getHours() < 12) {
      showBeforeLunchModal();
    } else {
      showUpdateDataModal();
    }
  }
  saveStepToLocal(data);
}

function saveStepToLocal(data) {
  localStorage.setItem("STEP_DATA", JSON.stringify(data));
  hadStepData();
}

function stepDataErrorModal() {
  const $stepTitle = document.querySelector(".anaypage__walk__title");
  const stepErrorModalDiv = document.createElement("div");
  const stepErrorModalText = document.createElement("p");
  stepErrorModalDiv.classList.add("stepErrorModal");
  stepErrorModalText.classList.add("stepErrorModalText");
  stepErrorModalText.innerHTML =
    "걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";
  stepErrorModalDiv.append(stepErrorModalText);
  $stepTitle.append(stepErrorModalDiv);
}

function showBeforeLunchModal() {
  const $anaypageWalkTitle = document.querySelector(".anaypage__walk__title");
  const updateDataModalDiv = document.createElement("div");
  const updateDataModalClose = document.createElement("button");
  const updateDataTitle = document.createElement("h3");
  updateDataModalDiv.classList.add("updateDataModal");
  updateDataModalClose.classList.add("updateDataModalClose");
  updateDataTitle.classList.add("updateDataModalTitle");
  updateDataModalClose.textContent = "X";
  updateDataModalDiv.addEventListener("click", () => {
    updateDataModalDiv.remove();
  });
  updateDataTitle.innerHTML =
    "<p>당일 걸음 데이터 <br/>12시 이후에 <br/>확인할 수 있습니다</p>";
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataTitle);
  $anaypageWalkTitle.append(updateDataModalDiv);
}

//걸음 데이터가 동기화 되지 않음에 대한 모달
function showUpdateDataModal() {
  const $anaypageWalkTitle = document.querySelector(".anaypage__walk__title");
  const updateDataModalDiv = document.createElement("div");
  const updateDataModalClose = document.createElement("button");
  const updateDataTitle = document.createElement("h3");
  updateDataModalDiv.classList.add("updateDataModal");
  updateDataModalClose.classList.add("updateDataModalClose");
  updateDataTitle.classList.add("updateDataModalTitle");
  updateDataModalClose.textContent = "X";
  updateDataModalDiv.addEventListener("click", () => {
    updateDataModalDiv.remove();
  });
  updateDataTitle.innerHTML =
    "<p>걸음 데이터가 <br/>동기화 되지 않았습니다</p><br/><p>구글 피트니스 앱에서<br/>동기화 해주세요</p>";
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataTitle);
  $anaypageWalkTitle.append(updateDataModalDiv);
}



//배열에 걸음수 데이터 넣기
export function setStepDataArr() {
  const getStepDateFromLocal = localStorage.getItem("STEP_DATA");
  const parseStepDateFromLocal = JSON.parse(getStepDateFromLocal);
  let reserveStepDateFromLocal = parseStepDateFromLocal.steps_count.reverse();

  const chartDataArr = _.go(
    reserveStepDateFromLocal,
    _.map((stepData) => stepData),
    groupBySize(7),
    _.values,
    L.map((v) => v.reverse()),
    _.take(4)
  );

  return chartDataArr;
}

//걸음수 관련 처리
export function setStepChartHeight(chartBarArr, weekNum, stepDataArr) {
  // 걷기 데이터 높이 여기서 정함
  //다음날 되엇을 때 이걸로 오류 고쳐지는지 확인해보고 되면 flag로 다음날 되었을 때 한버만 실행되게 바꾸기
  let weekSumStep = 0;
  let monthSumStep = 0;
  let chartDataArrFlat = _.values(stepDataArr).flat();
  chartBarArr.map(
    (chartBar) => (
      (chartBar.children[0].textContent = "0px"),
      (chartBar.children[1].style.height = "0px")
    )
  );
  monthSumStep = _.reduce(
    add,
    _.map((v) => v.value, chartDataArrFlat)
  );
  weekSumStep = _.reduce(
    add,
    _.map((stepData) => stepData.value, stepDataArr[weekNum])
  );
  let charBarHeightDivide = parseInt(monthSumStep / 1200);

  for (const [chartBar, stepData] of _.zip(chartBarArr, stepDataArr[weekNum])) {
    chartBar.children[0].textContent = stepData.value;
    chartBar.children[1].style.height = `${
      stepData.value / charBarHeightDivide
    }px`;
  }

  setWeekStepData(weekSumStep);
  setWeekPercent(weekSumStep, stepDataArr);
}

//저번주 대비 퍼센트
function setWeekPercent(weekSumStep, stepDataArr) {
  const dataSumArr = _.go(
    _.entries(stepDataArr),
    _.map(([_, stepDataArr]) => stepDataArr),
    _.map((stepDataArr) =>
      _.go(
        stepDataArr,
        _.map((stepDataArr) => stepDataArr.value),
        _.reduce(add)
      )
    ),
    _.take(4)
  );
  let percentData = 0;

  for (let i = 0; i < dataSumArr.length; i++) {
    if (dataSumArr[i] === weekSumStep) {
      if (dataSumArr[i] > dataSumArr[i + 1]) {
        percentData = parseInt(
          ((dataSumArr[i] - dataSumArr[i + 1]) / dataSumArr[i]) * 100
        );
      } else if (dataSumArr[i] < dataSumArr[i + 1]) {
        percentData = parseInt((dataSumArr[i] / dataSumArr[i + 1] - 1) * 100);
      } else if (dataSumArr[i] === dataSumArr[i + 1]) {
        percentData = 0;
      } else if (i === 3) {
        percentData = "";
      }
    }
  }

  showWeekPercent(percentData);
}



//걸음수 주 평균, 총합
export function setWeekStepData(weekSumStep) {
  const $weekStepAverage = document.querySelector(".anaypage__walk__weekAverage");
  const $wekkStepSum = document.querySelector(".anaypage__walk__accure__weekValue");
  $weekStepAverage.textContent = parseInt(weekSumStep/7);
  $wekkStepSum.textContent = weekSumStep;
}

//걸음수 차트
export function setStepChart(weekNum, stepDataArr) {
  const $walkDataGraph = document.querySelector(".anaypage__walk__graph__box");
  const chartBarArr = _.filter(
    charBar => 
      charBar.classList.contains("anaypage__walk__graph__graph")
        ,$walkDataGraph.children
  )
  setStepChartHeight(chartBarArr, weekNum, stepDataArr);
}

//걸음수 차트 왼쪽 버튼
function chartButtonClickEvent(weekNum, stepDataArr) {
  const $stepChartLeftBtn = document.querySelector(".anaypage__walk__graph__left");
  $stepChartLeftBtn.addEventListener('click', () => {
    weekNum++;
    setStepChartBtn($stepChartLeftBtn, $stepChartRightBtn, weekNum);
    setStepChart(weekNum, stepDataArr);
  })
  
  //걸음수 차트 오른쪽 버튼
  const $stepChartRightBtn = document.querySelector(".anaypage__walk__graph__right");
  $stepChartRightBtn.addEventListener('click', () => {
    weekNum--;
    setStepChartBtn($stepChartLeftBtn, $stepChartRightBtn, weekNum);
    setStepChart(weekNum, stepDataArr);
  })
}

//걸음수 차트 버튼 show/hidden
function setStepChartBtn($stepChartLeftBtn, $stepChartRightBtn, weekNum) {
  if(weekNum == 3) {
    $stepChartLeftBtn.classList.add("hiddenButton");
  } else if(weekNum == 0) {
    $stepChartRightBtn.classList.add("hiddenButton");
  } else {
    $stepChartLeftBtn.classList.remove("hiddenButton");
    $stepChartRightBtn.classList.remove("hiddenButton");
  }
}

//저번주 대비 퍼센트
export function showWeekPercent(percentData) {
  const $weekDiffPercentWrap = document.querySelector(".anaypage__walk__accure__percent");
  const $weekDiffPercent = document.querySelector(".anaypage__walk__accure__weekPercent");
  const $stpPercentArrow = document.querySelector(".stepPercentArrow");
  if(percentData === "") {
    $weekDiffPercentWrap.style ="opacity: 0";
  } else {
    $weekDiffPercentWrap.style ="opacity: 1";
    if(percentData < 0) {
      $stpPercentArrow.style = "transform : rotate(180deg)";
    } else if(percentData > 0) {
      $stpPercentArrow.style = "transform : rotate(0deg)";
    }
  }
  $weekDiffPercent.textContent = percentData;
}

