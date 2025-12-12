// src/pages/About/Contact.tsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    document.title = '연락처 | Home Lab Portfolio';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('메시지가 전송되었습니다!');
    // 실제로는 이메일 API나 백엔드로 전송
  };

  return (
    <div className="contact-page">
      <div className="breadcrumb">
        <Link to="/about">About</Link>
        <span> / </span>
        <span>연락처</span>
      </div>

      <section className="contact-section">
        <div className="section-content">
          <h1 className="page-title">연락처</h1>
          <p className="page-subtitle">
            언제든지 편하게 연락주세요
          </p>
          
          <div className="contact-grid">
            {/* Email */}
            <a href="mailto:your.email@example.com" className="contact-card">
              <div className="contact-icon">📧</div>
              <div className="contact-info">
                <h3 className="contact-title">Email</h3>
                <p className="contact-detail">your.email@example.com</p>
                <span className="contact-action">메일 보내기 →</span>
              </div>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div className="contact-info">
                <h3 className="contact-title">GitHub</h3>
                <p className="contact-detail">@your-username</p>
                <span className="contact-action">프로필 보기 →</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/your-profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">💼</div>
              <div className="contact-info">
                <h3 className="contact-title">LinkedIn</h3>
                <p className="contact-detail">프로필 연결하기</p>
                <span className="contact-action">방문하기 →</span>
              </div>
            </a>

            {/* Blog */}
            <a 
              href="https://your-blog.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">📝</div>
              <div className="contact-info">
                <h3 className="contact-title">Blog</h3>
                <p className="contact-detail">기술 블로그</p>
                <span className="contact-action">블로그 보기 →</span>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="form-title">메시지 보내기</h2>
            <p className="form-subtitle">
              궁금한 점이나 협업 제안이 있으시면 메시지를 남겨주세요.
            </p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="홍길동"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="example@email.com"
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">제목</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="메시지 제목"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">메시지</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={6}
                  placeholder="메시지를 입력하세요"
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">
                보내기
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
