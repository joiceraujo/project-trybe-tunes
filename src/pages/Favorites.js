import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
    this.removeFavoriteSongs = this.removeFavoriteSongs.bind(this);

    this.state = {
      allFavoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.updateFavoriteSongs();
  }

  updateFavoriteSongs() {
    this.setState(
      { loading: true },
      () => getFavoriteSongs()
        .then((favorites) => {
          this.setState({ allFavoriteSongs: favorites || [], loading: false });
        }),
    );
  }

  removeFavoriteSongs(song) {
    this.setState(
      { loading: true },
      () => removeSong(song).then(() => {
        getFavoriteSongs().then((favorites) => {
          this.setState({ allFavoriteSongs: favorites || [], loading: false });
        });
      }),
    );
  }

  render() {
    const { loading, allFavoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header favorites="active" />
        <h1>Minhas Favoritas</h1>
        { loading && <p>Carregando...</p>}

        <ul>
          { !loading && allFavoriteSongs
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                allFavoriteSongs={ allFavoriteSongs }
                song={ song }
                updateFavoriteSongs={ this.removeFavoriteSongs }
              />
            )) }
        </ul>
      </div>
    );
  }
}

export default Favorites;
