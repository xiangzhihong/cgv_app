import {CUSTOMER_TYPE} from '../../types';
import store from '../../../store';

const handleRes = ({code, data, message}) => {
  if (code === 200) {
    return data;
  }
  throw new Error(message);
};

export default bizstream => ({

  /*
   * TODO：查询允许支付方式
   * */
  payAttr: id => {
    return bizstream.get(
      `/facility/attr/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：查询未支付订单
   * */
  seatCountPos: () => {
    return bizstream.post('/order/nonepay/count', undefined, {}, CUSTOMER_TYPE);
  },


  /*
   * TODO： 卖品评论
   * */
  getGoodComments: productId => {
    const data = {
      postedAnonymous: '2',
      productId,
    };
    return bizstream.post(
      '/product/product-reviews/ext/productReviewList',
      undefined,
      data,
      CUSTOMER_TYPE,
    );
  },


  /*
   * TODO： 话题分享次数
   * */
  savetTopicShare: id =>
    bizstream.post(
      `/product/surveys/ext/savetTopicShare/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),


  /*
   * TODO： 年度观影报告
   * */
  annualReport: () =>
    bizstream.get(
      '/content/movie/annualReport',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),


  /*
   * TODO： 续卡注意事项
   * */
  getPlanningContent: (type = '04') =>
    bizstream.get(
      `/content/api/planningContent/query?contentType=${type}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：充值金额列表
   * */
  orderRechargeLimit: (thatCd, mbrCardcd) =>
    bizstream.get(
      `/api/card/limit?thatCd=${thatCd}&mbrCardcd=${mbrCardcd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：续卡
   * */
  orderRenew: data =>
    bizstream.post('/order/renew', undefined, data, CUSTOMER_TYPE),

  /*
   * TODO：重置密码
   * */
  resetPassword: data =>
    bizstream.put('/api/party/card/password', undefined, data, CUSTOMER_TYPE),


  /*
   * TODO：退票申请
   * */
  putOrderApply: data =>
    bizstream.put(`/api/order/${data}`, undefined, undefined, CUSTOMER_TYPE),


  /*
   * TODO：购票指南
   * */
  contentInstructions: () =>
    bizstream.get(
      '/content/instructions/selectInstructions',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),


  /*
   * TODO：Movies have seen
   * TODO：看过的电影
   * */
  getSeenMovieList: () =>
    bizstream.post('/order/api/saw', undefined, undefined, CUSTOMER_TYPE),


  addItemToCart: payload =>
    bizstream.post('/V1/carts/mine/items', undefined, payload, CUSTOMER_TYPE),


  placeCartOrder: paymentInformation =>
    bizstream.post(
      '/V1/carts/mine/payment-information',
      undefined,
      paymentInformation,
      CUSTOMER_TYPE,
    ),


  // 影片评论目录
  getMovieReviews: (movieId, pageNumber, pageSize = 10) => {
    const params = {
      postedAnonymous: '1',
      productId: movieId,
      pageNumber,
      pageSize,
      cityCd: store.getState().bizstream.cityId,
    };
    return bizstream.post(
      '/product/product-reviews/ext/productReviewList',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },

  // 影片话题目录
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
      CUSTOMER_TYPE,
    );
  },


  // 想看电影
  clickLike: (productLike, productId, productLikeType = '1', thatCd) => {
    const params = {
      productLike,
      productLikeType,
      channel: 'APP',
    };
    // 卖品评论以及电影评论点赞
    if (productLikeType === '2' || productLikeType === '4') {
      params.productReview = {
        id: productId,
      };
    } else if (productLikeType === '5') {
      params.surveyResponse = {
        id: productId,
      };
    } else {
      params.productStore = {
        productStoreId: thatCd,
      };
      params.product = {
        id: productId,
      };
    }
    return bizstream.post(
      '/product/product-likes/ext/save',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },

  /*
   *  API for Payment
   */

  // 确定选座，生成订单
  createOrder: payload => {
    return bizstream.post('/order/create', undefined, payload, CUSTOMER_TYPE);
  },

  // 支付
  createPayment: payload => {
    return bizstream.post('/order/pay', undefined, payload, CUSTOMER_TYPE);
  },

  // 创建朋友卡订单
  createOrderBuy: payload => {
    return bizstream.post('/order/buy', undefined, payload, CUSTOMER_TYPE);
  },

  // 创建福袋
  createOrderSell: payload => {
    return bizstream.post('/order/sell', undefined, payload, CUSTOMER_TYPE);
  },

  // 取消订单
  cancelOrder: orderId => {
    return bizstream.post(
      orderId ? `/order/cancel/${orderId}` : '/order/cancel',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },



  // 获取代金券
  getVouchers: () => {
    return bizstream
      .get('/api/party/cashcoupon/list', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes);
  },


  getOwnCardList: (productTypeId, thatCd) =>
    bizstream.get(
      `/api/shop/cardRuleList/${productTypeId}/${thatCd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  getOwnCards: productTypeId =>
    bizstream.get(
      `/api/party/card/nonrecharge/list/${productTypeId}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),


});
