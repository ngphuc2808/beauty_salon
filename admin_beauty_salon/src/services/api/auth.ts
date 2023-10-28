import http from "../http";

import { API_URL } from "../urls";

export const AuthApi = {
  login: (user: LoginType) => http.post<ResponseLoginType>(API_URL.login, user),

  logout: () => http.post<ResponseLogoutType>(API_URL.logout),

  getInfo: (slug: string) =>
    http.get<ResponseGetUserInfoType>(`${API_URL.getInfo}/${slug}/view`),

  createAccount: (account: AddAccountType) =>
    http.post<ResponseCreateAndEditUserType>(API_URL.createAccount, account),

  listUser: () => http.get<ResponseGetListUserType>(API_URL.listUser),

  deleteAccount: (slugs: string) =>
    http.delete<ResponseDeleteType>(`${API_URL.deleteAccount}/${slugs}`),

  updateAccount: (slug: string, data: EditAccountType) =>
    http.put<ResponseCreateAndEditUserType>(
      `${API_URL.updateInfo}/${slug}/update`,
      data
    ),
};
