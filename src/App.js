import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BookList from './components/BookList';

function App() {
  const [searchQuery, setSearchQuery] = useState('Harry Potter');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books', error);
    } finally {
      setLoading(false);
    }
  };

  // Ejecuta la búsqueda de "Harry Potter" al montar el componente
  useEffect(() => {
    handleSearch(searchQuery);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Biblioteca Online</h1>
      </header>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar libros"
        />
        <button onClick={() => handleSearch(searchQuery)} disabled={loading}>
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </div>

      <BookList books={books} />
    </div>
  );
}

export default App;
