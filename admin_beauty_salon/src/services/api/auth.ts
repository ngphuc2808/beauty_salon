import http from "../http";

import { API_URL } from "../urls";

export const AuthApi = {
  login: async (user: iAccount): Promise<any> => {
    return await http.post(API_URL.login, user);
  },
  logout: async () => {
    return await http.post(API_URL.logout);
  },
  getInfo: async (slug: string) => {
    return await http.get(`${API_URL.getInfo}/${slug}/view`);
  },
  createAccount: async (account: iAddAccount) => {
    return await http.post(API_URL.createAccount, account);
  },
  getListUser: async () => {
    return await http.get(API_URL.getListUser);
  },
  deleteAccount: async (slugs: string) => {
    return await http.delete(`${API_URL.deleteAccount}/${slugs}`);
  },
};
