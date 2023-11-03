import http from '../http'

import { API_URL } from '../urls'

export const CategoryApi = {
  createCategory: (category: PostCategoryType) =>
    http.post<ResponsePostCategoryType>(API_URL.createCategory, category),

  getCategory: (id: string) =>
    http.get<ResponseGetCategoryType>(`${API_URL.getCategory}/${id}`),

  getAllCategory: () =>
    http.get<ResponseGetAllCategoryType>(`${API_URL.getAllCategory}`),

  listCategory: (level: string) =>
    http.get<ResponseGetListCategoryType>(`${API_URL.listCategory}/${level}`),

  updateCategory: (id: string, data: PostCategoryType) =>
    http.put<ResponsePostCategoryType>(`${API_URL.updateCategory}/${id}`, data),

  deleteCategory: (id: string) =>
    http.delete<ResponseDeleteType>(`${API_URL.deleteCategory}/${id}`),
}
