import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {editProduct, removeProduct} from '../store/ducks/CartItems/actions';

class CartItem extends Component {

  render() {
    const { title, thumbnail, price, id, quantity, availableQuantity, editProduct, removeProduct } = this.props;
    return (
      <div key={ id }>
        <h2 data-testid="shopping-cart-product-name">{title}</h2>
        <img src={ thumbnail } alt="thumb" />
        <p>{price}</p>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`${quantity} de ${availableQuantity}`}
        </p>
        <button
          disabled={ quantity <= 1 }
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ ()=>editProduct(id,false) }
        >
          -
        </button>
        <button
          disabled={ quantity >= availableQuantity }
          type="button"
          data-testid="product-increase-quantity"
          onClick={ ()=>editProduct(id,true) }
        >
          +
        </button>
        <button
          type="button"
          data-testid="product-remove"
          onClick={ ()=>removeProduct(id) }
        >
          ×
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { editProduct, removeProduct };

export default connect(null, mapDispatchToProps)(CartItem);

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

