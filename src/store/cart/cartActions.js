const CREATE_QUOTE_ID_REQUEST = 'CREATE_QUOTE_ID_REQUEST ';
const CUSTOMER_CART_REQUEST = 'CUSTOMER_CART_REQUEST ';
const CART_ITEM_PRODUCT_REQUEST = 'CART_ITEM_PRODUCT_REQUEST ';
const REMOVE_ITEM_FROM_CART_REQUEST = 'REMOVE_ITEM_FROM_CART_REQUEST ';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';       //加入商品
const REDUCE_ITEM_IN_CART = ' REDUCE_ITEM_IN_CART ';  //删除商品
const CLEAR_CART = ' CLEAR_CART ';                     //清理购物车

export function removeItemFromCart(){
    return {type: REMOVE_ITEM_FROM_CART_REQUEST}
}

export function getCartItemProduct(){
    return {type: CART_ITEM_PRODUCT_REQUEST}
}

export function getCustomerCart(){
    return {type: CUSTOMER_CART_REQUEST}
}

export function createQuoteId(){
    return {type: CREATE_QUOTE_ID_REQUEST}
}

export function addItemToCart() {
    return {type: ADD_ITEM_TO_CART}
}

export function reduceItemInCart() {
    return {type: REDUCE_ITEM_IN_CART}
}

export function clearCart() {
    return {type: CLEAR_CART}
}
