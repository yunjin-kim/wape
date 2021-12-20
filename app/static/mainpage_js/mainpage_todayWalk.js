// 에러처리에서 중요하게 생각한 것 에러가 일어난 함수에서 더 이상 코드가 진행되지 않게 에러난 부분에서 멈춰!
const googleTodayStepCountUrl = "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly";

export async function getTodayStepApi() {
  try {
    const response = await fetch(googleTodayStepCountUrl);
    const data = await response.json();
    getTodayStepData(data);
  } catch (e) {
    todayStepDataErrorModal();
    console.log(e);
  }
}

function todayStepDataErrorModal() {
  const $todayStepTitle = document.querySelector(".mainpage__today__title");
  const todayStepErrorModalDiv = document.createElement('div');
  const todayStepErrorModalText = document.createElement('p');
  todayStepErrorModalDiv.classList.add("todayStepErrorModal");
  todayStepErrorModalText.classList.add("todayStepErrorModalText");
  todayStepErrorModalText.innerHTML = "걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";
  todayStepErrorModalDiv.append(todayStepErrorModalText);
  $todayStepTitle.append(todayStepErrorModalDiv);
}

function getTodayStepData(data) {
  const $todayStepWrap = document.querySelector(".mainpage__today__main");
  if(!data.error && data.steps_count.length > 0) {
    showTodayStepData(data.steps_count);
  } else if (data.error === 1) {
    todayStepDataErrorModal();
  } else {
    const noTodayStepDataText = document.createElement('p');
    noTodayStepDataText.textContent = "오늘 걸은 데이터가 없습니다";
    noTodayStepDataText.classList.add("noTodayStepDataText");
    $todayStepWrap.append(noTodayStepDataText);
  }
}

function showTodayStepData(stepData) {
  const $todayWalkWrap = document.querySelector(".mainpage__today__main");
  const $todayStepWrap = document.querySelector(".mainpage__today__main");
  // const $todayWalkLine = document.getElementById("mainpage__today__line");
  // const walkLine = $todayWalkLine.getContext("2d");
  
  // walkLine.beginPath();
  // walkLine.lineWidth = 1;
  // walkLine.strokeStyle = "gray";
  // walkLine.moveTo(0, 110);

  // walkLine.bezierCurveTo(10, 130, 120, 50, 150, 56);

  // walkLine.bezierCurveTo(180, 50, 240, 110, 300, 112);

  // walkLine.bezierCurveTo(330, 130, 360, 50, 450, 56);

  $todayWalkWrap.style.width = `${stepData.length*120}px`; //100
  // $todayWalkLine.style.width = `1500px`;
  // $todayWalkLine.style.height = "18vh";
  // console.log(stepData.length)

  for(let i = 0; i < stepData.length; i++) {
    const stepDataDott = document.createElement('div');
    const dottStepText = document.createElement('span')
    const dottStartTimeText = document.createElement('span')
    const dottEndTimeText = document.createElement('span')
    stepDataDott.classList.add("stepDataDott");
    dottStepText.classList.add("dottStepText");
    dottStartTimeText.classList.add("dottStartTimeText");
    dottEndTimeText.classList.add("dottEndTimeText");
    dottStepText.innerText = `${stepData[i].value}걸음`;
    dottStartTimeText.innerText = `${stepData[i].startTime.substring(12, 20)}`;
    dottEndTimeText.innerText = `${stepData[i].endTime.substring(12, 20)}`;

    stepDataDott.style.top = `${100-(i*6)}px`;
    dottStepText.style.top = `${86-(i*6)}px`;
    dottStartTimeText.style.top = `${110-(i*6)}px`;
    dottEndTimeText.style.top = `${120-(i*6)}px`;

    stepDataDott.style.left = `${i*120}px`;
    dottStepText.style.left = `${i*120}px`;
    dottStartTimeText.style.left = `${i*120}px`;
    dottEndTimeText.style.left = `${i*120}px`;
    $todayStepWrap.append(stepDataDott, dottStepText, dottStartTimeText, dottEndTimeText);
  }
  // walkLine.stroke();
}

export function showTodayWalkDate() {
  const date = new Date();
  const $todayWalkDate = document.querySelector(".mainpage__today__title__date");
  $todayWalkDate.textContent = (`${date.getMonth()+1}월 ${date.getDate()}일`)
}