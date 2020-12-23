import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {editProduct, removeProduct} from '../store/ducks/CartItems/actions';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  increaseQuantity() {
    const { updateQuantity, id } = this.props;
    let { quantity } = this.props;
    quantity += 1;
    updateQuantity({ id, quantity });
  }

  decreaseQuantity() {
    const { updateQuantity, id } = this.props;
    let { quantity } = this.props;
    if (quantity > 1) {
      quantity -= 1;
      updateQuantity({ id, quantity });
    } else {
      quantity = 1;
      updateQuantity({ id, quantity });
    }
  }

  removeItem() {
    const { removeItem, id } = this.props;
    removeItem(id);
  }

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
  updateQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

