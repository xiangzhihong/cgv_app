import axios from 'axios';
import qs from 'querystring';
import baseConfig from './httpConfig';

const headers = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac',
  'Content-Type': 'application/json',
  'sign': '87548979eef8557e16f2621799189095',   //SelectSessionScreen 选择场次需要
  'Referer': 'https://servicewechat.com/wx24b962fec75764c3/84/page-frame.html',
};

axios.defaults.baseURL = baseConfig.baseUrl;
axios.defaults.headers = headers;
axios.defaults.timeout = 30000;
// axios.defaults.headers.Authorization = baseConfig.authentication;

axios.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000,
    };
  }
  return config;
});

axios.interceptors.response.use(response => {
  if (response.status === '200' || response.status === 200) {
    return response.data.data || response.data;
  } else {
    throw Error(response.opt || '服务异常');
  }
});

export default class apiRequest {

  static async getWithHeader(url, params) {
    try {
      let query = await qs.stringify(params);
      let res = null;
      if (!params) {
        res = await axios.get(url);
      } else {
        res = await axios.get(url + '?' + query);
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  static async get(url, params) {
    try {
      let query = await qs.stringify(params);
      let res = null;
      if (!params) {
        res = await axios.get(url);
      } else {
        res = await axios.get(url + '?' + query);
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  static async post(url, params) {
    try {
      return await axios.post(url, params);
    } catch (error) {
      return error;
    }
  }

  static async patch(url, params) {
    try {
      return await axios.patch(url, params);
    } catch (error) {
      return error;
    }
  }

  static async put(url, params) {
    try {
      return await axios.put(url, params);
    } catch (error) {
      return error;
    }
  }

  static async delete(url, params) {
    try {
      return await axios.post(url, params);
    } catch (error) {
      return error;
    }
  }
}
