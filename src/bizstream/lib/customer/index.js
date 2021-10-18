import {Platform} from 'react-native';
import {ADMIN_TYPE, CUSTOMER_TYPE} from '../../types';
import store from '../../../store';
import {AESUtils} from '../../../utils';

const handleRes = ({code, data, message}) => {
  if (code === 200) {
    return data;
  }
  throw new Error(message);
};

export default bizstream => ({
  /*
   * TODO：福袋抽奖
   * */
  promoInKind: data => {
    return bizstream.post(
      '/product/api/promo/inKind',
      undefined,
      data,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：实体奖品录入
   * */
  promoAward: (productPromoId, thatCd) => {
    return bizstream.get(
      `/product/api/promo/award?productPromoId=${productPromoId}&chnlNo=07&thatCd=${thatCd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：查询是否有优惠券
   * */
  findHasGoodsCoupon: () => {
    return bizstream.get(
      '/api/party/coupon/findHasGoodsCoupon',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：查询电影开播三十分钟内的电影
   * */
  selectBeginNoteDetail: () => {
    return bizstream.get(
      '/api/selectBeginNoteDetail',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：位置更新最近影院
   * */
  proThatsRecent: (latitude, longitude) => {
    return bizstream.get(
      `/product/thats/recent?latitude=${latitude}&longitude=${longitude}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：编辑个人信息积分更新
   * */
  promoPoint: (point, thatCd) => {
    return bizstream.post(
      `/product/api/promo/makeup/points?percentage=${point}&chnlNo=07&thatCd=${thatCd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：获取打烊时间
   * */
  attrTime: id => {
    return bizstream.get(
      `/facility/attr/all/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：一般活动列表统计
   * */
  countHitcnt: (id, channel = '05') => {
    return bizstream.post(
      '/product/api/promo/type_1/countHitcnt',
      undefined,
      {
        chnlNo: channel,
        productPromoId: id,
      },
      CUSTOMER_TYPE,
    );
  },

  /*
   * TODO：一般活动详情统计
   * */
  countUrlHitcnt: (id, channel = '05') => {
    return bizstream.post(
      '/product/api/promo/type_1/countUrlHitcnt',
      undefined,
      {
        chnlNo: channel,
        productPromoId: id,
      },
      CUSTOMER_TYPE,
    );
  },

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
   * TODO：观影人选择判断
   * */
  getSeenPeo: () => {
    return bizstream.get(
      '/party/api/getPropertyGetByPropertyId?resourceId=real.name.system&propertyId=real.name.system',
    );
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
   * TODO： 评论分享次数
   * */
  saveProductReviewShare: id =>
    bizstream.post(
      `/product/product-reviews/ext/saveProductReviewShare/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

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
   * TODO： 我的话题评论列表
   * */
  myChartList: data =>
    bizstream.post(
      '/product/survey-responses/ext/queryOwnTopicResponse',
      undefined,
      data,
      CUSTOMER_TYPE,
    ),
  /*
   * TODO： 删除我的评论
   * */
  delMyTopicResponse: id =>
    bizstream.delete(
      `/product/survey-responses/ext/deleteTopicResponse/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO： 删除我的评论
   * */
  delMyComment: id =>
    bizstream.delete(
      `/product/product-reviews/ext/deleteproductReview/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO： 我的评论
   * */
  myCommentList: data =>
    bizstream.post(
      '/product/product-reviews/ext/list-own',
      undefined,
      data,
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
   * TODO： 推荐的优惠组合
   * */
  orderMemDis: data =>
    bizstream.post('/order/mem/dis', undefined, data, CUSTOMER_TYPE),

  /*
   * TODO： 添加优惠券
   * */
  couponBind: data =>
    bizstream.post('/api/party/coupon/bind', undefined, data, CUSTOMER_TYPE),

  /*
   * TODO： 使用优惠券验证，获取减免结果
   * */
  getDscResult: data =>
    bizstream.post('/order/getDscResult', undefined, data, CUSTOMER_TYPE),

  /*
   * TODO： 新增观影人
   * */
  addSHowPeople: data =>
    bizstream.get(
      `/api/party/addPartyShadow?name=${data.name}&carNo=${data.carNo}&type=${data.type}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO： 获取数据字典
   * */
  getEnumList: (type = 'REAL_NAME_TYPE') =>
    bizstream.get(
      `/api/enum/list/${type}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO： 删除观影人
   * */
  delShadowById: id =>
    bizstream.get(
      `/api/party/deletePartyShadowById/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO： 常用观影人列表
   * */
  getFindPartyShadow: () =>
    bizstream.get(
      '/api/party/findPartyShadowByPartyId',
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
   * TODO： 验证星意卡
   * */
  getCgvValid: data =>
    bizstream.post('/cgv/valid', undefined, data, CUSTOMER_TYPE),

  /*
   * TODO： 快速配餐
   * */
  getOrderFoodFast: data =>
    bizstream.post('/order/food/fast', undefined, data, CUSTOMER_TYPE),

  /*
   * TODO：储值卡消费记录
   * */
  getCardRecord: data =>
    bizstream.post(
      '/api/party/card/consume/record',
      undefined,
      data,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：星意卡消费记录
   * */
  getCardXYRecord: id =>
    bizstream.get(
      `/api/party/card/xyk/recourd/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：充值
   * */
  orderRecharge: data =>
    bizstream.post('/order/recharge', undefined, data, CUSTOMER_TYPE),

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
   * TODO：E优卡详情
   * */
  getShopFriendCardDetail: (thatCd, id) => {
    return bizstream.get(`/api/shop/card/${thatCd}/${id}`);
  },

  /*
   * TODO：获取选座前提示
   * */
  getFacility: data =>
    bizstream.post(
      '/facility/api/facility/content/list',
      undefined,
      data,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：电影订单详情
   * */
  getMovieOrderDetail: data =>
    bizstream.get(`/api/order/${data}`, undefined, undefined, CUSTOMER_TYPE),

  /*
   * TODO：退票申请
   * */
  putOrderApply: data =>
    bizstream.put(`/api/order/${data}`, undefined, undefined, CUSTOMER_TYPE),

  /*
   * TODO：根据问题类型查询常见问题 01 购票 02 朋友卡 03 影院
   * */
  contentQuestion: data =>
    bizstream.get(
      `/content/content/question?contentTypeId=${data.contentTypeId}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

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
   * TODO：反馈查询
   * */
  contentQuery: thatcd => {
    return bizstream.get(
      `/content/content/feedback/query/${thatcd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },
  /*
   * TODO：意见反馈
   * */
  contentFeedback: data =>
    bizstream.post(
      '/content/content/feedback/add',
      undefined,
      data,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：分组消息
   * */
  groupListInfo: () =>
    bizstream.get(
      '/api/oln-msg/groupListInfo',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO： 参数 id //更新消息未已读消息
   * */
  updateOlnMsgRead: data =>
    bizstream.get(
      `/content/api/msg/read?msgType=${data.id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：  参数 msgFgCd //根据类型查询消息信息
   * */
  findOlnMsgListByMsgFgCd: data =>
    bizstream.get(
      `/api/oln-msg/findOlnMsgListByMsgFgCd?msgFgCd=${data.msgFgCd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * TODO: 商品详情
   * */
  getGoodDetail: (productCd, productCategoryCd, facilityCd) => {
    const data = {
      facilityCd,
      productCd,
      productCategoryCd,
    };
    return bizstream
      .post('/product/good/set/info-new', undefined, data, CUSTOMER_TYPE)
      .then(handleRes);
  },

  /*
   * TODO：商品点赞
   * */
  getGoodSetInfo: data =>
    bizstream.post(
      '/product/product-likes/ext/save',
      undefined,
      {channel: 'APP', ...data},
      CUSTOMER_TYPE,
    ),

  /*
   * TODO：Movies have seen
   * TODO：看过的电影
   * */
  getSeenMovieList: () =>
    bizstream.post('/order/api/saw', undefined, undefined, CUSTOMER_TYPE),

  getCurrentCustomer: () =>
    bizstream.get('/party', undefined, undefined, CUSTOMER_TYPE),

  addItemToCart: payload =>
    bizstream.post('/V1/carts/mine/items', undefined, payload, CUSTOMER_TYPE),

  getCustomerCart: () =>
    bizstream.get('/V1/carts/mine', undefined, undefined, CUSTOMER_TYPE),

  removeItemFromCart: itemId =>
    bizstream.delete(
      `/V1/carts/mine/items/${itemId}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  addCartBillingAddress: address =>
    bizstream.post(
      '/V1/carts/mine/billing-address',
      undefined,
      address,
      CUSTOMER_TYPE,
    ),

  getShippingMethod: address =>
    bizstream.post(
      '/V1/carts/mine/estimate-shipping-methods',
      undefined,
      address,
      CUSTOMER_TYPE,
    ),

  addCartShippingInfo: address =>
    bizstream.post(
      '/V1/carts/mine/shipping-information',
      undefined,
      address,
      CUSTOMER_TYPE,
    ),

  placeCartOrder: paymentInformation =>
    bizstream.post(
      '/V1/carts/mine/payment-information',
      undefined,
      paymentInformation,
      CUSTOMER_TYPE,
    ),

  /*
   *  API for Home
   */

  getHomePop: () => {
    return bizstream.get(
      `/content/api/advert/query?channel=APP&advertType=APP_AD_SYTCGG&thatCd=${
        store.getState().bizstream.selectedCinema.thatCd
      }`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },
  // 全部即映影片（按日期分组）

  getAllUpcomingMovies: (
    currentPage = 0,
    sortField = 'releaseDate',
    sortOrder = 'asc',
    channel = '07',
  ) => {
    const data = {
      currentPage,
      prMainPage: false,
      cityCd: store.getState().bizstream.cityId,
      chnlNo: channel,
      productTypeCd: '3',
      // sortField: {
      //   fieldName: sortField,
      //   sortOrder: sortOrder,
      // },
    };
    return bizstream.post(
      '/product/movie/list-soon-group-new',
      undefined,
      data,
      CUSTOMER_TYPE,
    );
  },

  getMessageCount: messageType => {
    const params = {
      msgFgCd: messageType,
    };
    return bizstream.get(
      '/api/oln-msg/count',
      params,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  getFavoriteMovies: (pageNumber = 0, pageSize = 10, channel = '05') => {
    const data = {
      cityCd: store.getState().bizstream.cityId,
      chnlNo: channel,
      pageNumber,
      pageSize,
    };
    return bizstream.post(
      '/product/movie/like-list-new',
      undefined,
      data,
      CUSTOMER_TYPE,
    );
  },

  // 即映影片目录
  getUpcomingMovies: (pageNumber, channel = '05') => {
    const data = {
      pageNumber,
      cityCd: store.getState().bizstream.cityId,
      chnlNo: channel,
      productTypeCd: '3',
    };
    return bizstream.post(
      '/product/movie/list-soon',
      undefined,
      data,
      CUSTOMER_TYPE,
    );
  },

  // 影片详情
  getMovieWithAttributes: (movieId, channel = '05') => {
    const params = {
      cityCd: store.getState().bizstream.cityId,
      chnlNo: channel,
    };
    return bizstream.get(
      `/product/movie/${movieId}`,
      params,
      undefined,
      CUSTOMER_TYPE,
    );
  },

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

  getCommentDetail: (id, productId, pageNumber, pageSize = 10) => {
    const params = {
      id,
      productId,
      pageNumber,
      pageSize,
    };
    return bizstream.post(
      '/product/product-reviews/ext/productReviewInfo',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },

  getTopicDetail: (id, pageNumber, pageSize = 10) => {
    const params = {
      id,
      pageNumber,
      pageSize,
    };
    return bizstream.post(
      '/product/surveys/ext/getTopicInfo',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },

  // 评论举报
  publishComplaint: targetId => {
    const params = {
      textValue: '',
      complaintType: '1',
      targetId,
    };
    return bizstream.post(
      '/product/product-reviews/ext/saveProductReviewComplaint',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },

  // 话题举报
  publishTopicplaint: targetId => {
    const params = {
      textValue: '',
      complaintType: '1',
      targetId,
    };
    return bizstream.post(
      '/product/survey-responses/ext/topicResponseComplaint/save',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },

  // 留言
  publishComment: (replyText, id) => {
    const params = {
      replyText,
      productReview: {
        id,
      },
    };
    return bizstream.post(
      '/product/product-replies/ext/saveProductReply',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },

  // 影评
  publishMovieComment: (type = '1', productReview, productRating, id) => {
    const params = {
      postedAnonymous: type,
      product: {
        id,
      },
      productRating,
      thatCd: store.getState().bizstream.selectedCinema.thatCd,
      srmCd: store.getState().bizstream.selectedCinema.srmCd,
      productReview,
    };
    return bizstream.post(
      '/product/product-reviews/ext/saveProductReview',
      undefined,
      params,
      CUSTOMER_TYPE,
    );
  },
  // 话题评论
  publishTopic: (replyText, movieId, id, surveyName) => {
    const params = {
      thatCd: store.getState().bizstream.selectedCinema.thatCd,
      srmCd: store.getState().bizstream.selectedCinema.srmCd,
      generalFeedback: replyText,
      productId: movieId,
      survey: {
        id,
        surveyName,
      },
    };
    return bizstream.post(
      '/product/survey-responses/ext/saveTopicResponse',
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

  // 获取特惠活动
  getAvailablePromotions: payload => {
    return bizstream.post(
      '/product/api/promo/preAct/list',
      undefined,
      payload,
      CUSTOMER_TYPE,
    );
  },

  // 获取最优惠
  getBestDisc: payload => {
    return bizstream.post('/order/mem/dis', undefined, payload, CUSTOMER_TYPE);
  },

  // 获取优惠券/朋友卡
  getUsableCouponsAndCardsForSchedule: payload => {
    return bizstream.post('/order/coupons', undefined, payload, CUSTOMER_TYPE);
    // return bizstream.post('/order/best-discount', undefined, payload, CUSTOMER_TYPE)
  },

  // 获取代金券
  getVouchers: () => {
    return bizstream
      .get('/api/party/cashcoupon/list', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes);
  },

  // 获取星意卡
  getGiftCards: moveCd => {
    return bizstream.get(
      `/api/party/card/xyk/${moveCd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  // 获取积分
  getCustomerPoint: () => {
    return bizstream.get('/api/party', undefined, undefined, CUSTOMER_TYPE);
  },

  // 优惠后的价格
  getDiscountPrice: payload => {
    return bizstream.post(
      '/order/getDscResult',
      undefined,
      payload,
      CUSTOMER_TYPE,
    );
  },

  // 获取支付方式
  getPaymentMethod: facilityAttrId => {
    return bizstream.get(
      `/facility/attr/${facilityAttrId}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  // 云闪付宣传语
  getUnionPayAD: cinemaId => {
    const data = {
      thatCd: cinemaId,
    };
    return bizstream.post('/order/union/event', undefined, data, CUSTOMER_TYPE);
  },

  // 积分兑换优惠券的列表显示
  getCouponByPoint: (data = '08') => {
    return bizstream.get(
      `/api/party/point/coupon/list/${data}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  // 使用积分兑换优惠券
  changePointToCoupon: (id, thatcd) => {
    return bizstream.get(
      `/api/party/point/coupon/APP/${id}/${thatcd}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  // 去开卡
  issueCard: (cityId, latitude, longitude) => {
    const params = {
      cityCd: cityId,
      pLati: latitude,
      pLnti: longitude,
    };
    return bizstream.post('/order/coupons', params, undefined, CUSTOMER_TYPE);
  },

  /*
   *  API for MyPage
   */
  getMemberLevel: () => bizstream.get(),

  getMemberPoint: () => bizstream.get(),

  getMemberPointHistories: () => bizstream.get(),

  getWatchedMovies: () => bizstream.get(),

  getReviewsForMovie: () => bizstream.get(),

  getReviewsForTopic: () => bizstream.get(),

  getReviewsForProductAndMemberCard: () => bizstream.get(),

  getClaims: () => bizstream.get(),

  /**
   * 商店
   */

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

  getLastCardEndDate: () =>
    bizstream.get(
      '/api/party/card/todate',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),

  /*
   * 我的 API
   */
  getOrderListForMovieAndProduct: (pageNumber, pageSize = 5) => {
    const data = {
      pageNumber,
      pageSize,
    };
    return bizstream.post('/api/order/list', undefined, data, CUSTOMER_TYPE);
  },

  getOrderDetailForMovieAndProduct: () => bizstream.get(),

  getOrderListForMemberCard: pageNumber => {
    const data = {
      pageNumber,
      pageSize: 5,
    };
    return bizstream.post(
      '/api/order/card/list',
      undefined,
      data,
      CUSTOMER_TYPE,
    );
  },

  getOrderDetail: (status, id) => {
    return bizstream.get(
      `${status === 1 ? '/api/order/card/' : '/api/order/coupon/'}${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    );
  },

  getOrderDetailForMemberCard: () => bizstream.get(),

  getOrderListForGiftCard: pageNumber => {
    const data = {
      pageNumber,
      pageSize: 5,
    };
    return bizstream.post(
      '/api/order/coupon/list',
      undefined,
      data,
      CUSTOMER_TYPE,
    );
  },

  getCouponList: () =>
    bizstream
      .get('/api/party/coupon/list', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes),

  getCashCouponList: () =>
    bizstream
      .get('/api/party/cashcoupon/list', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes),

  getMyFriendCardList: thatCd => {
    return bizstream
      .get(
        `/api/party/card/list/${thatCd}`,
        undefined,
        undefined,
        CUSTOMER_TYPE,
      )
      .then(handleRes);
  },

  getMyFriendCardDetail: id => {
    return bizstream
      .get(`/api/card/${id}`, undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes);
  },

  getUserInfo: () =>
    bizstream
      .get('/api/party', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes),

  //剩余特权退票次数
  getRefundCount: () =>
    bizstream
      .get('/api/refundCount', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes),

  getUserDetail: () =>
    bizstream
      .get('/api/party/detail', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes),

  getPartyArea: (id = 0) =>
    bizstream.get(`/api/party/area/${id}`, undefined, undefined, CUSTOMER_TYPE),
  putUserDetail: data =>
    bizstream.put('/api/party', undefined, data, CUSTOMER_TYPE).then(handleRes),

  putCashCoupon: (cardNo, cardAuthNo, cpnType) => {
    const data = {
      cardNo: AESUtils.AES(cardNo),
      cardAuthNo: AESUtils.AES(cardAuthNo),
      cpnType,
    };
    return bizstream
      .post('/api/party/cpn', undefined, data, CUSTOMER_TYPE)
      .then(handleRes);
  },

  deleteMyOrder: ids =>
    bizstream
      .post('/api/order', undefined, {ids}, CUSTOMER_TYPE)
      .then(handleRes),

  uploadFile: data =>
    bizstream
      .send('/api/file/upload', 'POST', undefined, data, CUSTOMER_TYPE, {
        'Content-Type': 'multipart/form-data',
      })
      .then(handleRes),

  getPaconnies: () => {
    const data = {
      contentTypeId: 'BKN_YH',
    };
    return bizstream
      .post('/product/contents/ext/list', undefined, data, CUSTOMER_TYPE)
      .then(handleRes);
  },

  getIntegralMallUri: (cityCd, thatCd, contentTypeId = 'POINT_URL_MYPAGE') => {
    const params = {
      contentTypeId,
      cityCd,
      thatCd,
    };
    return bizstream
      .get('/api/duiba/login', params, undefined, CUSTOMER_TYPE)
      .then(handleRes);
  },

  getComplaintsAndSuggestions: () =>
    bizstream
      .get('/api/claim/list', undefined, undefined, CUSTOMER_TYPE)
      .then(handleRes),

  getOrderDetailForGiftCard: () => bizstream.get(),

  getPointRecordList: TRSC_BIZ_DV_CD =>
    bizstream
      .post('/api/party/point/list', undefined, {TRSC_BIZ_DV_CD}, CUSTOMER_TYPE)
      .then(handleRes),

  // 活动
  getPromotionListExpired: (andGroupCd, thatCd, chnlNo = '05') => {
    const data = {
      andGroupCd,
      thatCd,
      chnlNo,
      channel: 'APP',
    };
    return bizstream
      .post(
        '/product/api/product/expired/promos',
        undefined,
        data,
        CUSTOMER_TYPE,
      )
      .then(handleRes);
  },

  getParsingToken: token =>
    bizstream
      .get('/api/promo/parsingToken', {token}, undefined, CUSTOMER_TYPE)
      .then(handleRes),

  getOrderNumber: fdId =>
    bizstream.post('/facility/attr/saled', undefined, {fdId}, CUSTOMER_TYPE),

  getInvitedFriendCountAndUrl: (productPromoId, baseUrl, chnlNo = '05') => {
    const data = {
      productPromoId,
      baseUrl,
      chnlNo,
    };
    return bizstream
      .post('/product/api/promo/inviteFriends', undefined, data, CUSTOMER_TYPE)
      .then(handleRes);
  },
});
