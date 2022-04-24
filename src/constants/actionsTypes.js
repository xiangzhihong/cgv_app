const REQUEST = 'REQUEST'
const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

const suffixTypes = [REQUEST, LOADING, SUCCESS, FAILURE]

function createRequestTypes(prefix = '', bases, suffixes = suffixTypes) {
  const req = {}
  bases.forEach(base => {
    suffixes.forEach(suffix => {
      req[`${base}_${suffix}`] = `${prefix}_${base}_${suffix}`
    })
  })
  return req
}

// Events related to BIZSTREAM REST API
export const BIZSTREAM = createRequestTypes(
  'BIZSTREAM',
  [
    'INIT_APP', // Configure bizstream with admin credentials, access token and base url
    'CURRENCY', // Default currency, currency symbol, exchange rates
    'HOME_DATA', // Fetch HomeBanner and featured products for home page
    'FEATURED_CATEGORY_PRODUCTS', // Fetch featured categories for home page
    'HOME_UPDATE_CONF_PRODUCT', // For each configurable product in featured category, fetch it's children, to calculate price
    'CATEGORY_TREE', // Fetch category tree
    'LOCATION', // location
    'ON_SELECT_CURRENT_CINEMA',
    'ROUTER_NAME_CURRENT',
    'ROUTER_NAME_PREVIOUS',
    'HOME_POP_DATA',
    'SAVE_HOME_CLOSE_TIME',
    'SUGGESTIONS_ENUM_LIST',
    /**
     * ======================================================
     * ===== {@link HomePage} related actions ======
     * ======================================================
     */
    'CITIES',
    'NOTICES',
    'HOME_TOP_BANNER',
    'HOME_BOTTOM_BANNER',
    'ON_PLAYING_MOVIES',
    'COMING_SOON_MOVIES',
    'FAVORITE_MOVIES',
    'CINEMAS_BY_CITY',
    'MOVIE_DETAIL_STILL',
    'MOVIE_COMMENTS',
    'MOVIE_TOPICS',

    /**
     * ======================================================
     * ===== {@link PromotionPage} related actions ======
     * ======================================================
     */
    'CURRENT_PROMOTIONS_BY_CINEMA',
    'FINISHED_PROMOTIONS_BY_CINEMA',

    /**
     * ======================================================
     * ===== {@link ProductDetailPage} related actions ======
     * ======================================================
     */
    // 'CONF_OPTIONS', // Product is configurable type, fetch all options
    // 'PRODUCT_MEDIA', // Fetch images related to products
    // 'CONFIGURABLE_CHILDREN', // Fetch child products of configurable product
    // 'ADD_TO_CART', // Add item to cart

    /**
     * ==========================================
     * =================== @ ====================
     * ==========================================
     */
    'SIGN_IN', // Sign in already existing user
    'SIGN_UP', // Create new user account
    'CURRENT_USER', // Fetch details of current logged in user
    'GET_ORDERS', // Fetch all order placed by current customer
    'CATEGORY_PRODUCTS', // Fetch all products in a category
    'CATEGORY_UPDATE_CONF_PRODUCT', // Fetch price of configurable product in category list
    'MORE_CATEGORY_PRODUCTS', // Pagination in category list
    'SEARCH_PRODUCTS', // Load search products
    'MORE_SEARCH_PRODUCTS', // pagination in search
    'CREATE_QUOTE_ID', // Create new quote id for cart
    'CUSTOMER_CART', // Get cart of logged in user
    'CART_ITEM_PRODUCT', // fetch details of items present in cart
    'REMOVE_ITEM_FROM_CART', // Remove an item from a cart
    'COUNTRIES', // Get all available countries along with their state
    'ADD_CART_BILLING_ADDRESS', // Add new billing address for a cart
    'GET_SHIPPING_METHOD', // Get shipping method
    'ADD_CART_SHIPPING_INFO', // Send billing, shipping, shipping method
    'PLACE_CART_ORDER', // Place cart order
    'ORDER_DETAIL', // Fetch order detail, using orderId
    'RESET_PASSWORD',
    'GET_ORDERED_PRODUCT_INFO',
    'ADD_ACCOUNT_ADDRESS', // Update Address associated with the account

    'CREATE_TICKET_ORDER',
    'PLACE_TICKET_ORDER',
    'PLACE_PRODUCT_ORDER',
    'CANCEL_ORDER',
    'ADD_TO_CART',
    'REMOVE_FROM_CART',
    'UPDATE_QTY_CART',
    'UPDATE_CHECKOUT_SPECIAL_PROMO',
    'UPDATE_CHECKOUT_TICKET_COUPON',
    'UPDATE_CHECKOUT_TICKET_MEMBER_CARD',
    'UPDATE_CHECKOUT_TICKET_VOUCHER',
    'UPDATE_CHECKOUT_PRODUCT_COUPONS',
    'UPDATE_CHECKOUT_PAY_METHOD_MEMBER_CARD',
    'UPDATE_CHECKOUT_PAY_METHOD_GIFT_CARD',
    'UPDATE_CHECKOUT_PAY_METHOD_POINT',
    'UPDATE_CHECKOUT_PAY_METHOD_THIRDPARTY',
    'UPDATE_CHECKOUT_CONTACT',

    'GET_DSC_RESULT', // 获取特惠活动
    'GET_AVAILABLE_PROMOTIONS', // 获取特惠活动
    'GET_BEST_DISCOUNT', // 获取最优惠
    'GET_USABLE_COUPONS_CARDS', // 获取优惠券
    'GET_VOUCHERS', // 获取代金券
    'GET_GIFTCARDS', // 获取星意卡
    'GET_UNIONPAY_AD', // 云闪付宣传语
    'GET_DISCOUNT_PRICE', // 优惠后的价格
    'GET_PAYMENT_METHOD', // 获取支付方式
    'UPDATE_ORDER_STATUS', // 更新订单状态
    'EDIT_MOBILE_NUMBER',
    'GET_SHOP_PRODUCTS', // 获取卖品列表
    'GET_CUSTOMER_POINT', // 获取积分
    'GET_CUSTOMER_PONINT', // 获取积分
    // 'GET_COUPON_BY_POINT', // 积分兑换优惠券的列表显示
    // 'CHANGE_POINT_TO_COUPON', // 使用积分兑换优惠券
    // 'CREATE_PAYMENT', // 支付
    // 'CANCEL_ORDER', // 取消订单

  ],
  suffixTypes,
)

