import http from "../http";

import { API_URL } from "../urls";

export const CategoryApi = {
  createCategory: (category: PostCategoryType) =>
    http.post<ResponsePostCategory>(API_URL.createCategory, category),
};
