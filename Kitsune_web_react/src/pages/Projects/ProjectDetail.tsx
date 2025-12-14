// src/pages/Projects/ProjectDetail.tsx

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProject } from '../../api/projects';
import { getPostsByProject } from '../../api/posts';
import { getCategories } from '../../api/categories';
import type { Project, Post, Category } from '../../types';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');

  const [project, setProject] = useState<Project | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadData();
    }
  }, [projectId]);

  const loadData = async () => {
    try {
      const [projectData, postsData] = await Promise.all([
        getProject(projectId!),
        getPostsByProject(projectId!)
      ]);
      
      setProject(projectData);
      setPosts(postsData);
      
      const categories = await getCategories();
      const categoryData = categories.find(c => c.id === projectData.category_id);
      setCategory(categoryData || null);
      
      document.title = `${projectData.name} | Home Lab Portfolio`;
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!project) {
    return <div className="error">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="project-detail-page">
      {/* Breadcrumb - Hero 밖으로 분리 */}
      <div className="breadcrumb-nav">
        <Link to="/categories">카테고리</Link>
        {category && (
          <>
            <span className="separator">›</span>
            <Link to={`/categories?category=${category.id}`}>{category.name}</Link>
          </>
        )}
        <span className="separator">›</span>
        <span className="current">{project.name}</span>
      </div>

      {/* Hero Section */}
      <section className="project-hero">
        <div className="hero-background" style={{ backgroundColor: project.color }}>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content-wrapper">
          <div className="project-hero-content">
            <div className="project-icon-hero">{project.icon}</div>
            <h1 className="project-title-hero">{project.name}</h1>
            <p className="project-desc-hero">{project.description}</p>
            <div className="project-stats-hero">
              <div className="stat-item-hero">
                <span className="stat-icon">📝</span>
                <span className="stat-text">{posts.length}개의 게시글</span>
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

          {posts.length > 0 ? (
            <div className="posts-grid">
              {posts.map((post, index) => (
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
              ))}
            </div>
          ) : (
            <div className="empty-posts-state">
              <div className="empty-icon">📝</div>
              <p className="empty-text">아직 작성된 게시글이 없습니다</p>
              <p className="empty-subtext">곧 업데이트 예정입니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
