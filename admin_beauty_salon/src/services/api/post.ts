import http from "../http";

import { API_URL } from "../urls";

export const PostApi = {
  createPost: async (post: iPost): Promise<any> => {
    return await http.post(API_URL.createPost, post);
  },
  getPost: async (): Promise<any> => {
    return await http.get(`${API_URL.getPost}/test-1697190179527/view`);
  },
};
