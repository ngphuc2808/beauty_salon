import http from "../http";

import { API_URL } from "../urls";

export const PostApi = {
  createPost: (post: PostType) =>
    http.post<ResponseCreateAndEditPostType>(API_URL.createPost, post),

  listPost: () => http.get<ResponseGetListPostType>(API_URL.listPost),

  getPost: (slug: string) =>
    http.get<ResponseCreateAndEditPostType>(`${API_URL.getPost}/${slug}/view`),

  updatePost: (slug: string, data: PostType) =>
    http.put<ResponseCreateAndEditPostType>(
      `${API_URL.updatePost}/${slug}/update`,
      data
    ),

  deletePost: (slugs: string) =>
    http.delete<ResponseDeleteType>(`${API_URL.deletePost}/${slugs}`),
};
