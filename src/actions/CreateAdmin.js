import axios from 'axios';
import * as types from '../constants/ActionTypes';

const localStorage = require('localStorage');

function CreateAdminSuccess() {
    return {
        type: types.CREATE_ADMIN_SUCCESS,
    };
}

function CreateAdminFail(error) {
    return {
        type: types.CREATE_ADMIN_FAIL,
        error
    };
}

function CreateAdminPending() {
    return {
        type: types.CREATE_ADMIN_PENDING
    };
}

function fetchCreateAdmin(user) {
    return dispatch => {
        dispatch(CreateAdminPending());
        return axios
            .post(`https://locahost:4000/createadmin`, {
                user
            },
                {
                    headers: {
                        Authorization: `Bearer ${  JSON.parse(localStorage.getItem('user')).token}`,
                    }
                }
            )
            .then(res => {
                if (res.data.error) {
                    dispatch(CreateAdminFail(res.data.error));
                } else {
                    dispatch(CreateAdminSuccess());
                }
            }).catch(error => {
                dispatch(CreateAdminFail(error));
            });
    };
}

export default fetchCreateAdmin;
