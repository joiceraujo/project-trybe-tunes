import React, { Component } from 'react';
import { string, func, shape } from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.onInputChance = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      submitIsDisabled: true,
      loading: false,
    };
  }

  onButtonClick(event) {
    event.preventDefault();

    const { username, history: { push } } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: username });
        push('/search');
      },
    );
  }

  onInputChange(event) {
    const { target: { value } } = event;
    const { handleChange } = this.props;

    const hasValidValue = value.trim().length > 2;
    this.setState({ submitIsDisabled: !hasValidValue });
    handleChange(event);
  }

  render() {
    const { loading, submitIsDisabled } = this.state;
    const { username } = this.props;

    return (
      <div>
        { loading
          ? (<p>Carregando...</p>)
          : (
            <form data-testid="page-login">
              <div>
                <h1>
                  Trybe
                  <span>Tunes</span>
                </h1>
              </div>

              <label htmlFor="name">
                Usuário:
                <input
                  type="text"
                  placeholder="Seu nome de Usuário"
                  name="username"
                  onChange={ this.onInputChance }
                  data-testid="login-name-input"
                  value={ username }
                />
              </label>

              <label htmlFor="passaword">
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
            </form>

          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({}).isRequired,
  username: string.isRequired,
  handleChange: func.isRequired,
};

export default Login;
