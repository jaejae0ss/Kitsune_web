// src/components/common/Navigation.tsx

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategories } from '../../api/categories';
import { getProjects } from '../../api/projects';
import type { Category, Project } from '../../types';
import './Navigation.css';
import logo from '../../assets/Kitsune.png';

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesData, projectsData] = await Promise.all([
        getCategories(),
        getProjects()
      ]);
      
      // 카테고리 3개만
      setCategories(categoriesData.slice(0, 3));
      
      // 최근 프로젝트 2개만
      setRecentProjects(projectsData.slice(0, 2));
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <img
              src={logo}
              alt="Home Lab"
              className="logo-image"
            />
            <span className='logo-text'>Home Lab</span>
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
              href="https://github.com/jaejae0ss/" 
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
                  
                  {/* Supabase에서 가져온 카테고리 */}
                  {categories.map((category) => (
                    <Link 
                      key={category.id}
                      to={`/posts?category=${category.id}`} 
                      className="mega-menu-item"
                    >
                      <div className="item-icon">{category.icon}</div>
                      <div className="item-info">
                        <div className="item-title">{category.name}</div>
                        <div className="item-desc">{category.description}</div>
                      </div>
                    </Link>
                  ))}

                  {/* 전체 카테고리 보기 */}
                  <Link to="/categories" className="mega-menu-link-all">
                    전체 카테고리 보기 →
                  </Link>
                </div>

                <div className="mega-menu-section">
                  <h3 className="section-title">최근 프로젝트</h3>
                  
                  {/* Supabase에서 가져온 프로젝트 */}
                  {recentProjects.map((project) => (
                    <Link 
                      key={project.id}
                      to={`/posts/${project.id}`} 
                      className="mega-menu-item"
                    >
                      <div className="item-info">
                        <div className="item-title">{project.name}</div>
                        <div className="item-desc">{project.description}</div>
                      </div>
                    </Link>
                  ))}

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
                  <Link to="/about/profile" className="mega-menu-item">
                    <div className="item-info">
                      <div className="item-title">프로필</div>
                      <div className="item-desc">소개 및 경력</div>
                    </div>
                  </Link>
                  <Link to="/about/skills" className="mega-menu-item">
                    <div className="item-info">
                      <div className="item-title">기술 스택</div>
                      <div className="item-desc">사용 기술 및 도구</div>
                    </div>
                  </Link>
                  <Link to="/about/contact" className="mega-menu-item">
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
