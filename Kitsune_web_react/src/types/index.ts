// src/types/index.ts

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category_id: string;
  color: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  project_id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  views: number;
  created_at: string;
  updated_at: string;
}
