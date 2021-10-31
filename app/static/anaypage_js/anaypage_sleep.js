import { onToday, lastMonthDate } from '../mainpage_js/mainpage_reserve.js';
import { setSleepChart, sleepWeekNum } from './anaypage.js';

//현재 수면 모달
const $noSleepDiv = document.querySelector(".anaypage__nosleep__current");
export function showSleepModal(e){
  const measureDay = new Date().getDate();

  const sleepModalDiv = document.createElement('div');
  sleepModalDiv.classList.add("sleepModal")

  const sleepTitle = document.createElement('h3');
  sleepTitle.classList.add("weightModalTitle");
  sleepTitle.textContent = "수면 시간"
  sleepModalDiv.append(sleepTitle);

  const sleepModalClose = document.createElement('button');
  sleepModalClose.textContent = "X";
  sleepModalClose.classList.add("sleepModalClose")
  sleepModalDiv.append(sleepModalClose);
  sleepModalClose.addEventListener('click',()=>{
    sleepModalDiv.remove();
  })

  let currnetSleep;
  const sleepInput = document.createElement('input');
  sleepInput.classList.add("sleepInput");
  sleepInput.setAttribute('type','number');
  sleepInput.setAttribute('placeholder', '7시간30분 = 7.3')
  sleepModalDiv.append(sleepInput);
  sleepInput.addEventListener('change', (e)=>{
    currnetSleep = e.target.value;
  })

  const sleepSubmitBtn = document.createElement('button');
  sleepSubmitBtn.classList.add("sleepSubmitBtn");
  sleepSubmitBtn.textContent = "시간 입력";

  sleepSubmitBtn.addEventListener('click', ()=>{
    let getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
    let parseTotalSleepData = JSON.parse(getTotalSleepData);

  if(parseTotalSleepData){
    if(parseTotalSleepData[parseTotalSleepData.length - 2] === measureDay){
      console.log(parseTotalSleepData)
      parseTotalSleepData.pop();
      parseTotalSleepData.pop();
      console.log(parseTotalSleepData)
      console.log(parseTotalSleepData.concat([measureDay, currnetSleep]))
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(parseTotalSleepData.concat([measureDay, currnetSleep])));
    }
  }
  else{
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify([measureDay, currnetSleep]));
  }
  sleepModalDiv.remove();
  $noSleepDiv.classList.add("hiddenDiv");

  rangeSleepData();
  setCurrentSleep();
  setSleepChart(sleepWeekNum);
  });
  
  sleepModalDiv.append(sleepSubmitBtn);
  e.target.parentNode.parentNode.parentNode.parentNode.append(sleepModalDiv);
}

//현재 수면 설정
export function setCurrentSleep(){
  const $currnetSleep = document.querySelector(".currnetSleep");
  const $sleepDiv = document.querySelector(".anaypage__sleep__current");
  let getSleep = localStorage.getItem("CURRENT_SLEEP");
  let parseSleep = JSON.parse(getSleep);

  if(parseSleep){
    if(parseSleep[parseSleep.length - 1] === ""){
      $noSleepDiv.classList.remove("hiddenDiv");
      $sleepDiv.classList.add("hiddenDiv");
      $noSleepDiv.innerHTML = `<span class="noWeight">수면 시간을 적어주세요</span>`;
    }
    else{
      $sleepDiv.classList.remove("hiddenDiv");
      $currnetSleep.textContent = `${parseSleep[parseSleep.length-1]}`;
    }

  }
  else{
    $noSleepDiv.classList.remove("hiddenDiv");
    $sleepDiv.classList.add("hiddenDiv");
    $noSleepDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
  }
}

