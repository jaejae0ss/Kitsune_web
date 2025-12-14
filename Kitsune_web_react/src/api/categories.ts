// src/api/categories.ts

import { supabase } from '../lib/supabase';
import type { Category } from '../types/index';

/**
 * 모든 카테고리 가져오기
 * 사용: 카테고리 목록 표시, 필터링
 */
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('카테고리 로드 실패:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * 카테고리 생성
 * 사용: 관리자 페이지에서 새 카테고리 추가
 */
export const createCategory = async (
  category: Omit<Category, 'id' | 'created_at'>
): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();

  if (error) {
    console.error('카테고리 생성 실패:', error);
    throw error;
  }
  
  return data;
};

/**
 * 카테고리 수정
 * 사용: 관리자 페이지에서 카테고리 정보 수정
 */
export const updateCategory = async (
  id: string,
  updates: Partial<Omit<Category, 'id' | 'created_at'>>
): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('카테고리 수정 실패:', error);
    throw error;
  }
  
  return data;
};

/**
 * 카테고리 삭제
 * 사용: 관리자 페이지에서 카테고리 삭제
 */
export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('카테고리 삭제 실패:', error);
    throw error;
  }
};
