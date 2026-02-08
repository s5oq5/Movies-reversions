import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const MyFavorites = ({ user, onToggleFavorite }) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const localT = {
    tr: { title: "Favori Filmlerim", empty: "Henüz favori filminiz yok.", desc: "Beğendiğiniz filmleri kalp ikonuna tıklayarak buraya ekleyebilirsiniz.", discover: "Filmleri Keşfet" },
    en: { title: "My Favorite Movies", empty: "No favorites yet.", desc: "Add movies you like by clicking the heart icon.", discover: "Discover Movies" },
    ar: { title: "أفلامي المفضلة", empty: "لا توجد أفلام مفضلة.", desc: "يمكنك إضافة الأفلام التي تعجبك بالضغط على أيقونة القلب.", discover: "استكشف الأفلام" }
  };
  const lt = localT[language];

  if (!user) {
    return (
        <Container className="py-5 text-center text-white">
            <h2>{t.login_title}</h2>
            <Button variant="warning" onClick={() => navigate('/login')}>{t.login}</Button>
        </Container>
    );
  }

  const favorites = user.favorites || [];

  return (
    <Container className="py-5">
      <h2 className={`text-white fw-bold mb-5 ${language === 'ar' ? 'border-end ps-0 pe-3' : 'border-start ps-3'} border-4 border-warning`}>
        {lt.title} ❤️
      </h2>
      
      {favorites.length === 0 ? (
        <div className="text-center text-white-50 py-5">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💔</div>
            <h4>{lt.empty}</h4>
            <p>{lt.desc}</p>
            <Button variant="outline-light" onClick={() => navigate('/')} className="mt-3">{lt.discover}</Button>
        </div>
      ) : (
        <Row>
          {favorites.map((movie) => (
            <Col md={3} key={movie.id} className="mb-4">
              <MovieCard 
                movie={movie} 
                onBook={(m) => navigate(`/movie/${m.id}`)} 
                user={user} 
                onToggleFavorite={onToggleFavorite} 
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyFavorites;