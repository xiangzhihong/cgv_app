import React, { useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView/LoadingView';
import CatalogGridItem from '../CatalogGridItem/CatalogGridItem';
import { ProductType } from '../../types';
import { SPACING } from '../../constants';

const propTypes = {
  products: PropTypes.arrayOf(ProductType),
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  stateAccessor: PropTypes.string.isRequired,
  showHorizontalList: PropTypes.bool.isRequired,
  columnCount: PropTypes.number,
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  isLoadingMoreProducts: PropTypes.oneOf(Object.values(Status)).isRequired,
  canLoadMoreProducts: PropTypes.bool.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadFactor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  updateItem: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  products: [],
  columnCount: 1,
  errorMessage: null,
};

const CatalogGrid = ({
  products,
  currencySymbol,
  currencyRate,
  showHorizontalList,
  columnCount,
  onItemClick,
  status,
  isLoadingMoreProducts,
  canLoadMoreProducts,
  loadProducts,
  updateItem,
  loadFactor,
  stateAccessor,
}) => {
  // const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (status === Status.DEFAULT) {
      loadProducts(loadFactor);
    }
  }, []);

  const getLayoutManager = () => {
    const layoutManager = {};
    if (showHorizontalList) {
      layoutManager.horizontal = true;
      layoutManager.showsHorizontalScrollIndicator = false;
      layoutManager.ItemSeparatorComponent = () => (
        <View style={{ width: SPACING.large }} />
      );
      layoutManager.contentContainerStyle = { padding: SPACING.large };
    } else {
      layoutManager.numColumns = columnCount;
    }
    return layoutManager;
  };

  const renderRow = ({ item }) => (
    <CatalogGridItem
      columnCount={columnCount}
      product={item}
      stateAccessor={stateAccessor}
      updateItem={updateItem}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
      onPress={onItemClick}
    />
  );

  const renderFooter = () => {
    if (canLoadMoreProducts) {
      return <LoadingView size="small" />;
    }
    return null;
  };

  const onEndReached = () => {
    if (isLoadingMoreProducts !== Status.LOADING && canLoadMoreProducts) {
      const sortOrder = null;
      loadProducts(loadFactor, products.length, sortOrder);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        {...getLayoutManager()}
        data={products}
        renderItem={renderRow}
        keyExtractor={item => String(item.sku)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

CatalogGrid.propTypes = propTypes;

CatalogGrid.defaultProps = defaultProps;

export default CatalogGrid;
