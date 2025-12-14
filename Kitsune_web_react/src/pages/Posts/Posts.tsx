// src/pages/Posts/Posts.tsx

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPosts } from '../../api/posts';
import { getCategories } from '../../api/categories';
import { getProjects } from '../../api/projects';
import type { Post, Category, Project } from '../../types';
import './Posts.css';

const Posts = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const projectParam = searchParams.get('project');

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postsData, categoriesData, projectsData] = await Promise.all([
        getPosts(),
        getCategories(),
        getProjects()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
      setProjects(projectsData);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 필터링된 게시글
  const filteredPosts = posts.filter(post => {
    if (projectParam) return post.project_id === projectParam;
    if (categoryParam) {
      const project = projects.find(p => p.id === post.project_id);
      return project?.category_id === categoryParam;
    }
    return true;
  });

  // 선택된 카테고리/프로젝트 정보
  const selectedProject = projects.find(p => p.id === projectParam);
  const selectedCategory = categories.find(c => c.id === categoryParam);

  useEffect(() => {
    if (selectedProject) {
      document.title = `${selectedProject.name} 게시글 | Home Lab Portfolio`;
    } else if (selectedCategory) {
      document.title = `${selectedCategory.name} 게시글 | Home Lab Portfolio`;
    } else {
      document.title = '모든 게시글 | Home Lab Portfolio';
    }
  }, [selectedProject, selectedCategory]);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="posts-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-nav">
        <Link to="/categories">카테고리</Link>
        {selectedCategory && (
          <>
            <span className="separator">›</span>
            <Link to={`/categories?category=${selectedCategory.id}`}>
              {selectedCategory.name}
            </Link>
          </>
        )}
        {selectedProject && (
          <>
            <span className="separator">›</span>
            <Link to={`/projects?project=${selectedProject.id}`}>
              {selectedProject.name}
            </Link>
          </>
        )}
        <span className="separator">›</span>
        <span className="current">게시글</span>
      </div>

      {/* Hero Section */}
      <section className="posts-hero">
        <div 
          className="hero-background" 
          style={{ 
            backgroundColor: selectedProject?.color || selectedCategory?.color || '#0071e3' 
          }}
        >
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content-wrapper">
          <div className="posts-hero-content">
            <div className="posts-icon-hero">
              {selectedProject?.icon || selectedCategory?.icon || '📝'}
            </div>
            <h1 className="posts-title-hero">
              {selectedProject?.name || selectedCategory?.name || '모든 게시글'}
            </h1>
            <p className="posts-desc-hero">
              {selectedProject?.description || selectedCategory?.description || '홈 랩 프로젝트의 모든 게시글'}
            </p>
            <div className="posts-stats-hero">
              <div className="stat-item-hero">
                <span className="stat-icon">📝</span>
                <span className="stat-text">{filteredPosts.length}개의 게시글</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="posts-content-section">
        <div className="posts-container">
          <div className="section-header-posts">
            <h2 className="section-title-posts">게시글 목록</h2>
            <p className="section-subtitle-posts">
              프로젝트 진행 과정을 단계별로 기록했습니다
            </p>
          </div>

          {/* 카테고리 필터 */}
          {!projectParam && (
            <div className="category-filter">
              <Link
                to="/posts"
                className={`filter-button ${!categoryParam ? 'active' : ''}`}
              >
                전체
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/posts?category=${category.id}`}
                  className={`filter-button ${categoryParam === category.id ? 'active' : ''}`}
                >
                  {category.icon} {category.name}
                </Link>
              ))}
            </div>
          )}

          {/* 게시글 그리드 */}
          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post, index) => {
                const project = projects.find(p => p.id === post.project_id);
                return (
                  <Link
                    key={post.id}
                    to={`/posts/${post.id}`}
                    className="post-item-card"
                  >
                    <div className="post-card-header">
                      <span className="post-index">#{index + 1}</span>
                      <span className="post-views-badge">
                        👁️ {post.views}
                      </span>
                    </div>
                    
                    {project && (
                      <div className="post-project-badge">
                        <span className="project-icon-small">{project.icon}</span>
                        <span className="project-name-small">{project.name}</span>
                      </div>
                    )}
                    
                    <h3 className="post-item-title">{post.title}</h3>
                    <p className="post-item-desc">{post.description}</p>
                    
                    <div className="post-card-footer">
                      <span className="post-date-text">
                        {new Date(post.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      {post.tags.length > 0 && (
                        <div className="post-tags-list">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="post-tag-badge">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="empty-posts-state">
              <div className="empty-icon">📝</div>
              <p className="empty-text">게시글이 없습니다</p>
              <p className="empty-subtext">곧 업데이트 예정입니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Posts;
