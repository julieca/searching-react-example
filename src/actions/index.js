import $axios from '../config/axiosInstance';
import * as url from '../enums/url';
import {
  GET_DATA
} from '../enums/mutations';

export const getData = () => {
  return async dispatch => {
    const { data } = (await $axios.get(url.getData));
    dispatch({
      type: GET_DATA,
      payload: data
    })
  }
}

