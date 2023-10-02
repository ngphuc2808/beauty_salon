import http from "../http";

import { API_URL } from "../urls";

export const UsersApi = {
  login: async (user: iAccount): Promise<any> => {
    return await http.post(API_URL.login, user);
  },
  logout: async () => {
    return await http.post(API_URL.logout);
  },
};
