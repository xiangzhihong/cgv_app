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
  getStoreConfig: () =>
    bizstream.get(
      '/product/api/system-properties',
      undefined,
      undefined,
      ADMIN_TYPE,
    ),

  getCatalogCategory: catalogCategoryTypeId => {
    const params = {
      'prodCatalogId.equals': 'CGV_APP',
      'prodCatalogCategoryTypeId.equals': catalogCategoryTypeId,
    };
    return bizstream.get(
      '/content/content/notice',
      params,
      undefined,
      ADMIN_TYPE,
    );
  },

  getCatalogCategoryRoot: () => {
    return bizstream.admin.getCatalogCategory('PCCT_CGV_ROOT');
  },

  getCatalogCategoryPromotion: () => {
    return bizstream.admin.getCatalogCategory('PCCT_PROMOTIONS');
  },

  getCountries: () => {
    return bizstream.get(
      '/V1/directory/countries',
      undefined,
      undefined,
      ADMIN_TYPE,
    );
  },

  getNotices: () => {
    return bizstream
      .get(
        `/content/api/announcement/query?channel=APP&thatcd=${
          store.getState().bizstream.selectedCinema.thatCd
        }`,
        undefined,
        undefined,
        ADMIN_TYPE,
      )
      .then(handleRes);
  },

  getCityIdByLocation: (latitude = 0, longitude = 0) => {
    const params = {
      pLati: latitude,
      pLnti: longitude,
    };
    return bizstream.get('/product/thats', params, undefined, ADMIN_TYPE);
  },

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

  /*
   * 首页(电影) API
   */
  // 在售影片目录
  getOnplayingMovies: (currentPage = 0, prMainPage = true, channel = '05') => {
    // return null
    const params = {
      prMainPage,
      currentPage,
      prCity: store.getState().bizstream.cityId,
      chnlNo: channel,
    };
    return bizstream.get('/product/plans', params, undefined, ADMIN_TYPE);
  },

  // Top Banner （Slide）
  getHomeTopBanner: () => {
    return bizstream.post(
      'content/api/advert/query?channel=APP&advertType=APP_SY_HEAD_AD',
      undefined,
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

  // 城市别影院目录
  getCinemasByCity: (cityId, latitude = undefined, longitude = undefined) => {
    const params = {
      cityCd: cityId,
      pLati: latitude,
      pLnti: longitude,
    };
    return bizstream.get('/product/thats', params, undefined, ADMIN_TYPE);
  },

  getCinemasByName: (cityId, latitude, longitude) => {
    const params = {
      cityCd: cityId,
      pLati: latitude,
      pLnti: longitude,
    };
    return bizstream.get('/product/thats', params, undefined, ADMIN_TYPE);
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

  // 影院别影片目录
  getMoviesByCinema: cinemaId => {
    const params = {
      prThatCd: cinemaId,
      chnlNo: '05',
    };
    return bizstream.get(
      '/product/plans/thats/movies',
      params,
      undefined,
      ADMIN_TYPE,
    );
  },

  // 影院和影片别排期日期
  getScheduleDatesByCinemaAndMovie: (cinemaId, movieId, prDay) => {
    const params = {
      prDay,
      prMovCd: movieId,
      prThatCd: cinemaId,
      chnlNo: '05',
    };
    return bizstream.get(
      '/product/plans/thats/movies',
      params,
      undefined,
      ADMIN_TYPE,
    );
  },

  getCinemaByScheduleDates: (prMovCd, prCityCd, prDay, pLati, pLnti) => {
    const params = {
      prMovCd,
      prCityCd,
      prDay,
      pLati,
      pLnti,
      chnlNo: '05',
    };
    console.log(params);
    return bizstream.get('/product/plans/thats', params, undefined, ADMIN_TYPE);
  },

  // 排期
  getSchedules: (cinemaId, movieId) => {
    const params = {
      prMovCd: movieId,
      prThatCd: cinemaId,
      chnlNo: '05',
    };
    return bizstream.get(
      '/product/plans/scndys',
      params,
      undefined,
      ADMIN_TYPE,
    );
  },

  //把非本城市的影城过滤掉
  getSchedulesByCity: (movieId, latitude, longitude) => {
    const params = {
      prMovCd: movieId,
      prCityCd: store.getState().bizstream.cityId,
      chnlNo: '05',
      pLati: latitude,
      pLnti: longitude,
    };
    return bizstream.get(
      '/product/plans/scndayNew',
      params,
      undefined,
      ADMIN_TYPE,
    );
  },

  searchCity: cityName => {
    return bizstream.get(
      '/product/thats/group',
      {
        cityName,
      },
      undefined,
      ADMIN_TYPE,
    );
  },

  // 影片剧照
  getMovieMedia: movieId => {
    const params = {
      productId: movieId,
      pageSize: 50,
    };
    return bizstream.post(
      '/product/movie-content/list',
      undefined,
      params,
      ADMIN_TYPE,
    );
  },

  getMovieSeat: (prScreenCd, prThatCd, prSarftThatCd, scnSchSeq) => {
    const params = {
      prScreenCd,
      prThatCd,
      prSarftThatCd,
      scnSchSeq,
    };
    return bizstream.post('/order/seats', undefined, params, ADMIN_TYPE);
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

  // 话题评论
  getMovieTopicReview: () => bizstream.get(),

  /*
   * 活动 API
   */

  // 活动分类目录
  getPromotionCategories: () =>
    bizstream
      .get(
        '/product/api/product/promo/categories',
        undefined,
        undefined,
        ADMIN_TYPE,
      )
      .then(handleRes),

  getPromotionList: (andGroupCd, thatCd, chnlNo = '05') => {
    const data = {
      andGroupCd,
      thatCd,
      chnlNo,
      channel: 'APP',
    };
    return bizstream
      .post('/product/api/product/verify/promos', undefined, data, ADMIN_TYPE)
      .then(handleRes);
  },

  getPromotionDetail: (productPromoId, thatCd, chnlNo = '05') => {
    const data = {
      productPromoId,
      chnlNo,
      thatCd,
      channel: 'APP',
    };
    return bizstream
      .post('/product/api/product/verify/promos', undefined, data, ADMIN_TYPE)
      .then(handleRes);
  },

  // 现在进行中活动目录
  getCurrentPromotionsByCinema: (cinemaId, groudCode, channel = '05') => {
    const data = {
      chnlNo: channel,
      thatCd: cinemaId,
      andGroupCd: groudCode,
      channel: 'APP',
    };
    return bizstream.post(
      '/product/api/product/verify/promos',
      undefined,
      data,
      ADMIN_TYPE,
    );
  },

  // 已结束活动目录
  getFinishedPromotionsByCinema: () => bizstream.get(),

  /*
   * TODO：app 版本更新 /api/version/02
   * */
  getVersionUpdate: () =>
    bizstream.get(
      Platform.OS === 'ios' ? '/api/version/01' : '/api/version/02',
      undefined,
      undefined,
      ADMIN_TYPE,
    ),

  /*
   * 商店 API
   */

  getFeaturedMemberCards: thatCd => {
    const params = {
      thatCd,
    };
    return bizstream.get('/api/shop/card', params);
  },

  getFeaturedProducts: (facilityCd, pageSize) => {
    const data = {
      facilityCd,
      showInSelect: '1',
      ishotgoods: 1,
      pageSize,
    };
    return bizstream.post(
      '/product/good/list-all',
      undefined,
      data,
      ADMIN_TYPE,
    );
  },

  getGoodCategory: id => {
    const data = {
      facilityCd: id,
      prodCatalogCd: 1201,
      showInSelect: '1',
    };
    return bizstream.post(
      '/product/good/list-all',
      undefined,
      data,
      ADMIN_TYPE,
    );
  },

  getGoodChangeSelection: (productCd, thatCd) => {
    const data = {
      facilityCd: thatCd,
      productCd,
      prodCatalogCd: 1201,
    };
    return bizstream.post(
      '/product/good/set/sublist-new',
      undefined,
      data,
      ADMIN_TYPE,
    );
  },

  getGoodDetailPics: productId => {
    const data = {
      productId,
    };
    return bizstream.post(
      '/product/movie-content/list',
      undefined,
      data,
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

  getMemberCardCategories: () => bizstream.get(),

  getMemberCardCategoryProducts: () => bizstream.get(),

  getShopCategories: () => bizstream.get(),

  getShopCategoryBanner: () => bizstream.get(),

  getShopCategoryProducts: () => bizstream.get(),

  getShopProduct: () => bizstream.get(),

  getConfigurableChildren: () => bizstream.get(),

  getConfigurableProductOptions: () => bizstream.get(),

  getRelatedProducts: () => bizstream.get(),

  getProductMedia: () => bizstream.get(),

  getProductReviews: () => bizstream.get(),

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
