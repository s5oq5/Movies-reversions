import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button, Image, Dropdown, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const CustomNavbar = ({ activeTab, setActiveTab, searchTerm, setSearchTerm, user, handleLogout }) => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  
  const [expanded, setExpanded] = useState(false); 

  const [allMovies, setAllMovies] = useState([]);

  const tabs = [
    { key: 'Filmler', label: t.movies },
    { key: 'Yakında', label: t.upcoming },
    { key: 'Kampanyalar', label: t.campaigns },
    { key: 'Özel Salonlar', label: t.special_halls }
  ];
  
  useEffect(() => {
    fetch('/movies.json').then(res => res.json()).then(data => { if (Array.isArray(data)) setAllMovies(data); });
  }, []);

  const closeMenu = () => setExpanded(false);

  const handleLogoClick = () => { 
      setActiveTab && setActiveTab('Home'); 
      setShowSearchOverlay(false); 
      closeMenu();
      window.scrollTo(0, 0); 
  };

  const handleResultClick = (movieId) => { 
      navigate(`/movie/${movieId}`); 
      setShowSearchOverlay(false); 
      if (setSearchTerm) setSearchTerm(''); 
  };
  
  const getMovieTitle = (movie) => {
    if (language === 'en') return movie.title_en || movie.title;
    if (language === 'ar') return movie.title_ar || movie.title;
    return movie.title;
  };

  const isSearching = searchTerm && searchTerm.length > 0;
  const displayMovies = isSearching 
    ? allMovies.filter(movie => getMovieTitle(movie).toLowerCase().includes(searchTerm.toLowerCase()))
    : allMovies.filter(movie => movie.vote_average >= 8).slice(0, 4); 

  const UserDropdown = ({ isMobile }) => (
    <Dropdown align={language === 'ar' ? 'start' : 'end'} className={isMobile ? "" : ""}>
        <Dropdown.Toggle variant="dark" className="d-flex align-items-center justify-content-center p-0 border-0" 
            style={{ 
                backgroundColor: '#ffc107', 
                color: 'black', 
                height: isMobile ? '40px' : '40px', 
                width: isMobile ? '40px' : 'auto', 
                borderRadius: isMobile ? '50%' : '50px', 
                zIndex: 1060,
                padding: isMobile ? '0' : '0 15px'
            }}>
            
            <div className="d-flex align-items-center gap-2">
                <div style={{ width: '28px', height: '28px', background: 'black', borderRadius: '50%', color: '#ffc107', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {user.name.charAt(0).toUpperCase()}
                </div>
                {!isMobile && <span className="fw-bold ps-1" style={{fontSize: '0.9rem'}}>{user.name.split(' ')[0]}</span>}
            </div>
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" style={{ minWidth: '150px', zIndex: 1070 }}>
            <Dropdown.Item onClick={() => { handleLogout(); closeMenu(); }} className="text-danger fw-bold">🚪 {t.logout}</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  );

  const LanguageSelector = () => (
    <Dropdown align="end">
      <Dropdown.Toggle variant="dark" className="d-flex align-items-center justify-content-center rounded-circle border border-secondary p-0 no-caret" style={{ width: '40px', height: '40px', backgroundColor: '#161a20' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#e0e0e0" viewBox="0 0 16 16">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 1 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5h2.992V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.645a12.5 12.5 0 0 0 .338-2.5H8.5zm5.525-3.5a6.96 6.96 0 0 0-.656-2.5h-2.143c.174.782.282 1.623.312 2.5h2.487zm.655 3.5a7.025 7.025 0 0 0-.91-3.75 6.7 6.7 0 0 1-.606.936 9.274 9.274 0 0 1-.635 1.543h1.838zm-1.835 3.5c.34.86.533 1.636.635 2.19.103.553.15.93.153.985a7.03 7.03 0 0 0 1.957-3.175h-2.745zm-1.07 1.326a12.513 12.513 0 0 1-.645 2.174 6.697 6.697 0 0 1-.595.93 7.98 7.98 0 0 1-1.39-2.31h2.63zm-2.27 3.104c.552-1.035 1.218-1.65 1.887-1.855V14.923a8 8 0 0 1-2.388-1.042zM1.082 11h2.745c-.003.054-.05.431-.153.984-.102.554-.296 1.33-.635 2.19A7.03 7.03 0 0 0 1.082 11z"/>
        </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark" align="end" style={{ minWidth: '100px', zIndex: 1070 }}>
        <Dropdown.Item onClick={() => { setLanguage('tr'); closeMenu(); }} active={language === 'tr'}>🇹🇷 Türkçe</Dropdown.Item>
        <Dropdown.Item onClick={() => { setLanguage('en'); closeMenu(); }} active={language === 'en'}>🇺🇸 English</Dropdown.Item>
        <Dropdown.Item onClick={() => { setLanguage('ar'); closeMenu(); }} active={language === 'ar'}>🇸🇦 العربية</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <Navbar expanded={expanded} expand="xxl" variant="dark" className="navbar-custom py-3 sticky-top" style={{ backgroundColor: 'rgba(22, 26, 32, 0.95)', backdropFilter: 'blur(10px)', zIndex: 1050 }}>
        <Container fluid className="px-4">
          <Navbar.Brand as={Link} to="/" onClick={handleLogoClick} className="d-flex align-items-center" style={{ zIndex: 1060 }}>
            <img 
                src="/logo.png" alt="CineGold Premium" style={{ height: '40px', objectFit: 'contain' }} 
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} 
            />
            <span style={{ display: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
                <span style={{ color: '#ffc107' }}>Cine</span>Gold 
                <span style={{ fontSize: '0.9rem', color: '#ffc107', fontWeight: 'bold', marginLeft: '5px', letterSpacing: '1px' }}>PREMIUM</span>
            </span>
          </Navbar.Brand>

          <div className="d-flex align-items-center ms-auto gap-2 order-lg-last">
            
            <Button variant="link" className="d-xxl-none text-white p-2" onClick={() => setShowSearchOverlay(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </Button>

            <Button as={Link} to="/my-tickets" onClick={closeMenu} variant="warning" className="d-xxl-none rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm" style={{ width: '40px', height: '40px', border: '2px solid #fff' }}>
                <span style={{ fontSize: '1.2rem' }}>🎟️</span>
            </Button>

            {user && (
                <div className="d-xxl-none">
                     <UserDropdown isMobile={true} />
                </div>
            )}

            <Button as={Link} to="/my-favorites" onClick={closeMenu} variant="dark" className="d-xxl-none rounded-circle d-flex align-items-center justify-content-center p-0 border border-secondary" style={{ width: '40px', height: '40px', backgroundColor: '#161a20' }}>
                <span style={{ fontSize: '1.1rem', color: '#ff4d4d' }}>♥</span>
            </Button>
            
            <Button as={Link} to="/my-favorites" onClick={closeMenu} variant="dark" className="d-none d-xxl-flex rounded-circle align-items-center justify-content-center p-0 border border-secondary" style={{ width: '45px', height: '45px', backgroundColor: '#161a20' }}>
                <span style={{ fontSize: '1.2rem', color: '#ff4d4d' }}>♥</span>
            </Button>

            <LanguageSelector />
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2 border-0" onClick={() => setExpanded(expanded ? false : "expanded")} />
          </div>
          
          <Navbar.Collapse id="basic-navbar-nav" className="me-auto">
            <Nav className="mx-auto gap-xxl-4 mt-3 mt-xxl-0">
              {tabs.map(tab => (
                <Nav.Link key={tab.key} as={Link} to="/" onClick={() => { setActiveTab && setActiveTab(tab.key); setShowSearchOverlay(false); closeMenu(); }} className={`fs-5 fw-bold ${activeTab === tab.key ? 'text-warning' : 'text-secondary'}`} style={{ borderBottom: activeTab === tab.key ? '2px solid #ffc107' : '2px solid transparent', transition: 'all 0.3s' }}>
                    {tab.label}
                </Nav.Link>
              ))}
            </Nav>

            <div className="d-flex flex-column flex-xxl-row align-items-xxl-center gap-3 mt-3 mt-xxl-0">
                <div className="d-none d-xxl-block" style={{ position: 'relative', width: '100%', maxWidth: '300px', zIndex: 1060 }}>
                    <Form.Control type="text" placeholder={t.search_placeholder} value={searchTerm} onClick={() => setShowSearchOverlay(true)} onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)} style={{ backgroundColor: '#161a20', border: showSearchOverlay ? '1px solid #ff6a00' : '1px solid #333', color: 'white', borderRadius: '50px', padding: '10px 40px 10px 20px', fontSize: '0.9rem', boxShadow: 'none' }} />
                    <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setShowSearchOverlay(!showSearchOverlay)}>
                        {showSearchOverlay ? <span className="text-white fw-bold fs-5">✕</span> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>}
                    </div>
                </div>

                <Button as={Link} to="/my-tickets" onClick={closeMenu} variant="warning" className="d-none d-xxl-flex rounded-pill px-4 fw-bold align-items-center gap-2 shadow-sm text-nowrap" style={{ height: '45px', zIndex: 1060 }}>
                    <span>🎟️</span><span>{t.my_tickets}</span>
                </Button>

                {user ? (
                   <div className="d-none d-xxl-block">
                        <UserDropdown isMobile={false} />
                   </div> 
                ) : (
                    <div className="d-flex gap-2 w-100 w-xxl-auto" style={{ zIndex: 1060 }}>
                        <Button as={Link} to="/login" onClick={closeMenu} variant="outline-light" className="rounded-pill px-3 fw-bold flex-grow-1 flex-lg-grow-0" style={{ height: '45px' }}>{t.login}</Button>
                        <Button as={Link} to="/signup" onClick={closeMenu} variant="outline-warning" className="rounded-pill px-3 fw-bold flex-grow-1 flex-lg-grow-0" style={{ height: '45px' }}>{t.signup}</Button>
                    </div>
                )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showSearchOverlay && (
        <div className="search-overlay" style={{ position: 'fixed', top: '80px', left: 0, width: '100%', height: 'calc(100vh - 80px)', backgroundColor: 'rgba(20, 20, 20, 0.98)', zIndex: 1040, overflowY: 'auto', padding: '40px' }}>
          <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', zIndex: 1050 }} onClick={() => setShowSearchOverlay(false)}>
            <span className="text-white display-6 fw-bold">✕</span>
          </div>
          <Container>
            <h2 className="text-white fw-bold mb-5 border-bottom border-secondary pb-3">{t.search_placeholder}</h2>
            <Row>
              <Col md={5} className="mb-4">
                <h5 className="text-white fw-bold mb-4">{t.movies} 🔥</h5>
                {displayMovies.length > 0 ? (
                  displayMovies.map((movie) => (
                    <div key={movie.id} className="d-flex align-items-center mb-3 p-2 rounded hover-effect" style={{ cursor: 'pointer' }} onClick={() => handleResultClick(movie.id)}>
                      <Image src={movie.image} rounded style={{ width: '50px', height: '75px', objectFit: 'cover' }} className="me-3 shadow-sm" />
                      <div><div className="text-white fw-bold">{getMovieTitle(movie)}</div><div className="text-muted small"><span className="text-warning me-2">★ {movie.vote_average}</span><span className="text-secondary">| {movie.category}</span></div></div>
                    </div>
                  ))
                ) : (<p className="text-muted">...</p>)}
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <style>{` .hover-effect:hover { background-color: rgba(255, 255, 255, 0.1); transform: translateX(5px); transition: all 0.2s; } .hover-text-white:hover { color: white !important; padding-left: 5px; } .transition-all { transition: all 0.2s; } .no-caret::after { display: none !important; } `}</style>
    </>
  );
};
export default CustomNavbar;