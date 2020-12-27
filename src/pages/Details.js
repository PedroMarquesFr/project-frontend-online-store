import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addProduct } from '../store/ducks/CartItems/actions';

import Rating from '../components/Rating';
import DetailsForm from '../components/DetailsForm';
import updateCartTotalinLocalStorage from '../services/updateCartTotal';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      rate: '',
      evaluation: '',
      ratings: [],
    };
    this.handleState = this.handleState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterEvaluations = this.filterEvaluations.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateCartTotal = this.updateCartTotal.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('evaluations') === null) {
      localStorage.setItem(
        'evaluations',
        JSON.stringify([
          ['id', 'nome', 'nota', 'comentário'],
          ['id', 'nome', 'nota', 'comentário'],
        ]),
      );
    }
    this.filterEvaluations();
    this.updateCartTotal();
  }

  filterEvaluations() {
    const evaluations = JSON.parse(localStorage.getItem('evaluations'));
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({
      ratings: evaluations.filter((rate) => rate[0] === id),
    });
  }

  addToCart() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { addProduct, products } = this.props;
    const { title, price, availableQuantity, quantity, thumbnail } = products.find(
      (product) => product.id === id,
    );
    addProduct({ id, title, price, availableQuantity, quantity, thumbnail });
  }

  updateCartTotal() {
    const total = updateCartTotalinLocalStorage();
    this.setState({ total });
  }

  handleState(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { name, rate, evaluation } = this.state;
    const evaluations = JSON.parse(localStorage.getItem('evaluations'));
    console.log(evaluations);
    evaluations.push([id, name, rate, evaluation]);
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
    this.setState({
      ratings: evaluations.filter((evalu) => evalu[0] === id),
    });
  }

  render() {
    const { ratings, total } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { products } = this.props;
    const product = products.find((product) => product.id === id);
    const isEmpty = 0;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <BiCart className="icon-cart" />
          {total !== isEmpty && <div data-testid="shopping-cart-size">{total}</div>}
        </Link>
        <div>
          <h2 data-testid="product-detail-name">{product.title}</h2>
          <img src={product.thumbnail} alt="thumb" />
          <p>{product.price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={this.addToCart}
            className="defaultButton"
          >
            Adicionar ao carrinho
          </button>
          <div className="evaluation">
            <DetailsForm
              handleState={this.handleState}
              handleSubmit={this.handleSubmit}
            />
            <section>
              <Rating ratings={ratings} />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ APIRequest: { products, error } }) => ({
  products,
  error,
});

const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(Details);

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      searchKey: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
