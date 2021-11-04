const date = new Date();
export const thisYear = date.getFullYear();
export const thisMonth = date.getMonth();
export let daysArray = [];
export function renderCalendar() {
  const thisDay = date.getDate();

  let prevLast = new Date(thisYear, thisMonth, 0)
  let thisLast = new Date(thisYear, thisMonth+1, 0)

  //저번달 마지막날
  const prevLastDate = prevLast.getDate();
  //저번달 마지막 요일
  const prevLastDay = prevLast.getDay();

  //이번달 마지막날
  const thisLastDate = thisLast.getDate();
  //이번달 마지막 요일
  const thisLastDay = thisLast.getDay();

  // let daysArray = [];

  //달력 첫번째 칸에 들어갈 숫자
  const firstDayCalc = prevLastDate - prevLastDay;
  //달력 마지막 칸에 들어갈 숫자
  const lastDayCalc = 6 - thisLastDay;

  //자반달이 달력에 들어가는 수
  for(let i = firstDayCalc;  i <= prevLastDate; i++ ) {
    daysArray.push(i);
  }

  //이번달이 달력에 들아가는 수
  for(let i = 1; i <= thisLastDate; i++ ) {
    daysArray.push(i);
  }

  //다음달이 달력에 들어가는 수 
  for(let i = 1; i <= lastDayCalc; i++) {
    daysArray.push(i);
  }
  
  const today = new Date();
  const todayMonth = today.getMonth()+1;

  daysArray.forEach((date, i) => {
    if(i >= 0 && i <= prevLastDay || i >= daysArray.length - lastDayCalc) {
      daysArray[i] = `<div class="NotThisMonth">${date}</div>`
    }
    else if(i === thisDay + prevLastDay && thisMonth+1 === todayMonth ) {
      daysArray[i] = `<div class="today thisMonth">${date}</div>`;
    }
    else{
      daysArray[i] = `<div class="thisMonth">${date}</div>`;
    }
  })
}

//달력 걷기 이미지 클릭
export function clickReserveDate(reserveIconClickEvent) {
  let getReserveDate = localStorage.getItem("RESERVE_DATE")
  let parseGetReserveDate = JSON.parse(getReserveDate);
  const walkingArr = [];
  //하루에 두번할 수 있기 때문에 배열에 map함수 결과를 담아서 함수 실행
  parseGetReserveDate.map((reserveDate) => {
    if(reserveDate.date === reserveIconClickEvent.target.textContent) {
      walkingArr.push(reserveDate);
    }
  })
  showReserveModal(walkingArr, reserveIconClickEvent)
}

//예약한 모달
function showReserveModal(walkingArr, reserveIconClickEvent) {
  let getReserveDate = localStorage.getItem("RESERVE_DATE")
  let parseGetReserveDate = JSON.parse(getReserveDate);

  const modalDiv = document.createElement('div');
  modalDiv.classList.add("reserveModal")

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add("reserveModalTitle")
  modalTitle.textContent = "걷기 예약"
  modalDiv.append(modalTitle);

  const modalClose = document.createElement('button');
  modalClose.textContent = "X";
  modalClose.classList.add("reserveModalClose")
  modalDiv.append(modalClose);
  modalClose.addEventListener('click', () => {
  modalDiv.remove();
  })

  const modalDate = document.createElement('h3');
  modalDate.textContent = (`${walkingArr[0].date}일`);
  modalDate.classList.add("reserveModalDate")
  modalDiv.append(modalDate);

  const modalTimeDiv = document.createElement('div');
  modalTimeDiv.classList.add("modalTimeDiv")

  for(let reserveTime of walkingArr){
    let modalTime = document.createElement('p');
    modalTime.textContent = (`${reserveTime.hour}시 ${reserveTime.minute}분`);
    modalTime.classList.add("reserveModalTime")
    modalTimeDiv.append(modalTime);

    let modalTimeDelete = document.createElement('button');
    modalTimeDelete.textContent = "X";
    modalTimeDelete.classList.add("reserveDelete");
    modalTimeDelete.addEventListener('click', (e) => {

      for(let i = 0; i < parseGetReserveDate.length; i++){
        if(parseGetReserveDate[i].date === e.target.parentNode.previousSibling.textContent.match(/[^일,시,분, ]/gm).join(''))
        if((parseGetReserveDate[i].hour + parseGetReserveDate[i].minute) === e.target.previousSibling.textContent.match(/[^일,시,분, ]/gm).join(''))
        parseGetReserveDate.splice(i, 1);
      }

      console.log(e.target.parentNode.previousSibling.textContent.match(/[^일,시,분, ]/gm).join(''))
      console.log(e.target.previousSibling.textContent.match(/[^일,시,분, ]/gm).join(''))
      //배열값 다시 로컬로 넣어주기
      console.log(parseGetReserveDate)
    })
    modalTimeDiv.append(modalTimeDelete);
  }
  modalDiv.append(modalTimeDiv);
  
  reserveIconClickEvent.target.parentNode.parentNode.parentNode.parentNode.append(modalDiv)
}