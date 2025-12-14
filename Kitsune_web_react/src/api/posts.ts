// src/api/posts.ts

import { supabase } from '../lib/supabase';
import type { Post } from '../types';

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('게시글 로드 실패:', error);
    throw error;
  }
  
  return data || [];
};

export const getPost = async (id: string): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('게시글 로드 실패:', error);
    throw error;
  }
  
  return data;
};

export const getPostsByProject = async (projectId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('게시글 로드 실패:', error);
    throw error;
  }
  
  return data || [];
};

export const createPost = async (
  post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'views'>
): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('게시글 생성 실패:', error);
    throw error;
  }
  
  return data;
};

export const updatePost = async (
  id: string,
  updates: Partial<Omit<Post, 'id' | 'created_at' | 'views'>>
): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
  
  return data;
};

export const deletePost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
};

export const incrementViews = async (id: string): Promise<void> => {
  const { data: post } = await supabase
    .from('posts')
    .select('views')
    .eq('id', id)
    .single();

  if (!post) return;

  const { error } = await supabase
    .from('posts')
    .update({ views: post.views + 1 })
    .eq('id', id);

  if (error) {
    console.error('조회수 증가 실패:', error);
  }
};
