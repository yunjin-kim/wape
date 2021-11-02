const googleTodayStepCountUrl = "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly";

export async function getData(){
  const data = await getTodayStepData();

  console.log(data)
}

async function getTodayStepData() {
  const response = await fetch("https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly");
  const data = await response.json();

  return data;
}

