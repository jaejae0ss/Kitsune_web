// src/pages/Categories/Categories.tsx

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategories } from '../../api/categories';
import { getProjects } from '../../api/projects';
import { getPosts } from '../../api/posts';
import type { Category, Project, Post } from '../../types';
import './Categories.css';

const Categories = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesData, projectsData, postsData] = await Promise.all([
        getCategories(),
        getProjects(),
        getPosts()
      ]);
      setCategories(categoriesData);
      setProjects(projectsData);
      setPosts(postsData);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 선택된 카테고리 정보
  const selectedCategory = categories.find(c => c.id === categoryParam);

  // 프로젝트 목록 표시 여부
  const showProjects = categoryParam !== null;

  // 선택된 카테고리의 프로젝트만 필터링
  const filteredProjects = categoryParam
    ? projects.filter(p => p.category_id === categoryParam)
    : projects;

  // 프로젝트별 게시글 개수
  const getPostCount = (projectId: string) => {
    return posts.filter(p => p.project_id === projectId).length;
  };

  useEffect(() => {
    if (showProjects && selectedCategory) {
      document.title = `${selectedCategory.name} | Home Lab Portfolio`;
    } else {
      document.title = '카테고리 | Home Lab Portfolio';
    }
  }, [showProjects, selectedCategory]);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  // 프로젝트 목록 표시 (카테고리 선택 시)
  if (showProjects) {
    return (
      <div className="categories-detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-nav">
          <Link to="/categories">카테고리</Link>
          <span className="separator">›</span>
          <span className="current">{selectedCategory?.name || '전체'}</span>
        </div>

        {/* Hero Section */}
        <section className="category-hero">
          <div 
            className="hero-background" 
            style={{ backgroundColor: selectedCategory?.color || '#0071e3' }}
          >
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content-wrapper">
            <div className="category-hero-content">
              <div className="category-icon-hero">
                {selectedCategory?.icon || '📁'}
              </div>
              <h1 className="category-title-hero">
                {selectedCategory?.name || '프로젝트'}
              </h1>
              <p className="category-desc-hero">
                {selectedCategory?.description || '홈 랩에서 진행한 다양한 프로젝트들'}
              </p>
              <div className="category-stats-hero">
                <div className="stat-item-hero">
                  <span className="stat-icon">📦</span>
                  <span className="stat-text">{filteredProjects.length}개의 프로젝트</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-content-section">
          <div className="projects-container">
            <div className="section-header-projects">
              <h2 className="section-title-projects">프로젝트 목록</h2>
              <p className="section-subtitle-projects">
                카테고리별 프로젝트를 확인하세요
              </p>
            </div>

            {/* 카테고리 필터 */}
            <div className="category-filter">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories?category=${category.id}`}
                  className={`filter-button ${categoryParam === category.id ? 'active' : ''}`}
                >
                  {category.icon} {category.name}
                </Link>
              ))}
            </div>

            {/* 프로젝트 그리드 */}
            {filteredProjects.length > 0 ? (
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects?project=${project.id}`}
                    className="project-item-card"
                  >
                    <div
                      className="project-card-header"
                      style={{ backgroundColor: project.color }}
                    >
                      <div className="project-icon-large">{project.icon}</div>
                    </div>
                    <div className="project-card-body">
                      <h3 className="project-item-title">{project.name}</h3>
                      <p className="project-item-desc">{project.description}</p>
                      <div className="project-card-footer">
                        <span className="post-count-badge">
                          📝 {getPostCount(project.id)}개의 게시글
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-projects-state">
                <div className="empty-icon">📦</div>
                <p className="empty-text">프로젝트가 없습니다</p>
                <p className="empty-subtext">곧 업데이트 예정입니다</p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // 카테고리 목록 표시 (기본 화면)
  return (
    <div className="categories-list-page">
      {/* Hero Section */}
      <section className="categories-hero">
        <div className="hero-content-wrapper">
          <div className="categories-hero-content">
            <h1 className="categories-title-hero">카테고리</h1>
            <p className="categories-desc-hero">
              관심 있는 분야를 선택하세요
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-content-section">
        <div className="categories-container">
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories?category=${category.id}`}
                className="category-item-card"
              >
                <div
                  className="category-card-header"
                  style={{ backgroundColor: category.color }}
                >
                  <div className="category-icon-large">{category.icon}</div>
                </div>
                <div className="category-card-body">
                  <h3 className="category-item-title">{category.name}</h3>
                  <p className="category-item-desc">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
