import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;

    return (
      <li>
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <div
            style={ { backgroundImage: `url('${album.artworkUrl100}')` } }
          >
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
          </div>
          <div>
            <p>{ album.artistName }</p>
            <p>{ album.collectionName }</p>
          </div>
        </Link>
      </li>
    );
  }
}

AlbumCard.propTypes = {
  album: shape({}).isRequired,
};

export default AlbumCard;
