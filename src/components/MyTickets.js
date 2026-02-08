import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useLanguage } from '../LanguageContext';

const MyTickets = ({ user }) => {
  const { t, language } = useLanguage();
  const [tickets, setTickets] = useState([]);

  const ticketLabels = {
    tr: { active: "Aktif", date: "TARİH", time: "SAAT", price: "TUTAR", seats: "KOLTUKLAR", cancel: "İptal Et", currency: "TL", empty_title: "Henüz biletiniz yok.", empty_desc: "Aldığınız biletler burada listelenecektir.", confirm_cancel: "Bileti iptal etmek istediğinize emin misiniz?" },
    en: { active: "Active", date: "DATE", time: "TIME", price: "AMOUNT", seats: "SEATS", cancel: "Cancel", currency: "TRY", empty_title: "No tickets yet.", empty_desc: "Tickets you buy will be listed here.", confirm_cancel: "Are you sure you want to cancel the ticket?" },
    ar: { active: "فعال", date: "التاريخ", time: "الوقت", price: "المبلغ", seats: "المقاعد", cancel: "إلغاء", currency: "ليرة", empty_title: "لا توجد تذاكر.", empty_desc: "التذاكر التي تشتريها ستظهر هنا.", confirm_cancel: "هل أنت متأكد أنك تريد إلغاء التذكرة؟" }
  };
  const tl = ticketLabels[language];

  useEffect(() => {
    const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    if (user) {
        const userTickets = allTickets.filter(t => t.userEmail === user.email);
        setTickets(userTickets.sort((a, b) => b.id - a.id));
    } else {
        setTickets([]);
    }
  }, [user]);

  const handleCancelTicket = (id) => {
    if (window.confirm(tl.confirm_cancel)) {
      const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const updatedTickets = allTickets.filter(ticket => ticket.id !== id);
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
      
      if (user) {
        setTickets(updatedTickets.filter(t => t.userEmail === user.email).sort((a, b) => b.id - a.id));
      }
    }
  };

  if (!user) return <Container className="py-5 text-white text-center"><h2>{t.login_title}</h2></Container>;

  return (
    <Container className="py-5">
      <h2 className={`text-white fw-bold mb-5 ${language === 'ar' ? 'border-end ps-0 pe-3' : 'border-start ps-3'} border-4 border-warning`}>
        {t.my_tickets}
      </h2>

      {tickets.length === 0 ? (
        <div className="text-center text-white py-5">
          <div style={{ fontSize: '4rem' }}>🎟️</div>
          <h4 className="mt-3">{tl.empty_title}</h4>
          <p className="text-white-50">{tl.empty_desc}</p>
        </div>
      ) : (
        <Row>
          {tickets.map((ticket) => (
            <Col lg={6} key={ticket.id} className="mb-4">
              <div 
                className="d-flex bg-dark text-white rounded-4 overflow-hidden shadow-lg position-relative ticket-card"
                style={{ border: '1px solid #333', minHeight: '200px' }}
              >
                <div style={{ width: '140px', flexShrink: 0 }}>
                    <img 
                        src={ticket.image || "https://via.placeholder.com/150x225"} 
                        alt={ticket.movieTitle}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h4 className="fw-bold text-white mb-1">{ticket.movieTitle}</h4>
                            <div className="text-warning small mb-2">
                                <i className="bi bi-geo-alt-fill me-1"></i> 
                                {ticket.city} - {ticket.cinema}
                            </div>
                        </div>
                        <Badge bg="success" className="px-2 py-1">{tl.active}</Badge>
                    </div>

                    <div className="d-flex justify-content-between bg-secondary bg-opacity-10 p-2 rounded mb-3">
                        <div className="text-center px-2">
                            <span className="d-block text-white-50 x-small">{tl.date}</span>
                            <span className="fw-bold">{ticket.date}</span>
                        </div>
                        <div className="border-end border-secondary mx-1"></div>
                        <div className="text-center px-2">
                            <span className="d-block text-white-50 x-small">{tl.time}</span>
                            <span className="fw-bold">{ticket.time}</span>
                        </div>
                        <div className="border-end border-secondary mx-1"></div>
                        <div className="text-center px-2">
                            <span className="d-block text-white-50 x-small">{tl.price}</span>
                            <span className="fw-bold text-success">{ticket.totalPrice} {tl.currency}</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div>
                            <span className="text-white-50 x-small d-block">{tl.seats}</span>
                            <span className="fw-bold text-warning fs-5">
                                {ticket.seats && ticket.seats.length > 0 ? ticket.seats.join(', ') : '-'}
                            </span>
                        </div>
                        
                        <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="rounded-pill px-3"
                            onClick={() => handleCancelTicket(ticket.id)}
                        >
                            {tl.cancel} ✕
                        </Button>
                    </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <style>{`
        .x-small { font-size: 0.7rem; letter-spacing: 0.5px; }
        .ticket-card { transition: transform 0.2s; }
        .ticket-card:hover { transform: translateY(-3px); border-color: #555; }
      `}</style>
    </Container>
  );
};

export default MyTickets;