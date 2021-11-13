import { setSleepChart, sleepWeekNum, setSleepDataAverage } from './anaypage.js';
import { date } from './anaypage_step.js';

let onToday = date.getDate();

//현재 수면 모달
const $noSleepDiv = document.querySelector(".anaypage__nosleep__current");
export function showSleepModal(e) {
  const measureDay = new Date().getDate();

  const sleepModalDiv = document.createElement('div');
  sleepModalDiv.classList.add("sleepModal")

  const sleepTitle = document.createElement('h3');
  sleepTitle.classList.add("weightModalTitle");
  sleepTitle.textContent = "수면 시간";
  sleepModalDiv.append(sleepTitle);

  const sleepModalClose = document.createElement('button');
  sleepModalClose.textContent = "X";
  sleepModalClose.classList.add("sleepModalClose")
  sleepModalDiv.append(sleepModalClose);
  sleepModalClose.addEventListener('click', () => {
    sleepModalDiv.remove();
  });

  let currnetSleep;
  const sleepInput = document.createElement('input');
  sleepInput.classList.add("sleepInput");
  sleepInput.setAttribute('type','number');
  sleepInput.setAttribute('placeholder', '7시간30분 = 7.3');
  sleepModalDiv.append(sleepInput);
  sleepInput.addEventListener('change', (e) => {
    currnetSleep = e.target.value;
  })

  const sleepSubmitBtn = document.createElement('button');
  sleepSubmitBtn.classList.add("sleepSubmitBtn");
  sleepSubmitBtn.textContent = "시간 입력";

  sleepSubmitBtn.addEventListener('click', () => {
    let getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
    let parseTotalSleepData = JSON.parse(getTotalSleepData);

    parseTotalSleepData[0][0][2] = currnetSleep;
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify(parseTotalSleepData));

    sleepModalDiv.remove();
    $noSleepDiv.classList.add("hiddenDiv");
    
    rangeSleepData();
    setCurrentSleep();
    setSleepChart(sleepWeekNum);
    setSleepDataAverage(sleepWeekNum);
  });
  
  sleepModalDiv.append(sleepSubmitBtn);
  e.target.parentNode.parentNode.parentNode.parentNode.append(sleepModalDiv);
}

//현재 수면 설정
export function setCurrentSleep() {
  const $currnetSleep = document.querySelector(".currnetSleep");
  const $sleepDiv = document.querySelector(".anaypage__sleep__current");
  const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  const parseTotalSleepData = JSON.parse(getTotalSleepData);

  if(parseTotalSleepData) {
    if(parseTotalSleepData[0][0][2] === "") {
      $noSleepDiv.classList.remove("hiddenDiv");
      $sleepDiv.classList.add("hiddenDiv");
      $noSleepDiv.innerHTML = `<span class="noWeight">수면 시간을 적어주세요</span>`;
    }
    else {
      $sleepDiv.classList.remove("hiddenDiv");
      $currnetSleep.textContent = `${parseTotalSleepData[0][0][2]}`;
    }
  }
  else {
    $noSleepDiv.classList.remove("hiddenDiv");
    $sleepDiv.classList.add("hiddenDiv");
    $noSleepDiv.innerHTML = `<span class="noWeight">수면시간을 적어주세요</span>`;
  }
}

export function rangeSleepData() {
  const sleepDataArr = [[], [], [], []];
  const date = new Date();
  const thisYear = date.getFullYear();
  const lastMonth = date.getMonth();
  const thisMonth = lastMonth + 1;
  const prevLast = new Date(thisYear, lastMonth, 0)
  const prevLastDate = prevLast.getDate();
  let dateNum  = onToday + 1;
  let monthNum = thisMonth;
  let sleepDataArrNum = 0;
  let getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  let parseTotalSleepData = JSON.parse(getTotalSleepData);
  
  if(parseTotalSleepData) { //로컬에 데이터가 있다면
    if(parseTotalSleepData[0][0][1] !== onToday) { //오늘 날짜와 다르다면
      console.log("다음날이 되었다");
      for(let i = 0; i < 28; i++) {
        dateNum -= 1;
        if(dateNum === 0) {
          dateNum = prevLastDate;
          monthNum = lastMonth;
        }
        sleepDataArr[sleepDataArrNum].push([monthNum, dateNum, ""]);
        if(sleepDataArr[sleepDataArrNum].length === 7) {
          sleepDataArrNum++;
        }
      }
      let sleepDataArrFlat = sleepDataArr.flat();
      let parseTotalSleepDataFlat = parseTotalSleepData.flat();

      let localPoint = 0;
      let dataPoint = 0;
      while(localPoint < 27 || dataPoint < 27) {
        if(parseTotalSleepDataFlat[0][0] < sleepDataArrFlat[dataPoint][0]) { //로컬 첫번재 값의 달보다 새로만든 배열의 달이 더 크다
          dataPoint++;
        }
        else if(parseTotalSleepDataFlat[localPoint][0] === sleepDataArrFlat[dataPoint][0] && parseTotalSleepDataFlat[localPoint][1] !== sleepDataArrFlat[dataPoint][1] ) {
          //달은 같으나 날짜가 다르다
          dataPoint++;
        }
        else if(parseTotalSleepDataFlat[localPoint][0] === sleepDataArrFlat[dataPoint][0] && parseTotalSleepDataFlat[localPoint][1] === sleepDataArrFlat[dataPoint][1]) {
          sleepDataArrFlat[dataPoint][2] = parseTotalSleepDataFlat[localPoint][2];
          dataPoint++;
          localPoint++;
        }
      }
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(sleepDataArr));
    }
  }
  else if(!parseTotalSleepData) { //로컬에 데이터 없다면 초기 상태
    for(let i = 0; i < 28; i++) {
      dateNum -= 1;
      if(dateNum === 0) {
        dateNum = prevLastDate;
        monthNum = lastMonth;
      }
      sleepDataArr[sleepDataArrNum].push([monthNum, dateNum, ""]);
      if(sleepDataArr[sleepDataArrNum].length === 7) {
        sleepDataArrNum++;
      }
    }
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify(sleepDataArr));
  }
}

//수면 날짜 세팅
export function setSleepDate(sleepBoxArr, sleepWeekNum){
  let lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  
  let oneMonthDateArr = [];
  let todayDate = onToday;
  todayDate -= sleepWeekNum*7;
  if(todayDate < 0) todayDate = lastMonthDate + todayDate;
  for(let i = 0; i <= 7; i++){
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

//수면 차트 값 넣어주기
export function setSleepChartHeight(sleepBoxArr ,sleepWeekNum) {
  let reverseSleepBoxArr = sleepBoxArr.slice().reverse();

  let getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  let parseTotalSleepData = JSON.parse(getTotalSleepData);

  for(let i = 0; i < parseTotalSleepData[sleepWeekNum].length; i++) {
    if(parseTotalSleepData[sleepWeekNum][i][2] > 0) {
      reverseSleepBoxArr[i].children[1].style.height = `${parseTotalSleepData[sleepWeekNum][i][2]*10}px`;
      reverseSleepBoxArr[i].children[0].textContent = `${parseTotalSleepData[sleepWeekNum][i][2]}`;
    }
    else {
      reverseSleepBoxArr[i].children[1].style.height = "0px";
      reverseSleepBoxArr[i].children[0].textContent = "";
    }
  }
}
