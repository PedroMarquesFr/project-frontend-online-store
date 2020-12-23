import React, { Component } from 'react';

import { connect } from 'react-redux';
import {addProduct} from '../store/ducks/CartItems/actions';

import '../styles/product.css';
import { MdLocalShipping } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import addToCart from '../services/addToCart';

class Product extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { title, thumbnail, price, id, availableQuantity, addProduct} = this.props;
    addProduct({ title, thumbnail, price, id, availableQuantity, quantity:1});
  }

  render() {
    const { title, thumbnail, price, id, freeShipping } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={`./details/${id}`}>
          {freeShipping ? (
            <p className="p-free-shipping">
              <MdLocalShipping data-testid="free-shipping" />
              Envio grátis
            </p>
          ) : null}
          <img src={thumbnail} alt="thumb-product" />
          <h3 className="h3-title">{title}</h3>
          <p className="p-price">{price}</p>
        </Link>
        <button type="button" data-testid="product-add-to-cart" onClick={this.addToCart}>
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { addProduct };

export default connect(null, mapDispatchToProps)(Product);

Product.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string,
  searchKey: PropTypes.string.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  freeShipping: PropTypes.bool.isRequired,
  updateCartTotal: PropTypes.func.isRequired,
};

Product.defaultProps = {
  category: undefined,
};

