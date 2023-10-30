import http from '../http'

import { API_URL } from '../urls'

export const ProductApi = {
  createProduct: (product: ProductType) =>
    http.post<ResponseProductType>(API_URL.createProduct, product),

  listProducts: () =>
    http.get<ResponseGetListProductType>(API_URL.listProducts),

  getProduct: (slug: string) =>
    http.get<ResponseProductType>(`${API_URL.getProduct}/${slug}/view`),

  updateProduct: (slug: string, data: ProductType) =>
    http.put<ResponseProductType>(
      `${API_URL.updateProduct}/${slug}/update`,
      data,
    ),

  deleteProduct: (slugs: string) =>
    http.delete<ResponseDeleteType>(`${API_URL.deleteProduct}/${slugs}`),

  searchProduct: (name: string) =>
    http.get<ResponseSearchProductType>(`${API_URL.searchProduct}`, {
      params: { name: name },
    }),
}
