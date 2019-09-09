import axios from 'axios';
import cryptoJS from 'crypto-js';
const { REACT_APP_HOST } = process.env;

export function publicPost(url, data) {
  return axios({
    method: 'post',
    url: `${REACT_APP_HOST}${url}`,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
export function getData(url) {
  const private_key = localStorage.getItem('private_key');
  const public_key = localStorage.getItem('public_key');

  if (!private_key || !public_key) {
    throw new Error('Error authenticating credentials');
  }
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
  const raw_data = JSON.stringify(data);

  const private_key = localStorage.getItem('private_key');
  const public_key = localStorage.getItem('public_key');

  if (!private_key || !public_key) {
    throw new Error('Error authenticating credentials');
  }
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
