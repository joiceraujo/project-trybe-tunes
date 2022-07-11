import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
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
    const { search, favorites, profile } = this.props;

    return (
      <div>
        { loading
          ? <p>Carregando...</p>
          : (
            <header data-testid="header-component">
              <div>
                <h1>
                  Trybe
                  <span>Tunes</span>
                </h1>
                <p data-testid="header-user-name">
                  <span>Olá</span>
                  {''}
                  { name }
                  {'!'}
                </p>
              </div>

              <nav>
                <ul>
                  <li>
                    <Link
                      data-testid="link-to-search"
                      to="/search"
                    >
                      Buscar
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-testid="link-to-favorites"
                      to="/favorites"
                    >
                      Favoritas
                    </Link>
                  </li>
                  <li>
                      { ...`page-link ${profile}` }
                      data-testid="link-to-profile"
                      to="/profile"
                    >
                      Meu Perfil
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>
          ) }
      </div>
    );
  }
}

Header.defaultProps = {
  search: '',
  favorites: '',
  profile: '',
};

Header.propTypes = {
  search: string,
  favorites: string,
  profile: string,
};

export default Header;
