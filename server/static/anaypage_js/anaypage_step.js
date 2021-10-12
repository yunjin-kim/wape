import { onToday } from '../mainpage_js/mainpage_reserve.js';
import { _filter } from '../fx.js';

const googleStepCountUrl = 'https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=30days';

//걸음수 api
//로컬스토리지에 걸음수를 저장해놯으니까 오늘 날짜랑 로컬스토리에 있는 데이터 날짜 값이랑 비교해서 오늘 날짜의 데이터가 없다면 그 때 url을 통해 불어올 수 있도록
export function onStepData(){
  let getStepDate = localStorage.getItem("STEP_DATA");
  let parseGetStepDate= JSON.parse(getStepDate);
  
  //로컬에 저장된 데이터가 없다면
  if(!parseGetStepDate){
    getGoogleStepCount(googleStepCountUrl);
  }

  //onToday 날짜랑 로컬 데이터의 endtime에 날짜랑 비교해서 onToday 날짜가 크면 데이터 새로 불러올 수 있게
  let localLastDate = parseGetStepDate.steps_count[29].endTime[0]+parseGetStepDate.steps_count[29].endTime[1];
  if(localLastDate < onToday){
    getGoogleStepCount(googleStepCountUrl);
  }
}



function getGoogleStepCount(googleStepCountUrl){
  return fetch(googleStepCountUrl)
  .then(response => response.json())
  .then(json => json)
  .catch(error => console.log('error', error));
};

getGoogleStepCount(googleStepCountUrl)
.then(json => {
  saveStepToLocal(json)
})
.catch(error => console.log('error', error));

//한달 주기로 데이터 저장하므로 concat은 하지 않는다
function saveStepToLocal(json){
  localStorage.setItem("STEP_DATA", JSON.stringify(json));
}