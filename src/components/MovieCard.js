import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useLanguage } from '../LanguageContext';

const MovieCard = ({ movie, onBook, user, onToggleFavorite }) => {
  const { t, language } = useLanguage();
  if (!movie) return null;

  const title = language === 'en' ? (movie.title_en || movie.title) : 
                language === 'ar' ? (movie.title_ar || movie.title) : 
                movie.title;

  const overview = language === 'en' ? (movie.overview_en || movie.overview) : 
                   language === 'ar' ? (movie.overview_ar || movie.overview) : 
                   movie.overview;

  const shortOverview = overview 
    ? (overview.length > 80 ? overview.substring(0, 80) + '...' : overview)
    : t.movie_details_soon; 

  const releaseYear = movie.release_date 
    ? movie.release_date.substring(0, 4) 
    : "2024";

  const isFavorite = user && user.favorites && user.favorites.some(fav => fav.id === movie.id);

  return (
    <Card className="h-100 movie-card text-white border-0 shadow-sm" style={{ backgroundColor: '#1e232b', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
      
      <div 
        className="position-absolute p-2" 
        style={{ top: '10px', left: '10px', zIndex: 10, cursor: 'pointer', background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}
        onClick={(e) => {
            e.stopPropagation(); 
            if (onToggleFavorite) onToggleFavorite(movie);
        }}
      >
        <span style={{ fontSize: '1.2rem', color: isFavorite ? '#ff3b30' : 'white', transition: 'color 0.3s' }}>
            {isFavorite ? '♥' : '♡'}
        </span>
      </div>

      <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
        <Card.Img 
          variant="top" 
          src={movie.image || "https://via.placeholder.com/300x450?text=No+Image"} 
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=Resim+Yukleniyor"; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} 
          className="movie-img"
        />
        
        <span 
          className="position-absolute top-0 end-0 m-3 px-2 py-1 rounded-3 shadow-sm fw-bold" 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            color: '#fff', 
            fontSize: '0.85rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          {releaseYear}
        </span>
      </div>
      
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title 
          className="fw-bold text-truncate mb-2" 
          style={{ fontSize: '1.1rem' }} 
          title={title}
        >
          {title}
        </Card.Title>
        
        <div className="text-warning small mb-2">{movie.category || "Genel"}</div>
        
        <Card.Text className="text-secondary small mb-3 flex-grow-1" style={{ lineHeight: '1.4' }}>
          {shortOverview}
        </Card.Text>
        
        <Button 
          onClick={() => onBook(movie)} 
          variant="warning" 
          className="w-100 fw-bold rounded-pill mt-auto btn-hover-effect"
        >
          {t.book_now}
        </Button>
      </Card.Body>

      <style>{`
        .movie-card:hover .movie-img {
          transform: scale(1.05);
        }
        .btn-hover-effect {
          transition: all 0.2s ease;
        }
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
        }
      `}</style>
    </Card>
  );
};

export default MovieCard;