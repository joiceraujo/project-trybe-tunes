import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      () => getUser()
        .then((userData) => this.setState({ userData, loading: false })),
    );
  }

  render() {
    const { userData: { name, email, description, image }, loading } = this.state;
    const defaultImage = image !== '' ? image : 'https://via.placeholder.com/150';

    return (
      <div data-testid="page-profile">
        <Header search="active" />

        { loading
          ? <p>Carregando...</p>
          : (
            <div>
              <img
                data-testid="profile-image"
                src={ defaultImage }
                alt={ name }
              />
              { name }
              <p>
                <span>Nome:</span>
                { name }
              </p>
              <p>
                <span>Email:</span>
                { email }
              </p>
              <p>
                <span>Descrição:</span>
                { description }
              </p>

              <Link to="/profile/edit">Editar Perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
