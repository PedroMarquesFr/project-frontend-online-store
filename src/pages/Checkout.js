import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import '../styles/checklist.css';

class Checkout extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.showCartProducts = this.showCartProducts.bind(this);
    this.treatingForm = this.treatingForm.bind(this);
    this.redirectHandle = this.redirectHandle.bind(this);
    this.state = {
      fullName: '',
      email: '',
      cpf: '',
      phoneNumber: '',
      cep: '',
      address: '',
      isValid: false,
      redirect: false,
    };
  }

  treatingForm() {
    const array = Object.values(this.state);
    const none = 0;

    array.pop();
    const allEmptyInputs = array.filter((string) => string.length < 1);

    if (allEmptyInputs.length === none) {
      this.setState({
        isValid: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.treatingForm,
    );
  }

  showCartProducts() {
    const products = this.props.cart;
    const ZERO = 0;
    let sum = ZERO;
    return (
      <div>
        {products.map(({ title, thumbnail, price, quantity, id }) => {
          sum += price * quantity;
          return (
            <div className="div-content" key={id}>
              <p className="p-title">{title}</p>
              <img className="img-item" src={thumbnail} alt="thumb" />
              <p className="p-price">{price}</p>
              <p className="p-quantity">{quantity}</p>
            </div>
          );
        })}
        <h3>
          Valor:
          {sum}
        </h3>
      </div>
    );
  }

  redirectHandle() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const {
      fullName,
      email,
      cpf,
      phoneNumber,
      cep,
      address,
      isValid,
      redirect,
    } = this.state;
    return (
      <div>
        {this.showCartProducts()}
        <CheckoutForm
          handleChange={this.handleChange}
          fullName={fullName}
          email={email}
          cpf={cpf}
          phoneNumber={phoneNumber}
          cep={cep}
          address={address}
        />
        <button className="defaultButton" type="submit" disabled={!isValid} onClick={this.redirectHandle}>
          Finalizar Compra
        </button>
        {redirect && <Redirect to="./" />}
        {redirect && alert('Obrigado por testar o projeto :D')}
      </div>
    );
  }
}

const mapStateToProps = ({ CartItems: { cart } }) => ({
  cart,
});

export default connect(mapStateToProps)(Checkout);
