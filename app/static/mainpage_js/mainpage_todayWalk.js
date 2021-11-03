const googleTodayStepCountUrl = "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly";
const $noTodayStepDataText = document.querySelector(".mainpage__today__main");

async function getTodayStepData() {
  const response = await fetch("https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly");
  const data = await response.json();

  return data;
}

export async function getData(){
  const data = await getTodayStepData();

  if(data.length > 0){
    showTodayStepData(data);
  }
  else{
    $noTodayStepDataText.textContent = "오늘 걸은 데이터가 없습니다";
  }
}

function showTodayStepData(data){
  
}