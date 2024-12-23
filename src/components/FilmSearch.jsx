import { useState } from 'react';
import '../styles/FilmSearch.css';
import FilmCard from './FilmCard';

const API_KEY = import.meta.env.VITE_API_KEY;
const URL = import.meta.env.VITE_API_URL;

const FilmSearch = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

 

  const searchMovies = async () => {
    if (!searchTerm) {
      setError('Veuillez entrer un titre de film.');
      return;
    }
    setError('');
    try {
      const response = await fetch(`${URL}?apikey=${API_KEY}&s=${searchTerm}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Une erreur s’est produite lors de la recherche.');
      console.log(err);
    }
  };

  return (
    <div className="movie-search">
      <header className="header">
        <h1>Recherche de Films</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Recherchez un film..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={searchMovies}>Rechercher</button>
        </div>
        {error && <p className="error">{error}</p>}
      </header>

      <main className="movies-grid col-10 mx-auto">
        {movies.map((movie) => (
            <FilmCard key={movie.imdbID} movie = {movie} />
        ))}
      </main>
    </div>
  );
};

export default FilmSearch;
