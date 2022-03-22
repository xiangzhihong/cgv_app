import {Platform} from 'react-native';
import {ADMIN_TYPE} from '../../types';
import store from '../../../store';
import {AESUtils, tools} from '../../../utils';

const handleRes = ({code, data, message}) => {
  if (code === 200) {
    return data;
  }
  throw new Error(message);
};

export default bizstream => ({

  // 城市目录
  getCities: search => {
    const params = {
      condition: search,
    };

    return bizstream.get(
      '/product/areas/that/group',
      params,
      undefined,
      ADMIN_TYPE,
    );
  },


  //http://prd-api.cgv.com.cn/content/api/advert/query?channel=APP&advertType=APP_SY_HEAD_AD&thatCd=1051
  getBannerList: (contentTypeId, thatCd) => {
    return bizstream
      .get(
        `/content/api/advert/query?channel=APP&advertType=${contentTypeId}&thatCd=${thatCd}`,
        undefined,
        undefined,
        ADMIN_TYPE,
      )
      .then(handleRes);
  },

  getHomeBannerList: thatCd => {
    let res = bizstream
      .get(
        `/content/api/advert/query?channel=APP&advertType=APP_SY_HEAD_AD&thatCd=${thatCd}`,
        undefined,
        undefined,
        ADMIN_TYPE,
      )
      .then(handleRes);
    console.log(res, 'res,');
    return res;
  },


  // 影院详情
  getCinema: cinemaId => {
    return bizstream.get(
      `/product/thats/${cinemaId}`,
      undefined,
      undefined,
      ADMIN_TYPE,
    );
  },



  // 影片评论目录
  getMovieReviews: (type = '1', movieId) => {
    const params = {
      postedAnonymous: type,
      productId: movieId,
      cityCd: store.getState().bizstream.cityId,
    };
    return bizstream.post(
      '/product/product-reviews/ext/productReviewList',
      undefined,
      params,
      ADMIN_TYPE,
    );
  },

  getMovieTopic: (movieId, pageNumber = 0, pageSize = 10) => {
    const params = {
      productId: movieId,
      pageNumber,
      pageSize,
    };
    return bizstream.post(
      '/product/surveys/ext/topiclist',
      undefined,
      params,
      ADMIN_TYPE,
    );
  },

  getGoodComments: productId => {
    const data = {
      postedAnonymous: '2',
      productId,
    };
    return bizstream.post(
      '/product/product-reviews/ext/productReviewList',
      undefined,
      data,
      ADMIN_TYPE,
    );
  },

  getShopFriendCards: (thatCd, level3Id) => {
    const params = {
      thatCd,
      level3Id,
    };
    return bizstream.get('/api/shop/card', params);
  },


  getConfigurableChildren: () => bizstream.get(),

  /*
   * 登录相关 API
   */
  getVerificationCode: (phoneNumber, type, reSend, ticket, randstr) => {
    const data = {
      phone: AESUtils.AES(phoneNumber),
      type, // "01": 验证码登陆, "02": 绑定手机号
      reSend, // "0": 从手机号页面发起请求, "1" 从验证码页面发起请求
      platform: Platform.OS,
      Ticket: ticket, // 防水墙
      Randstr: randstr, // 防水墙
    };
    return bizstream.post('/api/sms/send/verifycode', undefined, data);
  },

  getLogin: async (loginType, addParams, thatCd) => {
    const loginInfo = await tools.getConstantDeviceInfo();
    const data = {
      loginType,
      platform: Platform.OS,
      thatCd,
      ...addParams,
      loginInfo,
    };
    return bizstream.post('/auth/login', undefined, data);
  },
});
