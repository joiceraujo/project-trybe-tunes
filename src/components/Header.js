import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true },
      () => getUser().then((user) => this.setState({ user, loading: false })));
  }

  render() {
    const { loading, user: { name } } = this.state;

    return (
      <div>
        { loading
          ? <p>Carregando...</p>
          : (
            <>
              <header data-testid="header-component" />
              <h1>
                Trybe
                <span>Tunes</span>
              </h1>
              <p data-testid="header-user-name">
                <span>Olá</span>
                {''}
                {name}
                {'!'}
              </p>

            </>
          )}
      </div>
    );
  }
}

Header.defaultProps = {
  search: '',
  favorites: '',
  profile: '',
};

export default Header;
