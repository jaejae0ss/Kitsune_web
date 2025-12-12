// src/pages/About/About.tsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  useEffect(() => {
    document.title = '소개 | Home Lab Portfolio';
  }, []);

  return (
    <div className="about">
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About</h1>
          <p className="hero-subtitle">
            저에 대해 더 알아보세요
          </p>
        </div>
      </section>

      <section className="about-menu">
        <div className="menu-content">
          <Link to="/about/profile" className="menu-card">
            <div className="card-icon">👤</div>
            <h3 className="card-title">프로필</h3>
            <p className="card-description">소개 및 경력</p>
          </Link>

          <Link to="/about/skills" className="menu-card">
            <div className="card-icon">💻</div>
            <h3 className="card-title">기술 스택</h3>
            <p className="card-description">사용 기술 및 도구</p>
          </Link>

          <Link to="/about/contact" className="menu-card">
            <div className="card-icon">📧</div>
            <h3 className="card-title">연락처</h3>
            <p className="card-description">이메일 및 SNS</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