// Events related to UI interaction
export const UI = createRequestTypes(
  'UI',
  [
    /**
     * ======================================================
     * ===== {@link ProductDetailPage} related actions ======
     * ======================================================
     */
    'OPEN_SELECTED_PRODUCT', // Fetch details regarding current selected product for viewing
    'CHANGE_PRODUCT_OPTIONS', // Set options of `configurable` type product from picker into store
  ],
  suffixTypes,
)

export const ACTION_USER_LOGOUT = 'USER_LOGOUT'
export const RESET_ADD_TO_CART_STATE = 'RESET_ADD_TO_CART_STATE'
export const USER_LOGGED_IN_STATUS = 'IS_USER_LOGGED_IN'
export const RESET_AUTH_STATE = 'RESET_AUTH_STATE'
export const SET_NEW_CATEGORY = 'SET_NEW_CATEGORY'
export const RESET_CHECKOUT_ADDRESS_STATE = 'RESET_CHECKOUT_ADDRESS_STATE'
export const RESET_SHIPPING_STATE = 'RESET_SHIPPING_STATE'
export const RESET_PAYMENT_STATE = 'RESET_PAYMENT_STATE'
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const RESET_ADDRESS_STATUS = 'RESET_ADDRESS_STATUS'

export const RESET_CHECKOUT_STATE = 'RESET_CHECKOUT_STATE' // Reset entire checkout reducer
export const RESET_CHECKOUT_TICKET_STATE = 'RESET_CHECKOUT_TICKET_STATE'
export const RESET_CHECKOUT_PRODUCT_STATE = 'RESET_CHECKOUT_PRODUCT_STATE'
export const RESET_CHECKOUT_COUPON_STATE = 'RESET_CHECKOUT_COUPON_STATE'


// 购物车
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const REDUCE_ITEM_IN_CART = 'REDUCE_ITEM_IN_CART'
export const CLEAR_CART = 'CLEAR_CART'

// 用户相关
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
