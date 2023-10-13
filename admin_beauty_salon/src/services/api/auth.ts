import http from "../http";

import { API_URL } from "../urls";

export const AuthApi = {
  login: async (user: iAccount): Promise<any> => {
    return await http.post(API_URL.login, user);
  },
  logout: async (): Promise<any> => {
    return await http.post(API_URL.logout);
  },
  getInfo: async (slug: string): Promise<any> => {
    return await http.get(`${API_URL.getInfo}/${slug}/view`);
  },
  createAccount: async (account: iAddAccount): Promise<any> => {
    return await http.post(API_URL.createAccount, account);
  },
  getListUser: async (): Promise<any> => {
    return await http.get(API_URL.getListUser);
  },
  deleteAccount: async (slugs: string): Promise<any> => {
    return await http.delete(`${API_URL.deleteAccount}/${slugs}`);
  },
  updateAccount: async (slug: string, data: iEditAccount): Promise<any> => {
    return await http.put(`${API_URL.updateInfo}/${slug}/update`, { data });
  },
};
