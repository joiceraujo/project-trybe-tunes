import React, { Component } from 'react';
import { shape } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);

    this.state = {
      albumContent: [],
      allFavoriteSongs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const albumContent = await getMusics(id);
    const allFavoriteSongs = await getFavoriteSongs();
    this.setState({ albumContent, allFavoriteSongs });
  }

  updateFavoriteSongs(song, action) {
    const addOrRemove = (action === 'add') ? addSong : removeSong;

    this.setState(
      { loading: true },
      () => addOrRemove(song).then(() => {
        getFavoriteSongs().then((favorites) => {
          this.setState({ allFavoriteSongs: favorites || [], loading: false });
        });
      }),
    );
  }

  render() {
    const { albumContent, loading, allFavoriteSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        { !loading && albumContent.length > 0 ? (
          <div>
            <img
              src={ albumContent[0].artworkUrl100 }
              alt={ albumContent[0].collectionName }
            />

            <div>
              <h1 data-testid="artist-name">
                { albumContent[0].artistName }
              </h1>

              <p data-testid="album-name">
                { albumContent[0].collectionName }
              </p>
            </div>
          </div>

        ) : <p>Carregando...</p> }
        <ul>
          {!loading && albumContent
            .filter((_song, index) => index > 0)
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
                allFavoriteSongs={ allFavoriteSongs }
                updateFavoriteSongs={ this.updateFavoriteSongs }
              />
            ))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({}).isRequired,
};

export default Album;
