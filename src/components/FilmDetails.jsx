import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/FilmDetails.css';

const API_KEY = import.meta.env.VITE_API_KEY;
const URL = import.meta.env.VITE_API_URL;

const FilmDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${URL}?apikey=${API_KEY}&i=${imdbID}`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Une erreur s’est produite lors de la récupération des détails.');
        console.log(err);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!movie) {
    return <p>Chargement des détails...</p>;
  }

  return (
    <div style={{ display: 'flex', margin: '20px' }}>
        <div className="movie-details">
          <img
            src={
              movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://via.placeholder.com/300x400?text=Image+Non+Disponible'
            }
            alt={movie.Title}
          />
        </div> 
        <div style={{ margin: '20px' }}>
          <h2>{movie.Title}</h2>
          <p><strong>Année :</strong> {movie.Year}</p>
          <p><strong>Genre :</strong> {movie.Genre}</p>
          <p><strong>Réalisateur :</strong> {movie.Director}</p>
          <p><strong>Synopsis :</strong> {movie.Plot}</p>
          <p><strong>Note :</strong> {movie.imdbRating}/10</p>
          <button onClick={() => navigate(-1)} className="back-button">
            Retour
          </button>
        </div>
    </div>
  );
};

export default FilmDetails;
