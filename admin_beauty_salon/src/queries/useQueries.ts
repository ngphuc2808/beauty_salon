import { AuthApi } from "@/services/api/auth";
import { useQuery } from "react-query";

const handleGetInfo = async (slug: string) => {
  try {
    return await AuthApi.getInfo(slug);
  } catch (error) {
    console.log(error);
  }
};

export const useGetUserInfo = (slug: string) => {
  return useQuery({
    queryKey: ["UserInfo"],
    queryFn: () => handleGetInfo(slug),
  });
};

export const useGetEditUserInfo = (slug: string) => {
  return useQuery({
    queryKey: ["EditUserInfo"],
    queryFn: () => handleGetInfo(slug),
  });
};
// import { useQuery } from "react-query";
// import { AuthApi } from "@/services/api/auth";

// const QUERY_KEY = ["UserInfo"];

// const handleGetInfo = async (slug: string) => {
//   try {
//     return await AuthApi.getInfo(slug);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const useGetUserInfo = (slug: string) => {
//   return useQuery(QUERY_KEY, () => handleGetInfo(slug));
// };
