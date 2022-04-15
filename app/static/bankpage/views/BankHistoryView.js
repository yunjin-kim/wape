import { qs } from '../../helper.js';

class Template {
  userWalkReportTemplate({ date, step, userGoal, userStepGragh }) {
    return `
      <div class='user-walk-info-report-wrap'>
        <div class='user-walk-info-report-text'>
            <div class='user-walk-info-report-date'>
                <div class='user-walk-info-report-symbol'></div>
                <div class='user-walk-info-report-date-text'>
                    <span>${date}</span>일
                </div>
            </div>
            <div class='user-walk-info-report-value'>
                <h3>
                    <span>${(step * 0.0007).toFixed(1)}</span>km 걷고<br>
                    <span>${step * 5}</span>원 벌었어요
                </h3>
            </div>
        </div>
        <div class='user-walk-info-report-walk-gragh-wrap'>
            <div class='user-walk-info-report-walk-value'>
                <h4><strong>걸음 수</strong><span>${step}</span> 걸음</h4>
                <p><span>${userGoal}</span>걸음</p>
            </div>
            <div class='user-walk-info-report-walk-gragh'>
                <div class='user-walk-info-report-total-walk-gragh'></div>
                <div class='user-walk-info-report-user-walk-gragh' style="width: ${userStepGragh}px"></div>
            </div>
        </div>
        <div class='user-walk-info-report-money-gragh-wrap'>
            <div class='user-walk-info-report-money-value'>
                <h4><strong>금액 </strong><span>${step * 5}</span> 원</h4>
                <p><span>${userGoal * 5}</span>원</p>
            </div>
            <div class='user-walk-info-report-money-gragh'>
                <div class='user-walk-info-report-total-money-gragh'></div>
                <div class='user-walk-info-report-user-money-gragh' style="width: ${userStepGragh}px"></div>
            </div>
        </div>
      </div>
    `;
  }
}
export default class BankHistoryView {
  constructor() {
    this.tamplate = new Template();
  }

  setUserReport({ stepData, dayData, goalData }) {
    const $userReportWrap = qs('.user-walk-info-report');

    $userReportWrap.insertAdjacentHTML('afterbegin', this.setUserEachReport({ stepData, dayData, goalData }).join(''));
  }

  setUserEachReport({ stepData, dayData, goalData }) {
    const userReportList = [];

    stepData.forEach((step, index) => {
      let userStepGragh = (step / goalData) * 262;
      userStepGragh > 262 ? userStepGragh = 262 : userStepGragh;
      const eachReport =
        this.tamplate.userWalkReportTemplate({
          date: dayData[index], step: step, userGoal: goalData, userStepGragh: userStepGragh
        });
      userReportList.unshift(eachReport);
    });

    return userReportList;
  }
}
