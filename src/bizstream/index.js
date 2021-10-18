import axios from 'axios';
import admin from './lib/admin';
import guest from './lib/guest';
import customer from './lib/customer';
import {ADMIN_TYPE, CUSTOMER_TYPE} from './types';
import {translate} from '../i18n';
import {navigate, tools} from '../utils';
import JSONBig from 'json-bigint';

const request = axios.create({
  transformResponse: [
    function (data) {
      return JSONBig.parse(data);
    },
  ],
});

const defaultOptions = {
  url: 'https://prd-api.cgv.com.cn',
  userAgent: 'BIZSTREAM Library',
  home_cms_block_id: '',
  authentication: {
    integration: {
      access_token: undefined,
    },
  },
};

class Bizstream {
  init(options) {
    this.configuration = {...defaultOptions, ...options};
    this.base_url = this.configuration.url;
    this.root_path = '';
    this.admin = admin(this);
    this.guest = guest(this);
    this.customer = customer(this);
  }

  post(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'POST', params, data, type);
  }

  put(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'PUT', params, data, type);
  }

  get(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'GET', params, data, type);
  }

  delete(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'DELETE', params, data, type);
  }

  send(path, method, params, data, type, headersOption) {
    const url = `${this.base_url}${this.root_path}${path}`;
    console.log(url, 'url111');
    const headers = {
      'User-Agent': this.configuration.userAgent,
      'Content-Type': 'application/json',
      ...headersOption,
    };

    if (this.access_token && type === ADMIN_TYPE) {
      headers.Authorization = `Bearer ${this.access_token}`;
    } else if (this.customerToken && type === CUSTOMER_TYPE) {
      headers.Authorization = `Bearer ${this.customerToken}`;
    }

    return new Promise((resolve, reject) => {
      console.log(headers, `[method: ${method}]`);
      request({
        url,
        method,
        headers,
        params,
        data,
      })
        .then(response => {
          if (response?.headers?.token_refresh) {
            this.customerToken = response?.headers?.token_refresh;
          }
          console.log(response, 'response');
          resolve(response.data);
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 400) {
              tools.Toast.toast(
                error?.response?.data?.detail ||
                  error?.response?.data?.title ||
                  error?.response?.data?.message,
                1,
              );
              return;
            }
            if (
              error.response.status === 404 &&
              error?.response?.data == null
            ) {
              reject();
              return;
            }
            if (error.response.status === 401) {
              navigate('MyModal', {screen: 'LoginScreen'});
              return;
            }
          } else if (error.request) {
            const noReponseError = noResponseFromServerError();
            reject(noReponseError);
            return;
          }
          let customError;
          if (
            typeof error.response.data === 'object' &&
            error.response.data !== null
          ) {
            customError = Bizstream.extractErrorMessage(error.response.data);
          } else {
            customError = pageNotFoundError();
          }
          reject(customError);
        });
    });
  }

  static extractErrorMessage(data) {
    const {parameters} = data;
    let {message} = data;

    if (parameters && Array.isArray(parameters) && parameters.length > 0) {
      parameters.forEach((item, index) => {
        message = message.replace(`%${index + 1}`, item);
      });
    } else if (parameters && parameters instanceof Object) {
      Object.keys(parameters).forEach(parameter => {
        message = message.replace(`%${parameter}`, parameters[parameter]);
      });
    }
    return {message};
  }

  isConfigured() {
    return this.access_token != null;
  }

  isCustomerLogin() {
    return !!this.customerToken;
  }

  setStoreConfig(config) {
    this.storeConfig = config;
  }

  setCustomerToken(token) {
    this.customerToken = token;
  }

  getMediaUrl() {
    // eslint-disable-next-line quotes
    return `http://prd-api.cgv.com.cn/api`;
  }

  getProductMediaUrl() {
    // eslint-disable-next-line quotes
    return `http://prd-api.cgv.com.cn/api`;
  }

  getHTML5Url() {
    return 'https://prd-h5.cgv.com.cn';
  }
}

function noResponseFromServerError() {
  const name = translate('errors.noResponseFromServer');
  const message = translate('errors.noResponseFromServerMessage');
  return createError(name, message);
}

function pageNotFoundError() {
  const name = translate('errors.404error');
  const message = translate('errors.404errorMessage');
  return createError(name, message);
}

function createError(name, message) {
  const error = new Error();
  error.name = name;
  error.message = message;
  return error;
}

// Constants
export const CUSTOMER_TOKEN = 'customerToken';
export const CURRENCY_CODE = 'currencyCode';
export const bizstream = new Bizstream();
