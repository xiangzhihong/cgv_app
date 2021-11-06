import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Text from '../Text/Text';
import Image from '../Image/Image';
import Card from '../Card/Card';
import Price from '../Price/Price';
import { NAVIGATION_TO_PRODUCT_SCREEN } from '../../navigation/routes';
import { getProductThumbnailFromAttribute } from '../../utils/products';
// import { ThemeContext } from '../../theme';
import { ProductType } from '../../types';
import { DIMENS, SPACING } from '../../constants';

const propTypes = {
  product: ProductType.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  stateAccessor: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  columnCount: PropTypes.number,
};

const defaultProps = {
  columnCount: 1,
};

const CatalogGridItem = ({
  columnCount,
  product,
  currencySymbol,
  currencyRate,
  onPress,
  stateAccessor,
  updateItem,
}) => {
  // const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const extra = useSelector(state =>
    (state) => state[stateAccessor].extra?.[product.sku] ?? null,
  );
  useEffect(() => {
    // componentDidMount
    if (!extra && product.type_id === 'configurable') {
      dispatch(updateItem(product.sku));
    }
  }, []);

  const onItemPress = () => {
    onPress(product.type_id, product.sku, extra ? extra.children : undefined);
    navigation.navigate(NAVIGATION_TO_PRODUCT_SCREEN, {
      product,
      title: product.name,
    });
  };

  /**
   * @todo extract it into util function
   */
  const getPrice = () => {
    const priceProps = {};
    const { price } = product;
    priceProps.basePrice = price;
    switch (product.type_id) {
      case 'configurable':
        if (extra && extra.price) {
          if (extra.price.starting === extra.price.ending) {
            priceProps.basePrice = extra.price.starting;
          } else {
            priceProps.startingPrice = extra.price.starting;
            priceProps.endingPrice = extra.price.ending;
          }
        }
        break;
      default:
    }
    return priceProps;
  };

  return (
    <Card
      type="outline"
      style={[styles.container(theme, columnCount)]}
      onPress={onItemPress}
    >
      <Image
        source={{ uri: getProductThumbnailFromAttribute(product) }}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={styles.detail}>
        <Text ellipsizeMode="tail" numberOfLines={2}>
          {product.name}
        </Text>
        <Price
          {...getPrice()}
          currencyRate={currencyRate}
          currencySymbol={currencySymbol}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIMENS.catalogGridItemWidth,
    height: DIMENS.catalogGridItemHeight,
  },
  imageStyle: {
    height: DIMENS.catalogGridItemImageHeight,
  },
  detail: {
    padding: SPACING.small,
    flex: 1,
    justifyContent: 'space-between',
  },
});

CatalogGridItem.propTypes = propTypes;

CatalogGridItem.defaultProps = defaultProps;

export default CatalogGridItem;
