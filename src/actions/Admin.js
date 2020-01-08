import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';
import storageCfg from '../constants/firebaseCfg';

function UpdatePhotoSuccess(user) {
  return {
    type: types.UPDATE_PHOTO_SUCCESS,
    user
  };
}

export function fetchPostUpdateProfile(id, image) {
  return dispatch => {
    const p = new Promise(resovle => {
      if (typeof image === 'string') {
        resovle(image);
      } else {
        const storageRef = storageCfg.storage().ref();
        const mainImage = storageRef.child(image.name + Date.now());
        mainImage.put(image).then(() => {
          mainImage.getDownloadURL().then(url => {
            resovle(url);
          });
        });
      }
    });

    return p.then(url => {
      return axios
        .post(
          `${domain['server-domain']}/updateprofile`,
          {
            id,
            avatar: url
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
          const { token } = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem(
            'user',
            JSON.stringify({
              user: res.data.user,
              token
            })
          );
          console.log(localStorage.getItem('user'));
          dispatch(UpdatePhotoSuccess(res.data.user));
        })
        .catch(() => {
          // dispatch(UpdateFail("Cập nhật thông tin không thành công"));
        });
    });
  };
}
