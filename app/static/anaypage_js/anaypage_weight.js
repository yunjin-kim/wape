import { onToday, lastMonthDate } from '../mainpage_js/mainpage_reserve.js';
import { setWeightChart, weightWeekNum, untilGoalWeight } from './anaypage.js';

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

  if(parseGoalWeight) {
    $goalWeihgtDiv.classList.remove("hiddenDiv");
    $goalWeight.textContent = `${parseGoalWeight}kg`;
  }
  else {
    $noWeightGoalDiv.classList.remove("hiddenDiv");
    $goalWeihgtDiv.classList.add("hiddenDiv");
    $noWeightGoalDiv.innerHTML = `<span class="noWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}

//현재 체중 모달
const $noWeightDiv = document.querySelector(".anaypage__noweight__current");
export function showWeihgtModal(e) {
  const measureDay = new Date().getDate();

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
    let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
    let parseTotalWeightData = JSON.parse(getTotalWeightData);

    console.log(weightDataArr);

  // if(parseTotalWeightData) {
  //   if(parseTotalWeightData[parseTotalWeightData.length - 2] === measureDay) {
  //     parseTotalWeightData.pop();
  //     parseTotalWeightData.pop();
  //     localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData.concat([measureDay, currnetWeight])));
  //   }
  // }
  // else {
  //   localStorage.setItem("CURRENT_WEIGHT", JSON.stringify([measureDay, currnetWeight]));
  // }
  weightModalDiv.remove();
  $noWeightDiv.classList.add("hiddenDiv");

  rangeWeightData();
  setCurrentWeight();
  setWeightChart(weightWeekNum);
  untilGoalWeight();
  });
  
  weightModalDiv.append(weightSubmitBtn);
  e.target.parentNode.parentNode.parentNode.parentNode.append(weightModalDiv);
}

//현재 체중 설정
export function setCurrentWeight() {
  const $currnetWeight = document.querySelector(".currnetWeight");
  const $weightDiv = document.querySelector(".anaypage__weight__current");
  let getWeight = localStorage.getItem("CURRENT_WEIGHT");
  let parseWeight = JSON.parse(getWeight);

  if(parseWeight) {
    if(parseWeight[parseWeight.length - 1] === "") {
      $noWeightDiv.classList.remove("hiddenDiv");
      $weightDiv.classList.add("hiddenDiv");
      $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
    }
    else {
      $weightDiv.classList.remove("hiddenDiv");
      $currnetWeight.textContent = `${parseWeight[parseWeight.length-1]}kg`;
    }
  }
  else {
    $noWeightDiv.classList.remove("hiddenDiv");
    $weightDiv.classList.add("hiddenDiv");
    $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
  }
}

export function setuntilGoalWeight() {
  let getWeight = localStorage.getItem("GOAL_WEIGHT");
  let parseWeight = JSON.parse(getWeight);
  let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  // return parseTotalWeightData[parseTotalWeightData.length-1]-parseWeight;
}

export let weightDataArr = [[], [], [], []];
// 들어왔는데 체중을 입력하지 않으면 그래프에서 해당 날짜가 밀리기 때문에 입력하지 않으면 빈값으로 넣어주기
//그러나 앱 자체를 들어오지 않는다면?
// 체중 데이터 로직
export function rangeWeightData() {
  const date = new Date();
  const thisYear = date.getFullYear();
  const lastMonth = date.getMonth();
  const thisMonth = lastMonth + 1;
  const prevLast = new Date(thisYear, lastMonth, 0)
  const prevLastDate = prevLast.getDate();
  let dateNum  = onToday+1;
  let monthNum = thisMonth;
  let weightDataArrNum = 0;


  // 1. 로컬에서 데이터 먼저 불러옴
  // 2_1. 로컬에 데이터가 없다면 오늘 날짜를 시작으로 날짜 배열 만들기
  // 2_2. 로컬에 데이터가 있다면 2_2_1. 첫번째 데이터가 오늘 날짜라면 그냥 냅두기
  //                        2_2_2. 첫번째 데이터가 오늘 날짜가 아니라면 날짜 배열 새로 만들고 로컬에 있는 데이터랑 비교해서 값 넣어주기 
  //                        2_2_3. 다시 로컬에 데이터 집어넣기


  let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  console.log(parseTotalWeightData)
  

  if(parseTotalWeightData) { //로컬에 데이터가 있다면
    if(!weightDataArr[0][0] || weightDataArr[0][0][1] !== onToday) { //오늘 날짜와 다르다면
      for(let i = 0; i < 28; i++) {
        dateNum -= 1;
        if(dateNum === 0) {
          dateNum = prevLastDate;
          monthNum = lastMonth;
        }
        weightDataArr[weightDataArrNum].push([monthNum, dateNum, ""]);
        if(weightDataArr[weightDataArrNum].length === 7) {
          weightDataArrNum++;
        }
      }
      console.log(weightDataArr)

      let weightDataArrFlat = weightDataArr.flat();
      let parseTotalWeightDataFlat = parseTotalWeightData.flat();

      console.log(weightDataArrFlat[0])
      console.log(parseTotalWeightDataFlat[0])
      
      // 로컬에 있는 첫번째 값의 날짜와 새로 만든 배열 날짜의 값이 같은 부분만 찾으면 그 후는 그냥 쫙
      // 새로 만든 배열의 값이 클 수 밖에 없으므로 for문 하나로 끝낼 수 있음


      // let number = 0;
      // for(let i = 0; weightDataArrFlat.length; i++) {
      //   if(weightDataArrFlat[i][0] === parseTotalWeightDataFlat[0][0] && weightDataArrFlat[i][1] === parseTotalWeightDataFlat[0][1]) {
      //     weightDataArrFlat[i][2] = parseTotalWeightDataFlat[number][2];
      //     number++;
      //   }
      // }

      // 고려해야될 사항
      // 오늘 11월 1일  로컬에 들어있는 첫번째 값 10월 29일
      let localPoint = 0;
      let dataPoint = 0;
      let num = 0;
      while(localPoint < 27 || dataPoint < 27) {
        if(parseTotalWeightDataFlat[0][0] < weightDataArrFlat[dataPoint][0]) { //로컬 첫번재 값의 달보다 새로만든 배열의 달이 더 크다
          dataPoint++;
        }
        else if(parseTotalWeightDataFlat[localPoint][0] === weightDataArrFlat[dataPoint][0] && parseTotalWeightDataFlat[localPoint][1] !== weightDataArrFlat[dataPoint][1] ) {
          //달은 같으나 날짜가 다르다
          dataPoint++;
        }
        else if(parseTotalWeightDataFlat[localPoint][0] === weightDataArrFlat[dataPoint][0] && parseTotalWeightDataFlat[localPoint][1] === weightDataArrFlat[dataPoint][1]) {
          weightDataArrFlat[dataPoint][2] = parseTotalWeightDataFlat[localPoint][2];
          dataPoint++;
          localPoint++;
        }

        num++;
        if(num > 40) break;
      }

      console.log(weightDataArrFlat)
      console.log(parseTotalWeightDataFlat)
      
      // 로직 끝 화면에 세팅


    }
  }
  else if(!parseTotalWeightData) { //로컬에 데이터 없다면 초기 상태
    for(let i = 0; i < 28; i++) {
      dateNum -= 1;
      if(dateNum === 0) {
        dateNum = prevLastDate;
        monthNum = lastMonth;
      }
      weightDataArr[weightDataArrNum].push([monthNum, dateNum, ""]);
      if(weightDataArr[weightDataArrNum].length === 7) {
        weightDataArrNum++;
      }
    }
  }

  localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(weightDataArr));



  // if(!parseTotalWeightData) {
  //   localStorage.setItem("CURRENT_WEIGHT", JSON.stringify([onToday, ""]));
  // }

  // if(parseTotalWeightData) {
  //   let isWeightToday = parseTotalWeightData.find((date)=> date === onToday)

  //   if(!isWeightToday) {
  //     localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData.concat([onToday, ""])));
  //   }

  //   let reverseWeightData = parseTotalWeightData.reverse();
  //   let weightDataArrNum = 0;
  //   weightDataArr = [[], [], [], []];
  //   for(let i = 0; i < 56; i++){
  //     if(!reverseWeightData[i]) reverseWeightData[i] = "";
  //       weightDataArr[weightDataArrNum].push(reverseWeightData[i]);
  //       if(weightDataArr[weightDataArrNum].length > 13) weightDataArrNum++;
  //       if(weightDataArrNum === 4) break;
  //   }
  //   console.log(weightDataArr)
  // }
  // else {
  //   console.log("데이터 없다")
  // }
}

//체중 날짜
export function setWeightDate(weightBoxArr, weightWeekNum) {
  let oneMonthDateArr = [];
  let todayDate = onToday;
  todayDate -= weightWeekNum*7;
  
  if(todayDate < 0) todayDate = lastMonthDate + todayDate;
  for(let i = 0; i <= 29; i++) {
    let date = todayDate - i;
    if(date === 0) {
      for(let j = 0; j <= 30 - oneMonthDateArr.length; j++) {
        oneMonthDateArr.push(lastMonthDate - j);
      }
      break;
    } 
    oneMonthDateArr.push(date);
  }

  for(let i = 0; i < 7; i++) {
    weightBoxArr[6-i].id = oneMonthDateArr[i];
  }
}

//체중 차트 값 넣어주기
//로컬에 불러오는 날짜 값과 weightBoxArr값이  two포인트가 아니라 그냥 for문 돌리면 될 듯?
export function setWeightChartHeight(weightBoxArr ,weightWeekNum) {
  let reverseWeightBoxArr = weightBoxArr.slice().reverse();



  let divPoint = 0;
  let dataPoint = 0;
  
  // if(weightDataArr[0].length > 0) {
  //   while(divPoint !== reverseWeightBoxArr.length) {
  //     if(Number(reverseWeightBoxArr[divPoint].id) === (weightDataArr[weightWeekNum][dataPoint])) {
  //       reverseWeightBoxArr[divPoint].children[1].style.height = `${weightDataArr[weightWeekNum][dataPoint-1]}px`;
  //       reverseWeightBoxArr[divPoint].children[0].textContent = weightDataArr[weightWeekNum][dataPoint-1];
  //       divPoint++;
  //       dataPoint++;
  //     }
  //     else {
  //       reverseWeightBoxArr[divPoint].children[1].style.height = "0px";
  //       reverseWeightBoxArr[divPoint].children[0].textContent = "";
        
  //       if(weightDataArr[weightWeekNum][dataPoint] === "") {
  //         if(weightDataArr[weightWeekNum][dataPoint-1] === "") {//날짜값도 ""고 체중값도 ""라면 초기에 데이터 없을 때
  //           divPoint++;
  //         }
  //         else {
  //           dataPoint++;
  //         }
  //       }
  //       else if(weightDataArr[weightWeekNum][dataPoint] < 32 && weightDataArr[weightWeekNum][dataPoint] === "string") {
  //           divPoint++
  //       }
  //       else {
  //         dataPoint++
  //       }
  //     }
  //     if(divPoint > 30 || dataPoint > 30) {
  //       break;
  //     }
  //   }
  // }

  // else {
  //   console.log("데이터 없다")
  // }
}