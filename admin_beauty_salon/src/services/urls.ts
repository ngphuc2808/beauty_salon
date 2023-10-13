const API_BASE = `/admin`;

const API_IMAGE = `/upload`;

export const API_URL = {
  // Auth
  login: `${API_BASE}/auth/login`,
  logout: `${API_BASE}/auth/logout`,
  getInfo: `${API_BASE}/account`,
  createAccount: `${API_BASE}/account/create`,
  getListUser: `${API_BASE}/account/list`,
  deleteAccount: `${API_BASE}/account/delete`,
  updateInfo: `${API_BASE}/account`,

  //Image
  uploadImage: `${API_IMAGE}/image`,

  //Post
  getPost: `${API_BASE}/post`,
  createPost: `${API_BASE}/post/create`,
};
