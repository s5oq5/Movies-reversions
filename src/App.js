import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { LanguageProvider } from './LanguageContext';

import CustomNavbar from './components/Navbar';
import Home from './components/Home';
import MyTickets from './components/MyTickets';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import MyFavorites from './components/MyFavorites';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const handleToggleFavorite = (movie) => {
    if (!user) {
      alert("Lütfen önce giriş yapınız! (الرجاء تسجيل الدخول أولاً)");
      return;
    }

    const currentFavorites = user.favorites || [];
    const isFavorite = currentFavorites.some(fav => fav.id === movie.id);
    
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = currentFavorites.filter(fav => fav.id !== movie.id);
    } else {
      updatedFavorites = [...currentFavorites, movie];
    }

    const updatedUser = { ...user, favorites: updatedFavorites };
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsersList = allUsers.map(u => u.email === user.email ? updatedUser : u);
    
    localStorage.setItem('users', JSON.stringify(updatedUsersList));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <CustomNavbar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            user={user} 
            handleLogout={handleLogout}
          />
          
          <div className="flex-grow-1">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    searchTerm={searchTerm}
                    user={user}
                    onToggleFavorite={handleToggleFavorite}
                  />
                } 
              />
              
              <Route path="/movie/:id" element={<MovieDetails user={user} />} />
              <Route path="/my-tickets" element={<MyTickets user={user} />} />
              <Route path="/my-favorites" element={<MyFavorites user={user} onToggleFavorite={handleToggleFavorite} />} />
              
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/signup" element={<Signup setUser={setUser} />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;