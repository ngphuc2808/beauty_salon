import http from '../http'

import { API_URL } from '../urls'

export const PostApi = {
  createPost: (post: PostType) =>
    http.post<ResponsePostType>(API_URL.createPost, post),

  listPosts: () => http.get<ResponseGetListPostType>(API_URL.listPosts),

  getPost: (slug: string) =>
    http.get<ResponsePostType>(`${API_URL.getPost}/${slug}/view`),

  updatePost: (slug: string, data: PostType) =>
    http.put<ResponsePostType>(`${API_URL.updatePost}/${slug}/update`, data),

  deletePost: (slugs: string) =>
    http.delete<ResponseDeleteType>(`${API_URL.deletePost}/${slugs}`),

  searchPost: (title: string) =>
    http.get<ResponseSearchPostType>(`${API_URL.searchPost}`, {
      params: { title: title },
    }),
}
