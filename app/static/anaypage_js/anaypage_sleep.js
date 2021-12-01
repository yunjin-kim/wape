import { setSleepChart, sleepWeekNum, setSleepDataAverage } from './anaypage.js';
import { date } from './anaypage_step.js';
//현재 수면 모달
const $noSleepDiv = document.querySelector(".anaypage__nosleep__current");
export function showSleepModal(e) {
  const sleepModalDiv = document.createElement('div');
  const sleepTitle = document.createElement('h3');
  const sleepModalClose = document.createElement('button');
  const sleepInput = document.createElement('input');
  const sleepSubmitBtn = document.createElement('button');
  let currnetSleep;
  sleepModalDiv.classList.add("sleepModal")
  sleepTitle.classList.add("weightModalTitle")
  sleepModalClose.classList.add("sleepModalClose")
  sleepInput.classList.add("sleepInput")
  sleepSubmitBtn.classList.add("sleepSubmitBtn")
  sleepTitle.textContent = "수면 시간";
  sleepModalClose.textContent = "X";
  sleepSubmitBtn.textContent = "시간 입력";
  sleepInput.setAttribute('type','number')
  sleepInput.setAttribute('placeholder', '7시간30분 = 7.3')
  sleepModalClose.addEventListener('click', () => {
    sleepModalDiv.remove()
  })
  sleepInput.addEventListener('change', (e) => {
    currnetSleep = e.target.value;
  })
  sleepSubmitBtn.addEventListener('click', () => {
    const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
    const parseTotalSleepData = JSON.parse(getTotalSleepData);
    $noSleepDiv.classList.add("hiddenDiv")
    parseTotalSleepData[0][0][2] = currnetSleep;
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify(parseTotalSleepData))
    sleepModalDiv.remove()
    rangeSleepData()
    setCurrentSleep()
    setSleepChart(sleepWeekNum)
    setSleepDataAverage(sleepWeekNum)
  })
  sleepModalDiv.append(sleepTitle)
  sleepModalDiv.append(sleepModalClose)
  sleepModalDiv.append(sleepInput)
  sleepModalDiv.append(sleepSubmitBtn)
  e.target.parentNode.parentNode.parentNode.parentNode.append(sleepModalDiv)
}

//현재 수면 설정
export function setCurrentSleep() {
  const $currnetSleep = document.querySelector(".currnetSleep");
  const $sleepDiv = document.querySelector(".anaypage__sleep__current");
  const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  const parseTotalSleepData = JSON.parse(getTotalSleepData);

  if (parseTotalSleepData) {
    if (parseTotalSleepData[0][0][2] === "") {
      $noSleepDiv.classList.remove("hiddenDiv")
      $sleepDiv.classList.add("hiddenDiv")
      $noSleepDiv.innerHTML = `<span class="noWeight">수면 시간을 적어주세요</span>`;
    } else {
      $sleepDiv.classList.remove("hiddenDiv")
      $currnetSleep.textContent = `${parseTotalSleepData[0][0][2]}`;
    }
  } else {
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
  const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  const parseTotalSleepData = JSON.parse(getTotalSleepData);
  let onToday = date.getDate();
  let dateNum  = onToday + 1;
  let monthNum = thisMonth;
  let sleepDataArrNum = 0;
  if (parseTotalSleepData) { //로컬에 데이터가 있다면
    if (parseTotalSleepData[0][0][1] !== onToday) { //오늘 날짜와 다르다면
      console.log("다음날이 되었다");
      
      for (let i = 0; i < 28; i++) {
        dateNum -= 1;
        if (dateNum === 0) {
          dateNum = prevLastDate;
          monthNum = lastMonth;
        }
        sleepDataArr[sleepDataArrNum].push([monthNum, dateNum, ""]);
        if (sleepDataArr[sleepDataArrNum].length === 7) {
          sleepDataArrNum++;
        }
      }

      const sleepDataArrFlat = sleepDataArr.flat();
      const parseTotalSleepDataFlat = parseTotalSleepData.flat();

      let localPoint = 0;
      let dataPoint = 0;
      while (localPoint < 27 || dataPoint < 27) {
        if (parseTotalSleepDataFlat[0][0] < sleepDataArrFlat[dataPoint][0]) { //로컬 첫번재 값의 달보다 새로만든 배열의 달이 더 크다
          dataPoint++;
        } else if (parseTotalSleepDataFlat[localPoint][0] === sleepDataArrFlat[dataPoint][0] && parseTotalSleepDataFlat[localPoint][1] !== sleepDataArrFlat[dataPoint][1] ) {
          //달은 같으나 날짜가 다르다
          dataPoint++;
        } else if (parseTotalSleepDataFlat[localPoint][0] === sleepDataArrFlat[dataPoint][0] && parseTotalSleepDataFlat[localPoint][1] === sleepDataArrFlat[dataPoint][1]) {
          sleepDataArrFlat[dataPoint][2] = parseTotalSleepDataFlat[localPoint][2];
          dataPoint++;
          localPoint++;
        }
        console.log(localPoint, dataPoint)
      }
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(sleepDataArr));
    }
  } else if (!parseTotalSleepData) { //로컬에 데이터 없다면 초기 상태
    for (let i = 0; i < 28; i++) {
      dateNum -= 1;
      if (dateNum === 0) {
        dateNum = prevLastDate;
        monthNum = lastMonth;
      }
      sleepDataArr[sleepDataArrNum].push([monthNum, dateNum, ""]);
      if (sleepDataArr[sleepDataArrNum].length === 7) {
        sleepDataArrNum++;
      }
    }
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify(sleepDataArr));
  }
}

//수면 날짜 세팅
export function setSleepDate(sleepBoxArr, sleepWeekNum){
  const weekNumArr = [];
  const onToday = date.getDate();
  let lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  let todayDate = onToday;
  todayDate -= sleepWeekNum * 7;
  if (todayDate <= 0) {
    todayDate = lastMonthDate + todayDate;
  }
  // _.go(
  //   _.range(1, 7),
  //   _.map(a => )
  // )
  //range 로 바꾸기 애매
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
  for (let [weekNum, sleepDiv] of _.zip(weekNumArr, sleepBoxArr)) {
    sleepDiv.id = weekNum;
  }
}

//수면 차트 값 넣어주기
export function setSleepChartHeight(sleepBoxArr, sleepWeekNum) {
  const reverseSleepBoxArr = sleepBoxArr.slice().reverse();
  const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  const parseTotalSleepData = JSON.parse(getTotalSleepData);
  for (const [sleepData, sleepDiv] of _.zip(parseTotalSleepData[sleepWeekNum], reverseSleepBoxArr)) {
    sleepData[2] > 0 
    ? (sleepDiv.children[1].style.height = `${sleepData[2]*10}px`,
    sleepDiv.children[0].textContent = `${sleepData[2]}`)
    : (sleepDiv.children[1].style.height = "0px",
    sleepDiv.children[0].textContent = "");
  }
}
