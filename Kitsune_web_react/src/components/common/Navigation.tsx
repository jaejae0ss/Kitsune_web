// src/components/common/Navigation.tsx

import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <>
      <nav className="navigation">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            🏠 Home Lab
          </Link>
          
          <div className="nav-links">
            <span 
              className="nav-link"
              onMouseEnter={() => setActiveMenu('projects')}
            >
              Projects
            </span>
            <span 
              className="nav-link"
              onMouseEnter={() => setActiveMenu('about')}
            >
              About
            </span>
            <a 
              href="https://github.com/your-username" 
              className="nav-link"
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveMenu(null)}
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* 메가 메뉴 오버레이 */}
      {activeMenu && (
        <div 
          className="mega-menu-overlay"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="mega-menu-content">
            {activeMenu === 'projects' && (
              <div className="mega-menu-grid">
                <div className="mega-menu-section">
                  <h3 className="section-title">카테고리</h3>
                  <Link to="/posts?category=network" className="mega-menu-item">
                    <div className="item-icon">🌐</div>
                    <div className="item-info">
                      <div className="item-title">Network</div>
                      <div className="item-desc">네트워크 인프라 구축</div>
                    </div>
                  </Link>
                  <Link to="/posts?category=web" className="mega-menu-item">
                    <div className="item-icon">🖥️</div>
                    <div className="item-info">
                      <div className="item-title">Web Server</div>
                      <div className="item-desc">웹 서버 및 프록시</div>
                    </div>
                  </Link>
                  <Link to="/posts?category=service" className="mega-menu-item">
                    <div className="item-icon">⚙️</div>
                    <div className="item-info">
                      <div className="item-title">Service</div>
                      <div className="item-desc">서비스 운영 자동화</div>
                    </div>
                  </Link>
                  <Link to="/posts?category=security" className="mega-menu-item">
                    <div className="item-icon">🔒</div>
                    <div className="item-info">
                      <div className="item-title">Security</div>
                      <div className="item-desc">보안 설정 및 모니터링</div>
                    </div>
                  </Link>
                </div>

                <div className="mega-menu-section">
                  <h3 className="section-title">최근 프로젝트</h3>
                  <Link to="/posts/network-vlan" className="mega-menu-item">
                    <div className="item-info">
                      <div className="item-title">VLAN 네트워크 구축</div>
                      <div className="item-desc">3-tier 네트워크 세그멘테이션</div>
                    </div>
                  </Link>
                  <Link to="/posts/web-nginx" className="mega-menu-item">
                    <div className="item-info">
                      <div className="item-title">Nginx 리버스 프록시</div>
                      <div className="item-desc">Docker 기반 웹 서버</div>
                    </div>
                  </Link>
                  <Link to="/posts" className="mega-menu-link-all">
                    모든 프로젝트 보기 →
                  </Link>
                </div>
              </div>
            )}

            {activeMenu === 'about' && (
              <div className="mega-menu-grid">
                <div className="mega-menu-section">
                  <h3 className="section-title">소개</h3>
                  <Link to="/about#intro" className="mega-menu-item">
                    <div className="item-info">
                      <div className="item-title">프로필</div>
                      <div className="item-desc">소개 및 경력</div>
                    </div>
                  </Link>
                  <Link to="/about#skills" className="mega-menu-item">
                    <div className="item-info">
                      <div className="item-title">기술 스택</div>
                      <div className="item-desc">사용 기술 및 도구</div>
                    </div>
                  </Link>
                  <Link to="/about#contact" className="mega-menu-item">
                    <div className="item-info">
                      <div className="item-title">연락처</div>
                      <div className="item-desc">이메일 및 SNS</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
