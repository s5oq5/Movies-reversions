import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import HeroSlider from './HeroSlider';
import { useLanguage } from '../LanguageContext';

const Home = ({ activeTab, setActiveTab, searchTerm, user, onToggleFavorite }) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vizyonMovies, setVizyonMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const vizyonRef = useRef(null);
  const yakindaRef = useRef(null);

  const scroll = (ref, scrollOffset) => {
    if (ref.current) {
        const direction = language === 'ar' ? -1 : 1;
        ref.current.scrollBy({ left: scrollOffset * direction, behavior: 'smooth' });
    }
  };

  const campaignsData = {
    tr: [
      { id: 1, title: "ACAYİP CUMA", desc: "Her Cuma biletlerde acayip indirimler!", color: "linear-gradient(45deg, #ff00cc, #333399)" },
      { id: 2, title: "MISIR MENÜSÜ", desc: "Mısır menünü uygulamadan al, sıra bekleme!", color: "linear-gradient(45deg, #f12711, #f5af19)" },
      { id: 3, title: "ÖĞRENCİ İNDİRİMİ", desc: "Öğrenci kimliği ile %20 indirim.", color: "linear-gradient(45deg, #00c6ff, #0072ff)" },
      { id: 4, title: "HALK GÜNÜ", desc: "Salı günleri biletler tek fiyat!", color: "linear-gradient(45deg, #11998e, #38ef7d)" }
    ],
    en: [
      { id: 1, title: "CRAZY FRIDAY", desc: "Crazy discounts on tickets every Friday!", color: "linear-gradient(45deg, #ff00cc, #333399)" },
      { id: 2, title: "POPCORN MENU", desc: "Buy your menu in-app, skip the line!", color: "linear-gradient(45deg, #f12711, #f5af19)" },
      { id: 3, title: "STUDENT DISCOUNT", desc: "20% discount with student ID.", color: "linear-gradient(45deg, #00c6ff, #0072ff)" },
      { id: 4, title: "PUBLIC DAY", desc: "Single price tickets on Tuesdays!", color: "linear-gradient(45deg, #11998e, #38ef7d)" }
    ],
    ar: [
      { id: 1, title: "الجمعة المجنونة", desc: "خصومات مذهلة على التذاكر كل يوم جمعة!", color: "linear-gradient(45deg, #ff00cc, #333399)" },
      { id: 2, title: "قائمة الفشار", desc: "اطلب قائمتك من التطبيق وتجاوز الطابور!", color: "linear-gradient(45deg, #f12711, #f5af19)" },
      { id: 3, title: "خصم الطلاب", desc: "خصم 20% عند إبراز بطاقة الطالب.", color: "linear-gradient(45deg, #00c6ff, #0072ff)" },
      { id: 4, title: "يوم الجمهور", desc: "سعر موحد للتذاكر كل يوم ثلاثاء!", color: "linear-gradient(45deg, #11998e, #38ef7d)" }
    ]
  };

  const hallsData = {
    tr: [
      { id: 1, title: "IMAX", desc: "Maksimum gerçeklik.", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", icon: "🎥" },
      { id: 2, title: "Gold Class", desc: "VIP konfor.", image: "https://image.tmdb.org/t/p/original/v9acaWVVFdZT5yAU7J2QjwfhXyD.jpg", icon: "👑" },
      { id: 3, title: "4DX", desc: "Filmi yaşa.", image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", icon: "🌪️" }
    ],
    en: [
      { id: 1, title: "IMAX", desc: "Maximum reality.", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", icon: "🎥" },
      { id: 2, title: "Gold Class", desc: "VIP comfort.", image: "https://image.tmdb.org/t/p/original/v9acaWVVFdZT5yAU7J2QjwfhXyD.jpg", icon: "👑" },
      { id: 3, title: "4DX", desc: "Live the movie.", image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", icon: "🌪️" }
    ],
    ar: [
      { id: 1, title: "IMAX", desc: "أقصى درجات الواقعية.", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", icon: "🎥" },
      { id: 2, title: "Gold Class", desc: "رفاهية VIP.", image: "https://image.tmdb.org/t/p/original/v9acaWVVFdZT5yAU7J2QjwfhXyD.jpg", icon: "👑" },
      { id: 3, title: "4DX", desc: "عش أحداث الفيلم.", image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", icon: "🌪️" }
    ]
  };

  const campaigns = campaignsData[language] || campaignsData['tr'];
  const halls = hallsData[language] || hallsData['tr'];

  useEffect(() => {
    setLoading(true);
    fetch('/movies.json') 
      .then(res => res.json())
      .then(data => {
        const safeData = data || [];
        setMovies(safeData);
        const nowPlaying = safeData.filter(m => !m.isUpcoming);
        const comingSoon = safeData.filter(m => m.isUpcoming);
        setVizyonMovies(nowPlaying);
        setUpcomingMovies(comingSoon);
        setFilteredMovies(nowPlaying);
      })
      .catch(err => console.error("Error fetching movies:", err))
      .finally(() => setLoading(false));
  }, []);

  const getMovieTitle = useCallback((movie) => {
    if (language === 'en') return movie.title_en || movie.title;
    if (language === 'ar') return movie.title_ar || movie.title;
    return movie.title;
  }, [language]);

  useEffect(() => {
    if (activeTab === 'Home' || activeTab === 'Filmler') {
      const source = activeTab === 'Filmler' ? movies : vizyonMovies;
      const result = source.filter(movie => 
        getMovieTitle(movie).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(result);
    }
  }, [searchTerm, movies, activeTab, vizyonMovies, language, getMovieTitle]);

  const handleBookClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const MovieSliderSection = ({ title, targetTab, refProp, data }) => (
    <div className="mb-5 position-relative group">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
        <h3 className="text-white fw-bold border-start border-4 border-warning ps-3 mb-0">{title}</h3>
        {targetTab && (
          <span 
            onClick={() => { setActiveTab(targetTab); window.scrollTo(0, 0); }} 
            style={{ cursor: 'pointer', color: '#ffc107', fontWeight: 'bold' }}
          >
            {t.view_all}
          </span>
        )}
      </div>

      <div className="position-relative">
        <button 
          onClick={() => scroll(refProp, -300)}
          className="btn btn-dark rounded-circle position-absolute start-0 top-50 translate-middle-y z-3 shadow-lg"
          style={{ width: '45px', height: '45px', border: '1px solid #444', opacity: 0.9 }}
        >❮</button>

        <div 
          ref={refProp}
          className="d-flex gap-4 overflow-auto py-2 px-1 hide-scrollbar"
          style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map(movie => (
            <div key={movie.id} style={{ minWidth: '250px', width: '250px' }}>
              <MovieCard 
                movie={movie} 
                onBook={handleBookClick} 
                user={user}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll(refProp, 300)}
          className="btn btn-dark rounded-circle position-absolute end-0 top-50 translate-middle-y z-3 shadow-lg"
          style={{ width: '45px', height: '45px', border: '1px solid #444', opacity: 0.9 }}
        >❯</button>
      </div>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="warning" style={{ width: '4rem', height: '4rem' }} />
      </div>
    );
  }

  return (
    <>
      {activeTab === 'Home' && <HeroSlider />}

      <Container className="mt-5 mb-5">
        
        {activeTab === 'Home' && (
          <>
            <MovieSliderSection 
              title={t.movies} 
              targetTab="Filmler" 
              refProp={vizyonRef} 
              data={filteredMovies} 
            />

            <MovieSliderSection 
              title={t.upcoming} 
              targetTab="Yakında" 
              refProp={yakindaRef} 
              data={upcomingMovies} 
            />

            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                <h3 className="text-white fw-bold border-start border-4 border-warning ps-3 mb-0">{t.campaigns}</h3>
                <span onClick={() => { setActiveTab('Kampanyalar'); window.scrollTo(0,0); }} style={{ cursor: 'pointer', color: '#ffc107', fontWeight: 'bold' }}>{t.view_all}</span>
              </div>
              <Carousel indicators={false} interval={3000} className="rounded-4 overflow-hidden shadow-lg">
               {campaigns.map(camp => (
                 <Carousel.Item key={camp.id}>
                   <div className="d-flex align-items-center justify-content-between p-5 text-white" style={{ background: camp.color, height: '250px' }}>
                     <div className="d-flex align-items-center gap-5">
                        <h1 className="fw-bold mb-0 display-1" style={{ opacity: 0.8 }}>%</h1>
                        <div><h2 className="fw-bold mb-2 text-uppercase">{camp.title}</h2><p className="mb-0 fs-5" style={{ opacity: 0.9 }}>{camp.desc}</p></div>
                     </div>
                     <Button variant="light" size="lg" className="rounded-pill fw-bold text-dark px-5 py-3 shadow">{t.examine}</Button>
                   </div>
                 </Carousel.Item>
               ))}
              </Carousel>
            </div>

            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                <h3 className="text-white fw-bold border-start border-4 border-warning ps-3 mb-0">{t.special_halls}</h3>
                <span onClick={() => { setActiveTab('Özel Salonlar'); window.scrollTo(0,0); }} style={{ cursor: 'pointer', color: '#ffc107', fontWeight: 'bold' }}>{t.view_all}</span>
              </div>
              <Row>
                {halls.map(hall => (
                  <Col md={4} key={hall.id} className="mb-4">
                    <Card className="h-100 border-0 text-white overflow-hidden" style={{ borderRadius: '15px', backgroundColor: '#161a20', border: '1px solid #333' }}>
                      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                        <img src={hall.image} alt={hall.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
                        <div className="position-absolute top-50 start-50 translate-middle"><h2 className="fw-bold" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{hall.title}</h2></div>
                      </div>
                      <Card.Body className="text-center py-4">
                          <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>{hall.icon}</div>
                          <p style={{ color: '#cccccc' }} className="mb-4">{hall.desc}</p>
                          <Button variant="outline-warning" className="rounded-pill px-4">{t.examine}</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}

        {activeTab === 'Filmler' && (
          <div className="mb-5">
            <h3 className="text-white fw-bold mb-4 border-start border-4 border-warning ps-3">{t.movies}</h3>
            <Row>
              {movies.map(movie => (
                <Col md={3} key={movie.id} className="mb-4">
                  <MovieCard 
                    movie={movie} 
                    onBook={handleBookClick} 
                    user={user}
                    onToggleFavorite={onToggleFavorite}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}

        {activeTab === 'Yakında' && (
          <div className="mb-5">
             <h3 className="text-white fw-bold mb-4 border-start border-4 border-warning ps-3">{t.upcoming}</h3>
             <Row>
               {upcomingMovies.map(movie => (
                 <Col md={3} key={movie.id} className="mb-4">
                   <MovieCard 
                      movie={movie} 
                      onBook={handleBookClick} 
                      user={user}
                      onToggleFavorite={onToggleFavorite}
                   />
                 </Col>
               ))}
             </Row>
          </div>
        )}

         {activeTab === 'Kampanyalar' && (
           <Row>
             {campaigns.map(camp => (
                <Col md={6} key={camp.id} className="mb-4">
                  <Card className="h-100 border-0 shadow text-white overflow-hidden" style={{ borderRadius: '15px', backgroundColor: '#161a20' }}>
                    <div className="d-flex h-100">
                        <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center" style={{ background: camp.color, width: '40%' }}>
                             <div className="fw-bold text-uppercase mb-2">{camp.title}</div>
                             <div style={{ fontSize: '2.5rem' }}>🎁</div>
                        </div>
                        <div className="p-4 d-flex flex-column justify-content-center" style={{ width: '60%' }}>
                            <p className="mb-4" style={{ color: '#e0e0e0' }}>{camp.desc}</p>
                            <Button variant="outline-light" size="sm" className="rounded-pill px-3">{t.examine}</Button>
                        </div>
                    </div>
                  </Card>
                </Col>
             ))}
           </Row>
         )}

         {activeTab === 'Özel Salonlar' && (
           <Row>
             {halls.map(hall => (
                <Col md={4} key={hall.id} className="mb-4">
                  <Card className="h-100 border-0 text-white overflow-hidden" style={{ borderRadius: '15px', backgroundColor: '#161a20', border: '1px solid #333' }}>
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img src={hall.image} alt={hall.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
                      <div className="position-absolute top-50 start-50 translate-middle"><h2 className="fw-bold" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{hall.title}</h2></div>
                    </div>
                    <Card.Body className="text-center py-4">
                        <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>{hall.icon}</div>
                        <p style={{ color: '#cccccc' }} className="mb-4">{hall.desc}</p>
                        <Button variant="outline-warning" className="rounded-pill px-4">{t.examine}</Button>
                    </Card.Body>
                  </Card>
                </Col>
             ))}
           </Row>
         )}
      </Container>
    </>
  );
};

export default Home;