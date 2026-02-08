import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useLanguage } from '../LanguageContext';

const HeroSlider = () => {
  const { language } = useLanguage();

  const sliderContent = {
    tr: {
      slide1_title: "Dune: Part Two",
      slide1_desc: "Bu yılın en çok beklenen filmi şimdi sinemalarda.",
      slide1_btn: "Bilet Al",
      slide2_title: "Rebel Moon",
      slide2_desc: "Galaksinin kaderi senin ellerinde.",
      slide2_btn: "İncele"
    },
    en: {
      slide1_title: "Dune: Part Two",
      slide1_desc: "The most anticipated movie of the year is now in theaters.",
      slide1_btn: "Book Now",
      slide2_title: "Rebel Moon",
      slide2_desc: "The fate of the galaxy is in your hands.",
      slide2_btn: "Details"
    },
    ar: {
      slide1_title: "كثيب: الجزء الثاني",
      slide1_desc: "الفيلم الأكثر انتظاراً لهذا العام، الآن في صالات السينما.",
      slide1_btn: "احجز الآن",
      slide2_title: "ريبل مون",
      slide2_desc: "مصير المجرة أصبح بين يديك.",
      slide2_btn: "التفاصيل"
    }
  };

  const content = sliderContent[language];

  return (
    <div className="hero-slider mb-5">
      <Carousel fade interval={3000} controls={false} indicators={true}>
        <Carousel.Item style={{ height: '600px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
             <img
              className="d-block w-100 h-100"
              src="https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg"
              alt="Dune 2"
              style={{ objectFit: 'cover', filter: 'brightness(0.5)' }} 
            />
          </div>
          
          <Carousel.Caption className={`text-${language === 'ar' ? 'end' : 'start'}`} style={{ bottom: '20%', left: '10%', right: '10%', zIndex: 2 }}>
            <h1 className="display-3 fw-bold text-white">{content.slide1_title}</h1>
            <p className="fs-5 text-white">{content.slide1_desc}</p>
            <Button className="btn-paribu btn-lg px-4 rounded-pill">{content.slide1_btn}</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: '600px' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <img
              className="d-block w-100 h-100"
              src="https://image.tmdb.org/t/p/original/v9acaWVVFdZT5yAU7J2QjwfhXyD.jpg"
              alt="Rebel Moon"
              style={{ objectFit: 'cover', filter: 'brightness(0.5)' }}
            />
          </div>

          <Carousel.Caption className={`text-${language === 'ar' ? 'end' : 'start'}`} style={{ bottom: '20%', left: '10%', right: '10%', zIndex: 2 }}>
            <h1 className="display-3 fw-bold text-white">{content.slide2_title}</h1>
            <p className="fs-5 text-white">{content.slide2_desc}</p>
            <Button className="btn-paribu btn-lg px-4 rounded-pill">{content.slide2_btn}</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroSlider;