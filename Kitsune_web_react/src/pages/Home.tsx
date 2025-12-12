// src/pages/Home.tsx

import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // 임시 최근 프로젝트 데이터
  const recentPosts = [
    {
      id: 'network-vlan',
      title: 'VLAN 네트워크 구축',
      description: '3-tier 네트워크 세그멘테이션',
      category: 'Network',
      image: '/images/network.jpg', // 나중에 실제 이미지로
      color: '#0071e3'
    },
    {
      id: 'web-nginx',
      title: 'Nginx 리버스 프록시',
      description: 'Docker 기반 웹 서버 구성',
      category: 'Web',
      image: '/images/web.jpg',
      color: '#06c'
    },
    {
      id: 'security-firewall',
      title: '방화벽 정책 설계',
      description: 'pfSense 보안 설정',
      category: 'Security',
      image: '/images/security.jpg',
      color: '#bf4800'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            홈 랩으로 시작하는
            <br />
            인프라 여정
          </h1>
          <p className="hero-subtitle">
            실무 환경을 직접 구축하고 운영하며 쌓은 경험들
          </p>
          <div className="hero-links">
            <Link to="/posts" className="link-primary">
              프로젝트 둘러보기
            </Link>
            <Link to="/about" className="link-secondary">
              더 알아보기
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="recent-section">
        <div className="section-header">
          <h2 className="section-title">최근 프로젝트</h2>
          <Link to="/posts" className="view-all-link">
            모두 보기 →
          </Link>
        </div>

        <div className="projects-showcase">
          {recentPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/posts/${post.id}`} 
              className="project-showcase-card"
            >
              <div 
                className="card-image"
                style={{ backgroundColor: post.color }}
              >
                {/* 이미지 자리 - 나중에 실제 이미지로 */}
                <div className="image-placeholder">
                  {post.category}
                </div>
              </div>
              <div className="card-info">
                <span className="card-category">{post.category}</span>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-description">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">프로젝트 카테고리</h2>
        <div className="categories-grid">
          <Link to="/posts?category=network" className="category-card">
            <div className="category-icon">🌐</div>
            <h3>Network</h3>
            <p>네트워크 인프라 구축</p>
          </Link>
          <Link to="/posts?category=web" className="category-card">
            <div className="category-icon">🖥️</div>
            <h3>Web Server</h3>
            <p>웹 서버 및 프록시</p>
          </Link>
          <Link to="/posts?category=service" className="category-card">
            <div className="category-icon">⚙️</div>
            <h3>Service</h3>
            <p>서비스 운영 및 자동화</p>
          </Link>
          <Link to="/posts?category=security" className="category-card">
            <div className="category-icon">🔒</div>
            <h3>Security</h3>
            <p>보안 설정 및 모니터링</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
