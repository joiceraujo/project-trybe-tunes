import React, { Component } from 'react';
import { shape } from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.onInputChance = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      username: '',
      submitIsDisabled: true,
      loading: false,
    };
  }

  onButtonClick(event) {
    event.preventDefault();

    const { username } = this.state;
    const { history: { push } } = this.props;

    this.setState(
      { loading: true },
      () => createUser({ name: username })
        .then(() => push('/search')),
    );
  }

  onInputChange({ target: { value } }) {
    const isValid = value.trim().lenght > 2;
    this.setState({ username: value, submitIsDisabled: !isValid });
  }

  render() {
    const { username, loading, submitIsDisabled } = this.state;

    return (
      <div>
        { loading
          ? (<p>Carregando...</p>)
          : (
            <div>
              <form data-testid="page-login">
                <div>
                  <h1>
                    Trybe
                    <span>Tunes</span>
                  </h1>
                </div>

                <div>
                  <label htmlFor="username">
                    Usuário:
                    <input
                      type="text"
                      id="username"
                      placeholder="Seu nome de Usuário"
                      name="username"
                      onChange={ this.onInputChance }
                      data-testid="login-name-input"
                      value={ username }
                    />
                  </label>

                  <label htmlFor="password">
                    Senha:
                    <input
                      name="passaword"
                      placeholder="Digite sua senha"
                      type="password"
                    />
                  </label>

                  <label htmlFor="remember">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                    />
                    Me mantenha conectado
                  </label>

                  <button
                    type="submit"
                    disabled={ submitIsDisabled }
                    onClick={ this.onButtonClick }
                    data-testid="login-submit-button"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({}).isRequired,
};

export default Login;
