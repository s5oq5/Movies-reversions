import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === formData.email && u.password === formData.password);

    if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        setUser(foundUser);
        navigate('/');
    } else {
        setError(language === 'ar' ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : (language === 'en' ? "Invalid email or password" : "E-posta veya şifre hatalı."));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px', backgroundColor: '#161a20', color: 'white', border: '1px solid #333' }} className="p-4 shadow-lg rounded-4">
        <h2 className="text-center fw-bold mb-4 text-warning">{t.login_title}</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{language === 'ar' ? 'البريد الإلكتروني' : (language === 'en' ? 'Email' : 'E-posta')}</Form.Label>
            <Form.Control 
              autoFocus
              type="email" 
              placeholder={t.email_placeholder}
              className="bg-dark text-white border-secondary" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{t.password}</Form.Label>
            <Form.Control type="password" placeholder="******" className="bg-dark text-white border-secondary" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </Form.Group>
          <Button variant="warning" type="submit" className="w-100 fw-bold rounded-pill">{t.login}</Button>
        </Form>
        <div className="text-center mt-3 text-white-50">{t.no_account} <Link to="/signup" className="text-warning text-decoration-none fw-bold">{t.signup}</Link></div>
      </Card>
    </Container>
  );
};

export default Login;