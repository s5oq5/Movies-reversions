import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Form, Spinner, Modal } from 'react-bootstrap';
import { useLanguage } from '../LanguageContext';

const MovieDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [movie, setMovie] = useState(null);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cinemas, setCinemas] = useState([]);
  const [dates, setDates] = useState([]);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const TICKET_PRICE = 150;
  const times = ['11:00', '13:30', '16:00', '19:00', '21:30', '00:00'];
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  const localT = {
    tr: { screen: "PERDE", empty: "Boş", selected: "Seçili", full: "Dolu", select_seats: "Lütfen koltuklarınızı seçiniz", price: "TL", location: "Lokasyon", date: "Tarih", time: "Seans", select_city: "Şehir Seçiniz", select_cinema: "Sinema Seçiniz", login_alert: "Bilet almak için lütfen giriş yapınız." },
    en: { screen: "SCREEN", empty: "Empty", selected: "Selected", full: "Full", select_seats: "Please select your seats", price: "TRY", location: "Location", date: "Date", time: "Session", select_city: "Select City", select_cinema: "Select Cinema", login_alert: "Please login to book tickets." },
    ar: { screen: "الشاشة", empty: "متاح", selected: "محدد", full: "محجوز", select_seats: "الرجاء اختيار المقاعد", price: "ليرة", location: "الموقع", date: "التاريخ", time: "العرض", select_city: "اختر المدينة", select_cinema: "اختر السينما", login_alert: "الرجاء تسجيل الدخول لحجز التذاكر." }
  };
  const lt = localT[language];

  const getLocalized = (item, field) => {
    if (!item) return "";
    if (language === 'en') return item[`${field}_en`] || item[field];
    if (language === 'ar') return item[`${field}_ar`] || item[field];
    return item[field];
  };

  useEffect(() => {
    setLoading(true);

    const generateRandomReservedSeats = () => {
        const randomReserved = [];
        const rRows = ['A', 'B', 'C', 'D', 'E'];
        const cCols = [1, 2, 3, 4, 5, 6, 7, 8];
        rRows.forEach(row => {
          cCols.forEach(col => { if (Math.random() < 0.2) randomReserved.push(`${row}${col}`); });
        });
        setReservedSeats(randomReserved);
    };

    Promise.all([
      fetch('/movies.json').then(res => res.json()),
      fetch('/cinemas.json').then(res => res.json())
    ]).then(([moviesData, cinemasData]) => {
      const foundMovie = moviesData.find(m => m.id == id);
      setMovie(foundMovie);
      setCinemas(cinemasData);
      
      if (cinemasData.length > 0) {
        const firstCity = getLocalized(cinemasData[0], 'city');
        setSelectedCity(firstCity);
        
        const cinemasInCity = cinemasData.filter(c => getLocalized(c, 'city') === firstCity);
        
        if (cinemasInCity.length > 0) {
            setSelectedCinema(getLocalized(cinemasInCity[0], 'name'));
        }
      }
      generateRandomReservedSeats();
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));

    const today = new Date();
    const nextDates = [];
    const locale = language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : 'tr-TR';
    const options = { day: 'numeric', month: 'long' };
    
    for (let i = 0; i < 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      let label = d.toLocaleDateString(locale, options);
      if (i === 0) label = language === 'ar' ? "اليوم" : language === 'en' ? "Today" : "Bugün";
      if (i === 1) label = language === 'ar' ? "غداً" : language === 'en' ? "Tomorrow" : "Yarın";
      nextDates.push(label);
    }
    setDates(nextDates);
    setSelectedDate(nextDates[0]);

  }, [id, language]);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    
    const cityCinemas = cinemas.filter(c => getLocalized(c, 'city') === newCity);
    
    if (cityCinemas.length > 0) {
        setSelectedCinema(getLocalized(cityCinemas[0], 'name'));
    } else {
        setSelectedCinema('');
    }
  };

  const toggleSeat = (seatNumber) => {
    if (reservedSeats.includes(seatNumber)) return;
    const isSelected = selectedSeats.includes(seatNumber);
    let newSeats;
    if (isSelected) {
      newSeats = selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      newSeats = [...selectedSeats, seatNumber];
    }
    setSelectedSeats(newSeats);
    setTotalPrice(newSeats.length * TICKET_PRICE);
  };

  const handleOpenModal = () => {
    if (!user) {
        alert(lt.login_alert);
        navigate('/login');
        return;
    }
    if (!selectedCity || !selectedCinema) {
      alert(lt.select_cinema);
      return;
    }
    if (!selectedDate) {
      alert(t.select_date);
      return;
    }
    if (!selectedTime) {
      alert(t.select_time);
      return;
    }
    setShowSeatModal(true);
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert(lt.select_seats);
      return;
    }
    
    const newTicket = {
      id: Date.now(),
      userEmail: user.email,
      movieTitle: getLocalized(movie, 'title'),
      image: movie.image,
      date: selectedDate,
      time: selectedTime,
      cinema: selectedCinema,
      city: selectedCity,
      seats: selectedSeats,
      totalPrice: totalPrice
    };

    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const updatedTickets = [...existingTickets, newTicket];
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    setShowSeatModal(false);
    alert(language === 'ar' ? "تم الحجز بنجاح!" : (language === 'en' ? "Booking Successful!" : "Harika! Biletiniz başarıyla oluşturuldu."));
    navigate('/my-tickets');
  };

  const filteredCinemas = cinemas.filter(c => getLocalized(c, 'city') === selectedCity);

  if (loading) return <div className="text-white text-center mt-5"><Spinner animation="border" variant="warning" /></div>;
  if (!movie) return <div className="text-white text-center mt-5">Film not found.</div>;

  const movieTitle = getLocalized(movie, 'title');
  const movieOverview = getLocalized(movie, 'overview');

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${movie.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(25px) brightness(0.3)', zIndex: -1, transform: 'scale(1.1)' }}></div>

      <Container className="py-5 text-white" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mb-4">
          <Button variant="link" className="text-white text-decoration-none d-flex align-items-center gap-2 p-0 back-btn" onClick={() => navigate(-1)}>
            <div className="back-icon-circle">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </div>
          </Button>
        </div>

        <Row className="align-items-start">
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <Card.Img variant="top" src={movie.image} style={{ height: '500px', objectFit: 'cover' }} />
              <div className="position-absolute top-50 start-50 translate-middle">
                 <Button variant="light" className="rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{width: '70px', height: '70px', opacity: 0.8}} onClick={() => setShowTrailer(true)}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                 </Button>
              </div>
            </Card>
          </Col>

          <Col md={8}>
            <h1 className="fw-bold display-4 mb-3" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>{movieTitle}</h1>
            <div className="mb-4 d-flex align-items-center gap-2">
               <Badge bg="warning" text="dark" className="fs-6 shadow-sm">{movie.category}</Badge>
               <Badge bg="secondary" className="fs-6 shadow-sm">{movie.release_date}</Badge>
               {movie.isUpcoming && <Badge bg="info" className="fs-6 ms-2 shadow-sm">{t.upcoming}</Badge>}
               
               {movie.trailer && (
                   <Button variant="outline-light" size="sm" className="rounded-pill d-flex align-items-center gap-2 ms-2" onClick={() => setShowTrailer(true)}>
                      <span>▶ {t.trailer}</span>
                   </Button>
               )}
            </div>

            <p className="fs-5 text-light mb-5" style={{ lineHeight: '1.8', textShadow: '1px 1px 5px rgba(0,0,0,0.5)' }}>{movieOverview}</p>
            
            {movie.isUpcoming ? (
                <div className="p-5 rounded-4 mb-4 text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid rgba(255,193,7,0.3)', backdropFilter: 'blur(10px)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                    <h3 className="fw-bold text-white mb-3">{t.movie_details_soon}</h3>
                    <p className="text-white-50 fs-5 mb-4">
                        {movie.release_date}
                    </p>
                    <Button variant="outline-warning" className="rounded-pill px-4" onClick={() => setShowTrailer(true)}>
                        ▶ {t.watch_trailer}
                    </Button>
                </div>
            ) : (
                <>
                    <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                        <h5 className="fw-bold text-warning mb-3">📍 {lt.location}</h5>
                        <Row className="mb-4">
                            <Col md={4} className="mb-2">
                                <Form.Select value={selectedCity} onChange={handleCityChange} className="bg-dark text-white border-secondary py-2">
                                    {[...new Set(cinemas.map(c => getLocalized(c, 'city')))].map(city => (<option key={city} value={city}>{city}</option>))}
                                </Form.Select>
                            </Col>
                            <Col md={8}>
                                <Form.Select value={selectedCinema} onChange={(e) => setSelectedCinema(e.target.value)} className="bg-dark text-white border-secondary py-2">
                                    {filteredCinemas.map(cinema => {
                                        const cName = getLocalized(cinema, 'name');
                                        return <option key={cinema.id} value={cName}>{cName}</option>
                                    })}
                                </Form.Select>
                            </Col>
                        </Row>

                        <h5 className="fw-bold text-warning mb-3">📅 {lt.date}</h5>
                        <div className="d-flex gap-2 overflow-auto pb-3 mb-2 hide-scrollbar">
                        {dates.map(date => (
                            <button key={date} className={`date-btn ${selectedDate === date ? 'active' : ''}`} onClick={() => setSelectedDate(date)}>{date}</button>
                        ))}
                        </div>

                        <h5 className="fw-bold text-warning mb-3">⏰ {lt.time}</h5>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                        {times.map(time => (
                            <button key={time} className={`time-btn ${selectedTime === time ? 'active' : ''}`} onClick={() => setSelectedTime(time)}>{time}</button>
                        ))}
                        </div>
                    </div>

                    <Button variant="warning" size="lg" className="w-100 fw-bold py-3 rounded-pill shadow-lg d-flex justify-content-center align-items-center gap-2" style={{ fontSize: '1.2rem' }} onClick={handleOpenModal}>
                    <span>{t.seat_selection}</span> 
                    <span style={{ fontSize: '1.5rem', transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}>➝</span>
                    </Button>
                </>
            )}

          </Col>
        </Row>

        <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg" centered className="trailer-modal">
            <Modal.Header closeButton className="bg-black border-0 text-white">
                <Modal.Title>{movieTitle} - {t.trailer}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-black p-0">
                <div className="ratio ratio-16x9">
                    {movie.trailer ? (
                        <iframe src={movie.trailer} title="Trailer" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    ) : (
                        <div className="d-flex align-items-center justify-content-center text-white">No Trailer Available.</div>
                    )}
                </div>
            </Modal.Body>
        </Modal>

        {showSeatModal && (
          <div className="seat-modal-overlay">
            <div className="seat-modal-content">
              <button className="close-btn" onClick={() => setShowSeatModal(false)}>✕</button>
              
              <div className="text-center mb-4">
                  <h4 className="fw-bold text-warning mb-1">{movieTitle}</h4>
                  <p className="text-white-50 small mb-0">{lt.select_seats}</p>
              </div>

              <div className="screen-container">
                <div className="cinema-screen"></div>
                <p className="text-center text-secondary small mt-1">{lt.screen}</p>
              </div>

              <div className="seats-grid">
                {rows.map(row => (
                  <div key={row} className="d-flex justify-content-center gap-2 mb-2">
                    {cols.map(col => {
                      const seatNum = `${row}${col}`;
                      const isSelected = selectedSeats.includes(seatNum);
                      const isReserved = reservedSeats.includes(seatNum);
                      return (
                        <div key={seatNum} className={`seat ${isReserved ? 'reserved' : isSelected ? 'selected' : ''}`} onClick={() => toggleSeat(seatNum)}>
                          <span style={{ fontSize: '8px', color: '#000', opacity: (isSelected || isReserved) ? 1 : 0 }}>{seatNum}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center gap-4 mt-3 mb-3 small text-white">
                <div className="d-flex align-items-center"><span className="legend-dot empty"></span> {lt.empty}</div>
                <div className="d-flex align-items-center"><span className="legend-dot selected"></span> {lt.selected}</div>
                <div className="d-flex align-items-center"><span className="legend-dot full"></span> {lt.full}</div>
              </div>

              <Button variant="warning" className="w-100 py-3 fw-bold rounded-pill mt-2 shadow" onClick={handlePayment}>
                {totalPrice > 0 ? `${totalPrice} ${lt.price} - ${t.confirm}` : lt.select_seats}
              </Button>
            </div>
          </div>
        )}

        <style>{`
          .seat-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center; }
          .seat-modal-content { background: #18181b; width: 95%; max-width: 550px; border-radius: 20px; padding: 25px; border: 1px solid #333; position: relative; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
          .close-btn { position: absolute; top: 15px; right: 20px; background: none; border: none; color: #ccc; font-size: 1.5rem; cursor: pointer; transition: color 0.3s; } .close-btn:hover { color: #fff; }
          .back-btn { transition: all 0.3s ease; opacity: 0.8; } .back-btn:hover { opacity: 1; transform: translateX(-5px); color: #ffc107 !important; }
          .back-icon-circle { background: rgba(255,255,255,0.1); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transition: all 0.3s; } .back-btn:hover .back-icon-circle { background: #ffc107; color: black; }
          .date-btn, .time-btn { background: transparent; border: 1px solid #555; color: #ddd; padding: 8px 20px; border-radius: 12px; font-size: 0.95rem; transition: all 0.2s; white-space: nowrap; }
          .date-btn:hover, .time-btn:hover { border-color: #ffc107; color: white; background: rgba(255, 193, 7, 0.1); }
          .date-btn.active, .time-btn.active { background: #ffc107; color: black; border-color: #ffc107; font-weight: bold; box-shadow: 0 0 15px rgba(255, 193, 7, 0.4); transform: scale(1.05); }
          .screen-container { margin-bottom: 20px; perspective: 500px; } .cinema-screen { height: 15px; width: 80%; margin: 0 auto; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%); border-radius: 50%; box-shadow: 0 10px 20px rgba(255,255,255,0.2); transform: rotateX(-15deg); }
          .seat { width: 32px; height: 32px; background-color: #444; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; } 
          .seat.selected { background-color: #ffc107; box-shadow: 0 0 10px #ffc107; transform: scale(1.1); } .seat.reserved { background-color: #d9534f; cursor: not-allowed; opacity: 0.5; }
          .legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 5px; } .legend-dot.empty { background: #444; } .legend-dot.selected { background: #ffc107; } .legend-dot.full { background: #d9534f; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .trailer-modal .modal-content { background-color: black; border: 1px solid #333; }
          .trailer-modal .btn-close { filter: invert(1); }
        `}</style>
      </Container>
    </>
  );
};

export default MovieDetails;