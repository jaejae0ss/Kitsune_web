// src/pages/Posts/PostDetail.tsx

import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPost, incrementViews } from '../../api/posts';
import { getProject } from '../../api/projects';
import { getCategories } from '../../api/categories';
import type { Post, Project, Category } from '../../types';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      loadData();
    }
  }, [postId]);

  const loadData = async () => {
    try {
      // 게시글 로드
      const postData = await getPost(postId!);
      setPost(postData);

      // 조회수 증가
      await incrementViews(postId!);

      // 프로젝트 로드
      const projectData = await getProject(postData.project_id);
      setProject(projectData);

      // 카테고리 로드
      const categories = await getCategories();
      const categoryData = categories.find(c => c.id === projectData.category_id);
      setCategory(categoryData || null);

      document.title = `${postData.title} | Home Lab Portfolio`;
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!post) {
    return <div className="error">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-nav">
        <Link to="/categories">카테고리</Link>
        {category && (
          <>
            <span className="separator">›</span>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </>
        )}
        {project && (
          <>
            <span className="separator">›</span>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </>
        )}
        <span className="separator">›</span>
        <span className="current">{post.title}</span>
      </div>

      {/* Hero Section */}
      <section className="post-hero">
        <div 
          className="hero-background" 
          style={{ backgroundColor: project?.color || '#0071e3' }}
        >
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content-wrapper">
          <div className="post-hero-content">
            {/* 프로젝트 정보 */}
            {project && (
              <div className="project-badge-hero">
                <Link to={`/projects/${project.id}`} className="project-link-hero">
                  <span className="project-icon-hero">{project.icon}</span>
                  <span className="project-name-hero">{project.name}</span>
                </Link>
              </div>
            )}

            {/* 게시글 제목 */}
            <h1 className="post-title-hero">{post.title}</h1>
            <p className="post-description-hero">{post.description}</p>

            {/* 메타 정보 */}
            <div className="post-meta-hero">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">
                  {new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👁️</span>
                <span className="meta-text">{post.views} 조회</span>
              </div>
            </div>

            {/* 태그 */}
            {post.tags && post.tags.length > 0 && (
              <div className="tags-hero">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag-badge-hero">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="post-content-section">
        <div className="post-content-container">
          <article className="post-content">
            <div 
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* 하단 네비게이션 */}
          <div className="post-navigation">
            <button 
              onClick={() => navigate(-1)}
              className="nav-button back-button"
            >
              ← 목록으로 돌아가기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
