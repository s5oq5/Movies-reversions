import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError(language === 'ar' ? "يرجى ملء جميع الحقول" : (language === 'en' ? "Please fill all fields" : "Lütfen tüm alanları doldurunuz."));
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === formData.email)) {
        setError(language === 'ar' ? "هذا البريد الإلكتروني مسجل بالفعل" : (language === 'en' ? "Email already registered" : "Bu e-posta adresi zaten kayıtlı."));
        return;
    }

    const newUser = { id: Date.now(), ...formData, favorites: [] };
    users.push(newUser);
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setUser(newUser);
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px', backgroundColor: '#161a20', color: 'white', border: '1px solid #333' }} className="p-4 shadow-lg rounded-4">
        <h2 className="text-center fw-bold mb-4 text-warning">{t.signup_title}</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t.name}</Form.Label>
            <Form.Control 
              autoFocus
              type="text" 
              placeholder={language === 'ar' ? 'الاسم الكامل' : 'Adınızı giriniz'} 
              className="bg-dark text-white border-secondary" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{language === 'ar' ? 'البريد الإلكتروني' : (language === 'en' ? 'Email' : 'E-posta')}</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" className="bg-dark text-white border-secondary" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{t.password}</Form.Label>
            <Form.Control type="password" placeholder="******" className="bg-dark text-white border-secondary" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </Form.Group>
          <Button variant="warning" type="submit" className="w-100 fw-bold rounded-pill">{t.signup}</Button>
        </Form>
        <div className="text-center mt-3 text-white-50">{t.have_account} <Link to="/login" className="text-warning text-decoration-none fw-bold">{t.login}</Link></div>
      </Card>
    </Container>
  );
};

export default Signup;