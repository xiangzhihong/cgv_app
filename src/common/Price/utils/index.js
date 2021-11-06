export const isNumber = input =>
  typeof input === 'number' && /^-?[\d.]+(?:e-?\d+)?$/.test(input);

export const formatPrice = (price, currencyRate) => {
  if (!isNumber(price)) {
    return 0;
  }
  return parseFloat((price * currencyRate).toFixed(2));
};
