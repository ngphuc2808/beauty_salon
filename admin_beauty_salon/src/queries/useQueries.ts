import { AuthApi } from "@/services/api/auth";
import { ImageApi } from "@/services/api/image";
import { UseQueryOptions, useMutation, useQuery } from "react-query";

export const handleGetInfo = async (slug: string) => {
  const { data } = await AuthApi.getInfo(slug);
  return data;
};

export const handleGetListUser = async () => {
  const { data } = await AuthApi.getListUser();
  return data;
};

export const useGetUserInfo = (
  slug: string,
  options?: UseQueryOptions<ResponseGetUserInfoType>
) => {
  return useQuery({
    queryKey: ["UserInfo", { slug: slug }],
    queryFn: () => handleGetInfo(slug),
    enabled: slug !== undefined,
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  });
};

export const useGetListUser = (
  options?: UseQueryOptions<ResponseGetListUserType>
) => {
  return useQuery({
    queryKey: ["ListUser"],
    queryFn: () => handleGetListUser(),
    staleTime: 60000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  });
};

export const useGetEditUserInfo = (
  slug: string,
  options?: UseQueryOptions<ResponseGetEditUserInfoType>
) => {
  return useQuery({
    queryKey: ["EditUserInfo", { slug: slug }],
    queryFn: () => handleGetInfo(slug),
    enabled: slug !== undefined,
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  });
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (body: LoginType) => {
      return AuthApi.login(body);
    },
  });
};

export const usePostLogout = () => {
  return useMutation({
    mutationFn: () => {
      return AuthApi.logout();
    },
  });
};

export const usePostImage = () => {
  return useMutation({
    mutationFn: (file: FormData) => {
      return ImageApi.uploadImage(file);
    },
  });
};

export const usePostCreateUser = () => {
  return useMutation({
    mutationFn: (body: AddAccountType) => {
      return AuthApi.createAccount(body);
    },
  });
};

export const usePutEditUserInfo = (slug: string) => {
  return useMutation({
    mutationFn: (body: EditAccountType) => {
      return AuthApi.updateAccount(slug, body);
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (slug: string) => {
      return AuthApi.deleteAccount(slug);
    },
  });
};
