import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();

    this.onInputChance = this.onInputChance.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      search: '',
      buttonIsDisabled: true,
      albums: [],
      lastSearch: '',
      loading: false,
    };
  }

  onInputChance({ target: { value } }) {
    const isValid = value.trim().length > 1;
    this.setState({ search: value, buttonIsDisabled: !isValid });
  }

  onButtonClick(event) {
    event.preventDefault();

    const { search } = this.state;

    this.setState(
      () => ({ loading: true, lastSearch: search }),
      () => searchAlbumsAPI(search)
        .then((albums) => this.setState({
          albums,
          search: '',
          buttonIsDisabled: true,
          loading: false,
        })),
    );
  }

  render() {
    const {
      search,
      buttonIsDisabled,
      albums,
      lastSearch,
      loading,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header search="active" />

        <form>
          <h1>Buscar</h1>

          <div>
            <label htmlFor="search">
              <input
                data-testid="search-artist-input"
                id="search"
                onChange={ this.onInputChance }
                placeholder="Digite o nome do álbum ou do artista..."
                type="text"
                value={ search }
              />
            </label>

            <button
              disabled={ buttonIsDisabled }
              onClick={ this.onButtonClick }
              type="submit"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </div>
        </form>

        <div>
          {lastSearch !== ''
          && albums.length === 0
          && !loading
          && <p> Nenhum álbum foi encontrado </p> }

          { loading && <p>Carregando...</p>}

          { !loading && albums.length > 0 && (
            <p>
              Resultado de álbuns de:
              {' '}
              { lastSearch }
            </p>
          )}

          <ul>
            { albums.map((album) => (
              <AlbumCard key={ album.collectionId } album={ album } />
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