export let sleepDataArr = [[], [], [], []];
// 들어왔는데 체중을 입력하지 않으면 그래프에서 해당 날짜가 밀리기 때문에 입력하지 않으면 빈값으로 넣어주기
//그러나 앱 자체를 들어오지 않는다면?
// 오랜만에 들어온다? -> 로컬에 있는 데이터 로칼 길이 -2 값을 찾는다 -> 찾은 값 +1 부터 오늘 날짜까지 -> 날짜,"" 이렇게 넣어준다
//근데 만약에 안 들어온 날짜가 29일이고 다시 들어온 날짜가 2일 이라면 -> 로컬 -2 데이터가 오늘 날짜 보다 크다면 -> 로컬 -2에서 저번달 마지막 날짜까지하고 1일부터 오늘 날짜까지 넣어준다
export function rangeSleepData(){
  let getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  let parseTotalSleepData = JSON.parse(getTotalSleepData);

  if(!parseTotalSleepData ){
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify([onToday, ""]));
  }

  if(parseTotalSleepData){
    let isSleepToday = parseTotalSleepData.find((date)=> date === onToday)

    if(!isSleepToday){
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(parseTotalSleepData.concat([onToday, ""])));
    }
    let reverseSleepData = parseTotalSleepData.reverse();
    
    let sleepDataArrNum = 0;
    sleepDataArr = [[], [], [], []];
    for(let i = 0; i < 56; i++){
      if(!reverseSleepData[i]) reverseSleepData[i] = "";
      sleepDataArr[sleepDataArrNum].push(reverseSleepData[i]);
        if(sleepDataArr[sleepDataArrNum].length > 13) sleepDataArrNum++;
        if(sleepDataArrNum === 4) break;
    }
  }
  else{
    console.log("데이터 없다")
  }
}

//체중 날짜 세팅 
export function setWeightDate(sleepBoxArr, sleepWeekNum){
  
  let oneMonthDateArr = [];
  let todayDate = onToday;
  todayDate -= sleepWeekNum*7;
  for(let i = 0; i <= 29; i++){
    let date = todayDate - i;
    if(date === 0){
      for(let j = 0; j <= 30 - oneMonthDateArr.length; j++){
        oneMonthDateArr.push(lastMonthDate - j);
      }
      break;
    } 
    oneMonthDateArr.push(date);
  }

  for(let i = 0; i < 7; i++){
    sleepBoxArr[6-i].id = oneMonthDateArr[i];
  }
}

//체중 차트 값 넣어주기
export function setSleepChartHeight(sleepBoxArr ,sleepWeekNum){
  let reverseSleepBoxArr = sleepBoxArr.slice().reverse()
  let divPoint = 0;
  let dataPoint = 0;
  
  if(sleepDataArr[0].length > 0){

    while(divPoint !== reverseSleepBoxArr.length){
      if(Number(reverseSleepBoxArr[divPoint].id) === (sleepDataArr[sleepWeekNum][dataPoint])){
        reverseSleepBoxArr[divPoint].children[1].style.height = `${sleepDataArr[sleepWeekNum][dataPoint-1]*10}px`;
        reverseSleepBoxArr[divPoint].children[0].textContent = sleepDataArr[sleepWeekNum][dataPoint-1];
        divPoint++;
        dataPoint++;
      }
      else{
        reverseSleepBoxArr[divPoint].children[1].style.height = "7px";
        reverseSleepBoxArr[divPoint].children[0].textContent = "";

        if(sleepDataArr[sleepWeekNum][dataPoint] === ""){
          if(sleepDataArr[sleepWeekNum][dataPoint-1] === ""){//날짜값도 ""고 체중값도 ""라면 초기에 데이터 없을 때
            divPoint++;
          }
          else{
            dataPoint++;
          }
        }
        else if(sleepDataArr[sleepWeekNum][dataPoint] < 32 && sleepDataArr[sleepWeekNum][dataPoint] === "string"){
            divPoint++
        }
        else{
          dataPoint++
        }
      }
      if(divPoint > 30 || dataPoint > 30){
        break;
      }
    }
  }
  else{
    console.log("데이터 없다")
  }
}