const API_BASE = `/admin`

const API_IMAGE = `/upload`

export const API_URL = {
  // Auth
  login: `${API_BASE}/auth/login`,
  logout: `${API_BASE}/auth/logout`,
  getInfo: `${API_BASE}/account`,
  createAccount: `${API_BASE}/account/create`,
  listUser: `${API_BASE}/account/list`,
  deleteAccount: `${API_BASE}/account/delete`,
  updateInfo: `${API_BASE}/account`,

  //Image
  uploadImage: `${API_IMAGE}/image`,
  uploadImages: `${API_IMAGE}/images`,

  //Post
  getPost: `${API_BASE}/post`,
  createPost: `${API_BASE}/post/create`,
  updatePost: `${API_BASE}/post`,
  listPosts: `${API_BASE}/post/list`,
  deletePost: `${API_BASE}/post/delete`,
  searchPost: `${API_BASE}/post/search`,

  //Product
  getProduct: `${API_BASE}/product`,
  createProduct: `${API_BASE}/product/create`,
  updateProduct: `${API_BASE}/product`,
  listProducts: `${API_BASE}/product/list`,
  deleteProduct: `${API_BASE}/product/delete`,
  searchProduct: `${API_BASE}/product/search`,

  //Category
  getCategory: `${API_BASE}/category/get-by-id`,
  createCategory: `${API_BASE}/category/create`,
  updateCategory: `${API_BASE}/category/update`,
  listCategory: `${API_BASE}/category/get-by-level`,
  deleteCategory: `${API_BASE}/category/delete`,
}
