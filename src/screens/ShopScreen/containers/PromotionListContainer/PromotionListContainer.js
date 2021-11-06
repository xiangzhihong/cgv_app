import React from 'react';
import PropTypes from 'prop-types';
import CatalogGrid from '../../../../common/CatalogGrid/CatalogGrid';
import Status from '../../../../bizstream/Status';
import { ProductType } from '../../../../types';

const PromotionListContainer = ({
  categoryId,
  products,
  currencySymbol,
  currencyRate,
  totalCount,
  status,
  errorMessage,
  loadingMoreStatus,
  getCategoryProducts: _getCategoryProducts,
  setCurrentProduct: _setCurrentProduct,
}) => {
  const canLoadMoreProducts = products.length < totalCount;
  const showHorizontalList = false;
  const columnCount = 2;
  const stateAccessor = 'categoryList';

  return (
    <CatalogGrid
      loadFactor={categoryId}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
      stateAccessor={stateAccessor}
      updateItem={getCategoryConfigurableProductOptions}
      products={products}
      status={status}
      errorMessage={errorMessage}
      showHorizontalList={showHorizontalList}
      columnCount={columnCount}
      canLoadMoreProducts={canLoadMoreProducts}
      isLoadingMoreProducts={loadingMoreStatus}
      onItemClick={_setCurrentProduct}
      loadProducts={_getCategoryProducts}
    />
  );
};

PromotionListContainer.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  loadingMoreStatus: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  categoryId: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(ProductType),
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  totalCount: PropTypes.number,
  setCurrentProduct: PropTypes.func.isRequired,
  getCategoryProducts: PropTypes.func.isRequired,
};

PromotionListContainer.defaultProps = {
  products: [],
  totalCount: 0,
  errorMessage: '',
};

export default PromotionListContainer;
