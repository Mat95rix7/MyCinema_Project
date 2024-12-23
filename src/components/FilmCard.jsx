import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/FilmCard.css';


const FilmCard = ({ movie }) => {
  return (
    <div className="film-card">
      <div className="film-card-image">
      <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x400?text=Image+Non+Disponible'
              }
              alt={movie.Title}
            />
      </div>
      <div className="film-card-content">
        <h2 className="film-card-title">{movie.Title}</h2>
        {/* <div className="film-card-info"> */}
          <span className="film-card-date">{movie.Year}</span>
        {/* </div> */}
        <Link className='button-link' to={`/movie/${movie.imdbID}`}>
              <button className="details-button">Voir Plus</button>
        </Link>
      </div>
    </div>
  );
};

FilmCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,    // Titre du film
    Year: PropTypes.string.isRequired,     // Année de sortie
    Poster: PropTypes.string.isRequired,   // URL de l'affiche
    imdbID: PropTypes.string.isRequired,   // ID IMDb
    Type: PropTypes.string,                // Type (movie, series, etc.)
  }).isRequired, // `movie` est un objet obligatoire
};

export default FilmCard;
