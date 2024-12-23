import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmSearch from './components/FilmSearch';
import FilmDetails from './components/FilmDetails';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FilmSearch />} />
        <Route path="/movie/:imdbID" element={<FilmDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
