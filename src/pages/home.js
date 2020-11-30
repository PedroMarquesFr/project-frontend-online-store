import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import {BiCart} from 'react-icons/bi'

import Categories from '../components/Categories';
import ProductList from '../components/ProductList';

class Home extends Component {
  constructor() {
    super();

    this.handleSearchKey = this.handleSearchKey.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);

    this.state = {
      searchKey: '',
      category: '',
      results: [],
    };
  }

  handleSearchKey({ target }) {
    this.setState({
      searchKey: target.value,
    });
  }

  async fetchAPI() {
    const { searchKey, category } = this.state;
    const request = await api.getProductsFromCategoryAndQuery(category, searchKey);

    this.setState({
      results: request.results,
    });
  }

  async handleCategory(category) {
    this.setState(
      {
        category,
      },
      () => this.fetchAPI(),
    );
  }

  render() {
    const { results, category, searchKey } = this.state;
    return (
      <div>
        <header>
          <div>
            <input
              data-testid="query-input"
              type="text"
              onChange={ this.handleSearchKey }
            />
            <button type="submit" data-testid="query-button" onClick={this.fetchAPI}>
              Search
            </button>
          </div>
          <Link to="/cart" data-testid="shopping-cart-button">
            <BiCart className="icon-cart" />
          </Link>
        </header>
        <div className="div-body">
          <Categories filterCategory={ this.handleCategory } />
          <ProductList results={ results } category={ category } searchKey={searchKey} />
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
