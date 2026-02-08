// src/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // اللغة الافتراضية التركية
  const [language, setLanguage] = useState('tr'); 

  // قاموس الترجمات
  const translations = {
    tr: {
      home: "Ana Sayfa",
      movies: "Filmler",
      upcoming: "Yakında",
      campaigns: "Kampanyalar",
      special_halls: "Özel Salonlar",
      search_placeholder: "Ara...",
      my_tickets: "Biletlerim",
      login: "Giriş",
      signup: "Kayıt",
      logout: "Çıkış Yap",
      favorites: "Favorilerim",
      view_all: "Tümü >",
      book_now: "Bilet Al",
      examine: "İncele",
      footer_desc: "Türkiye'nin en büyük sinema zinciri deneyimi.",
      newsletter_title: "Bülten Aboneliği 📩",
      newsletter_desc: "Kampanyalardan ve yeni filmlerden ilk siz haberdar olun.",
      email_placeholder: "E-posta adresiniz",
      subscribe: "Kayıt Ol",
      corporate: "Kurumsal",
      vision: "Vizyon",
      rights: "Tüm hakları saklıdır.",
      select_city: "Şehir Seçiniz",
      select_cinema: "Sinema Seçiniz",
      select_date: "Tarih",
      select_time: "Seans",
      seat_selection: "Koltuk Seçimi & Ödeme",
      confirm: "ONAYLA",
      cancel: "İptal Et",
      login_title: "Giriş Yap",
      signup_title: "Hesap Oluştur",
      name: "Ad Soyad",
      password: "Şifre",
      no_account: "Hesabınız yok mu?",
      have_account: "Zaten hesabınız var mı?",
      loading: "Yükleniyor...",
      movie_details_soon: "Film detayı yakında eklenecek...",
      location: "Lokasyon",
      trailer: "Fragman",
      watch_trailer: "Fragmanı İzle"
    },
    en: {
      home: "Home",
      movies: "Movies",
      upcoming: "Coming Soon",
      campaigns: "Campaigns",
      special_halls: "Special Halls",
      search_placeholder: "Search...",
      my_tickets: "My Tickets",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      favorites: "My Favorites",
      view_all: "All >",
      book_now: "Book Now",
      examine: "Details",
      footer_desc: "Turkey's largest cinema chain experience.",
      newsletter_title: "Newsletter Subscription 📩",
      newsletter_desc: "Be the first to know about campaigns and new movies.",
      email_placeholder: "Your email address",
      subscribe: "Subscribe",
      corporate: "Corporate",
      vision: "Vision",
      rights: "All rights reserved.",
      select_city: "Select City",
      select_cinema: "Select Cinema",
      select_date: "Date",
      select_time: "Session",
      seat_selection: "Seat Selection & Payment",
      confirm: "CONFIRM",
      cancel: "Cancel",
      login_title: "Login",
      signup_title: "Create Account",
      name: "Full Name",
      password: "Password",
      no_account: "Don't have an account?",
      have_account: "Already have an account?",
      loading: "Loading...",
      movie_details_soon: "Movie details coming soon...",
      location: "Location",
      trailer: "Trailer",
      watch_trailer: "Watch Trailer"
    },
    ar: {
      home: "الرئيسية",
      movies: "الأفلام",
      upcoming: "قريباً",
      campaigns: "العروض",
      special_halls: "صالات خاصة",
      search_placeholder: "بحث...",
      my_tickets: "تذاكري",
      login: "دخول",
      signup: "تسجيل",
      logout: "خروج",
      favorites: "المفضلة",
      view_all: "الكل <",
      book_now: "احجز الآن",
      examine: "تفاصيل",
      footer_desc: "أكبر سلسلة دور عرض سينمائي في تركيا.",
      newsletter_title: "النشرة البريدية 📩",
      newsletter_desc: "كن أول من يعلم عن العروض والأفلام الجديدة.",
      email_placeholder: "البريد الإلكتروني",
      subscribe: "اشترك",
      corporate: "المؤسسة",
      vision: "الرؤية",
      rights: "جميع الحقوق محفوظة.",
      select_city: "اختر المدينة",
      select_cinema: "اختر السينما",
      select_date: "التاريخ",
      select_time: "العرض",
      seat_selection: "اختر المقاعد والدفع",
      confirm: "تأكيد",
      cancel: "إلغاء",
      login_title: "تسجيل الدخول",
      signup_title: "إنشاء حساب",
      name: "الاسم الكامل",
      password: "كلمة المرور",
      no_account: "ليس لديك حساب؟",
      have_account: "لديك حساب بالفعل؟",
      loading: "جاري التحميل...",
      movie_details_soon: "تفاصيل الفيلم قريباً...",
      location: "الموقع",
      trailer: "إعلان",
      watch_trailer: "شاهد الإعلان"
    }
  };

  // تغيير اتجاه الصفحة للعربي
  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};