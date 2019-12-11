import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';

function getSkillsSuccess(skills) {
  return {
    type: types.LIST_SKILLS_SUCCESS,
    skills
  };
}

function getSkillsPending() {
  return {
    type: types.LIST_SKILLS_PENDING
  };
}

function getSkillsFail() {
  return {
    type: types.LIST_SKILLS_FAIL
  };
}

function addSkillSuccess(skill) {
  return {
    type: types.ADD_NEW_SKILL,
    skill
  };
}

function updateStatusSkillSuccess(skill) {
  return {
    type: types.UPDATE_STATUS_SKILL,
    skill
  };
}

function updateNameSkillSuccess(skill) {
  return {
    type: types.UPDATE_SKILL_NAME,
    skill
  };
}

export const fetchListSkills = () => {
  return dispatch => {
    dispatch(getSkillsPending);
    return axios
      .get(`${domain['server-domain']}/skills`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(getSkillsSuccess(res.data));
        return true;
      })
      .catch(() => {
        dispatch(getSkillsFail);
        return false;
      });
  };
};

export const fetchAddSkill = newSkill => {
  return dispatch => {
    console.log('Pending');
    dispatch(getSkillsPending());

    return axios
      .post(
        `${domain['server-domain']}/skill`,
        {
          newSkill
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`
          }
        }
      )
      .then(res => {
        dispatch(addSkillSuccess(res.data.skill));
        return true;
      })
      .catch(() => {
        console.log('Fail');
        dispatch(getSkillsFail());
        return false;
      });
  };
};

export const fetchUpdateSkillStatus = (id, state) => {
  return dispatch => {
    dispatch(getSkillsPending());
    console.log(state);
    return axios
      .post(
        `${domain['server-domain']}/deleteskill`,
        {
          id,
          state: !state
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`
          }
        }
      )
      .then(res => {
        dispatch(updateStatusSkillSuccess(res.data.skill));
        return true;
      })
      .catch(() => {
        dispatch(getSkillsFail());
        return false;
      });
  };
};

export const fetchUpdateSkillName = (id, skill) => {
  return dispatch => {
    dispatch(getSkillsPending());
    return axios
      .post(
        `${domain['server-domain']}/updateskill`,
        {
          id,
          skill
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`
          }
        }
      )
      .then(res => {
        dispatch(updateNameSkillSuccess(res.data.skill));
        return true;
      })
      .catch(() => {
        dispatch(getSkillsFail());
        return false;
      });
  };
};