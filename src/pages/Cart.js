import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import CartItem from '../components/CartItem';
import '../styles/home.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  render() {
    const { cartItems } = this.props;
    console.log(cartItems);

    const { redirect } = this.state;
    return (
      <div>
        {cartItems.map(({ title, thumbnail, price, id, quantity, availableQuantity }) => (
          <CartItem
            title={title}
            thumbnail={thumbnail}
            price={price}
            id={id}
            key={id}
            quantity={quantity}
            availableQuantity={availableQuantity}
          />
        ))}
        <div>
          <button
            data-testid="checkout-products"
            type="button"
            onClick={() => {
              this.setState({ redirect: true });
            }}
            className="defaultButton"
          >
            Finalizar compras
          </button>
          {redirect && <Redirect to="/checkout" />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ CartItems: { cart } }) => ({
  cartItems: cart,
});

export default connect(mapStateToProps)(Cart);
