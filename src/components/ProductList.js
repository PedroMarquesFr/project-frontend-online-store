import React, { Component } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import '../styles/productList.css';

import Product from './Product';

class ProductList extends Component {
  render() {
    const {
      results,
      isFetching,
      error,
      category,
      searchKey,
      updateCartTotal,
    } = this.props;
    if (error) {
      return <div>{error}</div>;
    }
    if (isFetching) {
      return <div>Loading...</div>;
    }
    return (
      <div className="div-prod-list">
        {results.map(
          ({
            title,
            thumbnail,
            price,
            id,
            available_quantity: availableQuantity,
            shipping,
          }) => (
            <Product
              title={title}
              thumbnail={thumbnail}
              price={price}
              key={id}
              id={id}
              category={category}
              searchKey={searchKey}
              updateCartTotal={updateCartTotal}
              availableQuantity={availableQuantity}
              freeShipping={shipping.free_shipping}
            />
          ),
        )}
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ APIRequest: { isFetching, products, error } }) => ({
  isFetching,
  results: products,
  error,
});

export default connect(mapStateToProps)(ProductList);

ProductList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  category: PropTypes.string,
  searchKey: PropTypes.string.isRequired,
  updateCartTotal: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  category: undefined,
};
