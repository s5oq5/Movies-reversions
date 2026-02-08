import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaInstagram, FaTwitter, FaYoutube, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-5" style={{ backgroundColor: '#0f1115', color: '#888', borderTop: '1px solid #222', marginTop: 'auto' }}>
      <Container>
        <Row className="gy-4">
          
          <Col md={4}>
            <div className="d-flex align-items-center mb-3">
               <h4 className="text-white fw-bold m-0">
                 <span style={{ color: '#ffc107' }}>Cine</span>Gold <span style={{ fontSize: '0.8rem', color: '#ffc107', marginLeft: '5px' }}>PREMIUM</span>
               </h4>
            </div>
            <p className="small mb-4">
              {t.footer_desc || "Türkiye'nin en büyük sinema zinciri deneyimi."}
            </p>
            
            <div className="d-flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-secondary hover-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-secondary hover-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-secondary hover-white">
                <FaYoutube size={24} />
              </a>
            </div>
          </Col>

          <Col md={2} xs={6}>
            <h6 className="text-white fw-bold mb-3">{t.corporate || "Kurumsal"}</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><a href="#about" className="text-decoration-none text-secondary hover-warning">About Us</a></li>
              <li><a href="#contact" className="text-decoration-none text-secondary hover-warning">Contact</a></li>
              <li><a href="#careers" className="text-decoration-none text-secondary hover-warning">Careers</a></li>
            </ul>
          </Col>

          <Col md={2} xs={6}>
            <h6 className="text-white fw-bold mb-3">{t.vizyon || "Vizyon"}</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><a href="#imax" className="text-decoration-none text-secondary hover-warning">IMAX</a></li>
              <li><a href="#gold" className="text-decoration-none text-secondary hover-warning">Gold Class</a></li>
              <li><a href="#4dx" className="text-decoration-none text-secondary hover-warning">4DX</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="text-white fw-bold mb-3">
              {t.newsletter_title || "Bülten Aboneliği"} 📩
            </h6>
            <p className="small">{t.newsletter_desc || "Kampanyalardan ve yeni filmlerden ilk siz haberdar olun."}</p>
            <Form className="d-flex gap-2">
              <Form.Control 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="bg-dark text-white border-secondary small"
                style={{ borderRadius: '4px', fontSize: '0.9rem' }} 
              />
              <Button variant="warning" className="fw-bold text-dark btn-sm px-3">
                {t.subscribe || "Kayıt Ol"}
              </Button>
            </Form>
          </Col>
        </Row>

        <hr className="my-4 border-secondary opacity-25" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start small mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} CineGold Premium. {t.rights_reserved || "Tüm hakları saklıdır."}
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 opacity-75">
              <FaCcVisa size={28} />
              <FaCcMastercard size={28} />
              <FaCcAmex size={28} />
            </div>
          </Col>
        </Row>
      </Container>
      
      <style>{`
        .hover-white:hover { color: white !important; transform: scale(1.1); transition: 0.3s; }
        .hover-warning:hover { color: #ffc107 !important; padding-left: 5px; transition: 0.2s; }
      `}</style>
    </footer>
  );
};

export default Footer;