import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import { isNumber, formatPrice } from './utils';
import { SPACING } from '../../constants';

const propTypes = {
  currencySymbol: PropTypes.string,
  currencyRate: PropTypes.number,
  basePrice: PropTypes.number,
  discountPrice: PropTypes.number,
  startingPrice: PropTypes.oneOfType([PropTypes.number, undefined]),
  endingPrice: PropTypes.oneOfType([PropTypes.number, undefined]),
};

const defaultProps = {
  basePrice: 0,
  discountPrice: 0,
  startingPrice: undefined,
  endingPrice: undefined,
  currencySymbol: '¥',
  currencyRate: 1
};

const Price = ({
  currencySymbol,
  currencyRate,
  basePrice,
  discountPrice,
  startingPrice,
  endingPrice,
}) => {
  const isBold = () => discountPrice && discountPrice < basePrice;
  const renderDiscountPrice = () =>
    discountPrice === basePrice ? null : (
      <Text
        type="label"
        bold={isBold()}
        style={styles.discountPriceText}
      >{`${currencySymbol}${formatPrice(discountPrice)}`}</Text>
    );

  if (isNumber(startingPrice)) {
    return (
      <View style={styles.container}>
        {!isNumber(endingPrice) ? <Text>From </Text> : null}
        <Text type="label" bold>{`${currencySymbol}${formatPrice(
          startingPrice,
          currencyRate,
        )}`}</Text>
        {isNumber(endingPrice) ? (
          <Text type="label" bold>{` - ${currencySymbol}${formatPrice(
            endingPrice,
            currencyRate,
          )}`}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {discountPrice ? renderDiscountPrice() : null}
      <Text
        type="label"
        bold={!isBold()}
        style={styles.basePriceText(basePrice, discountPrice)}
      >{`${currencySymbol}${formatPrice(basePrice, currencyRate)}`}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
  },
  discountPriceText: {
    marginEnd: SPACING.tiny,
  },
  basePriceText: (basePrice, discountPrice) => ({
    textDecorationLine:
      discountPrice && discountPrice < basePrice ? 'line-through' : 'none',
  }),
};

Price.propTypes = propTypes;

Price.defaultProps = defaultProps;

export default Price;
