// src/pages/About/Profile.tsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  useEffect(() => {
    document.title = '프로필 | Home Lab Portfolio';
  }, []);

  return (
    <div className="profile">
      <div className="breadcrumb">
        <Link to="/about">About</Link>
        <span> / </span>
        <span>프로필</span>
      </div>

      <section className="profile-section">
        <div className="section-content">
          <h1 className="page-title">프로필</h1>
          
          <div className="profile-card">
            <div className="profile-image">
              <div className="profile-image-placeholder">👤</div>
            </div>
            
            <div className="profile-info">
              <h2 className="profile-name">홍길동</h2>
              <p className="profile-role">Infrastructure Engineer</p>
              
              <div className="profile-description">
                <p>
                  홈 랩 환경에서 실무 수준의 인프라를 구축하고 운영하는 것을 좋아합니다.
                  네트워크, 서버, 보안 등 다양한 분야의 기술을 학습하고 실제로 구현하며
                  실무 경험을 쌓고 있습니다.
                </p>
                <p>
                  이론만이 아닌 직접 손으로 만지고 문제를 해결하면서 배우는 것을
                  중요하게 생각합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="experience-section">
            <h3 className="section-subtitle">경험</h3>
            
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2024</div>
                <div className="timeline-content">
                  <h4>홈 랩 구축</h4>
                  <p>3-tier 네트워크 아키텍처 설계 및 구현</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">2023</div>
                <div className="timeline-content">
                  <h4>Docker 기반 서비스 운영</h4>
                  <p>컨테이너 오케스트레이션 및 자동화</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">2022</div>
                <div className="timeline-content">
                  <h4>네트워크 학습 시작</h4>
                  <p>VLAN, 라우팅, 방화벽 설정</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
