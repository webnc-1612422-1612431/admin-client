import * as types from '../constants/ActionTypes';

const initialState = {
  chartData: [],
  typeChart: 'date',
  topSalesByTeacher: [],
  typeTeacher: 1,
  topSalesBySkill: [],
  typeSkill: 1,
  summaryReport: {}
};

function Dashboard(state = initialState, action) {
  switch (action.type) {
    case types.GET_CHART_DATA:
      return {
        ...state,
        chartData: action.chartData,
        typeChart: action.typeChart
      };
    case types.GET_TOP_SALES_BY_SKILL:
      return {
        ...state,
        topSalesBySkill: action.topSalesBySkill.salesBySkill,
        typeSkill: action.typeSkill
      };
    case types.GET_TOP_SALES_BY_TEACHER:
      return {
        ...state,
        topSalesByTeacher: action.topSalesByTeacher.salesByTeacher,
        typeTeacher: action.typeTeacher
      };
    case types.GET_SUMMARY_REPORT:
      return {
        ...state,
        summaryReport: action.summaryReport
      };
    default:
      return state;
  }
}

export default Dashboard;
