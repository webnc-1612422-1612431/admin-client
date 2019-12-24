import * as types from '../constants/ActionTypes';

const initialState = {
  chartData: [],
  typeChart: 'date',
  topSalesByTeacher: [],
  typeTeacher: null,
  topSalesBySkill: [],
  typeSkill: null,
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
        topSalesBySkill: action.topSalesBySkill
      };
    case types.GET_TOP_SALES_BY_TEACHER:
      return {
        ...state,
        topSalesBySkill: action.topSalesByTeacher
      };

    default:
      return state;
  }
}

export default Dashboard;
