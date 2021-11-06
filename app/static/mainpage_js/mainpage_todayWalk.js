const googleTodayStepCountUrl = "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly";
const $noTodayStepDataText = document.querySelector(".mainpage__today__main");

async function getTodayStepApi() {
  const response = await fetch(googleTodayStepCountUrl);
  const data = await response.json();
  console.log("API 호출")
  return data;
}

export async function getTodayStepData() {
  const data = await getTodayStepApi();

  if(data.steps_count.length > 0) {
    showTodayStepData(data.steps_count);
  }
  else{
    $noTodayStepDataText.textContent = "오늘 걸은 데이터가 없습니다";
  }
}

function showTodayStepData(stepData) {
  console.log(stepData)
  for(let i = 0; i < stepData.length; i++) {
    let stepDataDott = document.createElement('div');
    let dottStepText = document.createElement('span')
    let dottStartTimeText = document.createElement('span')
    let dottEndTimeText = document.createElement('span')
    stepDataDott.classList.add("stepDataDott");
    dottStepText.classList.add("dottStepText");
    dottStartTimeText.classList.add("dottStartTimeText");
    dottEndTimeText.classList.add("dottEndTimeText");
    dottStepText.innerText = `${stepData[i].value}걸음`;
    dottStartTimeText.innerText = `${stepData[i].startTime}`;
    dottEndTimeText.innerText = `${stepData[i].endTime}`;
    if(i%2 === 0) {
      stepDataDott.style.top = `${100}px`;
      dottStepText.style.top = `${86}px`;
      dottStartTimeText.style.top = `${105}px`;
      dottEndTimeText.style.top = `${115}px`;
    } 
    else if(i%2 === 1) {
      stepDataDott.style.top = `${50}px`;
      dottStepText.style.top = `${40}px`;
      dottStartTimeText.style.top = `${55}px`;
      dottEndTimeText.style.top = `${65}px`;
    } 
    stepDataDott.style.left = `${i*90}px`;
    dottStepText.style.left = `${i*90}px`;
    dottStartTimeText.style.left = `${i*90}px`;
    dottEndTimeText.style.left = `${i*90}px`;
    console.log(dottStepText)
    $noTodayStepDataText.append(stepDataDott, dottStepText, dottStartTimeText, dottEndTimeText);
  }
}