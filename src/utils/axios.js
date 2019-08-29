import axios from 'axios';
import cryptoJS from 'crypto-js';
import { isObject } from 'utils/helpers';
const { REACT_APP_HOST } = process.env;

export function publicPost(url, data) {
  return axios({
    method: 'post',
    url: `${REACT_APP_HOST}${url}`,
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
}
export function getData(url) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isObject(user)) {
    throw new Error('Error authenticating credentials');
  }

  const { private_key } = user;
  const { public_key } = user;
  const hmac = cryptoJS.HmacSHA256(url, private_key);

  return axios({
    method: 'get',
    url: `${REACT_APP_HOST}${url}`,
    headers: {
      public_key,
      hash: hmac
        .toString()
        .replace('-', '')
        .toLowerCase(),
      'Content-Type': 'application/json',
    },
  });
}
export function postData(url, data) {
  const user = JSON.parse(localStorage.getItem('user'));
  const raw_data = JSON.stringify(data);

  if (!isObject(user)) {
    throw new Error('Error authenticating credentials');
  }

  const { private_key } = user;
  const { public_key } = user;
  const hmac = cryptoJS.HmacSHA256(url + raw_data, private_key);

  return axios({
    method: 'post',
    url: `${REACT_APP_HOST}${url}`,
    data: raw_data,
    headers: {
      public_key,
      Hash: hmac
        .toString()
        .replace('-', '')
        .toLowerCase(),
      'Content-Type': 'application/json',
    },
  });
}
