import http from "../http";

import { API_URL } from "../urls";

export const AuthApi = {
  login: (user: LoginType) => http.post<ResponseLoginType>(API_URL.login, user),

  logout: () => http.post<ResponseLogoutType>(API_URL.logout),

  getInfo: (slug: string) =>
    http.get<ResponseGetUserInfoType>(`${API_URL.getInfo}/${slug}/view`),

  createAccount: (account: AddAccountType) =>
    http.post<ResponseCreateUserType>(API_URL.createAccount, account),

  getListUser: () => http.get<ResponseGetListUserType>(API_URL.getListUser),

  deleteAccount: (slugs: string) =>
    http.delete<ResponseDeleteAccount>(`${API_URL.deleteAccount}/${slugs}`),

  updateAccount: (slug: string, data: EditAccountType) =>
    http.put<ResponseGetEditUserInfoType>(
      `${API_URL.updateInfo}/${slug}/update`,
      data
    ),
};
