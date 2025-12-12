// src/pages/About/Skills.tsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Skills.css';

const Skills = () => {
  useEffect(() => {
    document.title = '기술 스택 | Home Lab Portfolio';
  }, []);

  return (
    <div className="skills-page">
      <div className="breadcrumb">
        <Link to="/about">About</Link>
        <span> / </span>
        <span>기술 스택</span>
      </div>

      <section className="skills-section">
        <div className="section-content">
          <h1 className="page-title">기술 스택</h1>
          
          <div className="skills-grid">
            {/* Network */}
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">🌐</div>
                <h3 className="category-title">Network</h3>
              </div>
              <ul className="skill-list">
                <li>
                  <span className="skill-name">VLAN 설계 및 구축</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">라우팅 & 스위칭</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">VPN 구성</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">방화벽 설정</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Server */}
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">🖥️</div>
                <h3 className="category-title">Server</h3>
              </div>
              <ul className="skill-list">
                <li>
                  <span className="skill-name">Linux (Ubuntu, CentOS)</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">Docker & Docker Compose</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">Nginx, Apache</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">가상화 (Proxmox, VMware)</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '75%' }}></div>
                  </div>
                </li>
              </ul>
            </div>

            {/* DevOps */}
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">⚙️</div>
                <h3 className="category-title">DevOps</h3>
              </div>
              <ul className="skill-list">
                <li>
                  <span className="skill-name">Git & GitHub</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">CI/CD 파이프라인</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '75%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">모니터링 (Grafana, Prometheus)</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">자동화 스크립트</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Security */}
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">🔒</div>
                <h3 className="category-title">Security</h3>
              </div>
              <ul className="skill-list">
                <li>
                  <span className="skill-name">pfSense 방화벽</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">SSL/TLS 인증서</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">침입 탐지 시스템</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '70%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="skill-name">보안 정책 수립</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '75%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
