// src/api/projects.ts

import { supabase } from '../lib/supabase';
import type { Project } from '../types';

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('프로젝트 로드 실패:', error);
    throw error;
  }
  
  return data || [];
};

export const getProject = async (id: string): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('프로젝트 로드 실패:', error);
    throw error;
  }
  
  return data;
};

export const createProject = async (
  project: Omit<Project, 'id' | 'created_at' | 'updated_at'>
): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error('프로젝트 생성 실패:', error);
    throw error;
  }
  
  return data;
};

export const updateProject = async (
  id: string,
  updates: Partial<Omit<Project, 'id' | 'created_at'>>
): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('프로젝트 수정 실패:', error);
    throw error;
  }
  
  return data;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('프로젝트 삭제 실패:', error);
    throw error;
  }
};
