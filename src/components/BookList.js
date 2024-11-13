import React, { useState } from 'react';

function BookList({ books }) {
  if (books.length === 0) {
    return <p>No se encontraron libros.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookItem key={index} book={book} />
      ))}
    </div>
  );
}

function BookItem({ book }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  return (
    <div className="book-item">
      <img
        src={book.volumeInfo.imageLinks?.thumbnail || ''}
        alt={book.volumeInfo.title}
        width={100}
        height={150}
      />
      <div>
        <h3>{book.volumeInfo.title}</h3>
        <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconocido'}</p>
        <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
          Ver más
        </a>
      </div>

      {/* Calificación por estrellas */}
      <div className="rating">
        <p>Calificación:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{ color: star <= rating ? 'gold' : 'gray', cursor: 'pointer' }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Campo de comentarios */}
      <div className="comment-section">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario..."
        />
      </div>

      {/* Botones de like y dislike */}
      <div className="like-dislike">
        <button onClick={handleLike}>👍 {likes}</button>
        <button onClick={handleDislike}>👎 {dislikes}</button>
      </div>
    </div>
  );
}

export default BookList;
