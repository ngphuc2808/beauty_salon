import http from "../http";

import { API_URL } from "../urls";

export const ProductApi = {
  createProduct: (product: ProductType) =>
    http.post<ResponseCreateProductType>(API_URL.createProduct, product),

  listProduct: () => http.get<ResponseGetListProductType>(API_URL.listProduct),

  getProduct: (slug: string) =>
    http.get<ResponseGetProductType>(`${API_URL.getProduct}/${slug}/view`),

  updateProduct: (slug: string, data: ProductType) =>
    http.put<any>(`${API_URL.updateProduct}/${slug}/update`, data),

  deleteProduct: (slugs: string) =>
    http.delete<ResponseDeleteType>(`${API_URL.deleteProduct}/${slugs}`),
};
