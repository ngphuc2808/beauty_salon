interface iUserInfo {
  id: string;
  slug: string; //
  username: string;
  password: string;
  oldPassword: string;
  avatar: string; //
  fullName: string; //
  email: string; //
  phone: string; //
  role: string; //
  status: string | boolean; //
}

type LoginType = Pick<iUserInfo, "username" | "password">;

type EditAccountType = Omit<iUserInfo, "id" | "username" | "slug">;

type AddAccountType = Omit<iUserInfo, "id" | "slug" | "oldPassword">;

type TitleCategoryType = {
  title: string;
  childTitle: string;
};

type ItemType = {
  currentItems: DataListType[];
};

type PostType = {
  title: string;
  content: string;
  thumbnail: string;
  status: boolean;
};

type DataListType = {
  id: string;
  imgUrl: string;
  name: string;
  category: string;
  dateTime: string;
  permission: boolean;
};

type CropPixel = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type ResponseErrorType = {
  success: boolean;
  message?: string;
  results: {
    message: string;
  };
};

type ResponseLoginType = {
  results: {
    message: string;
    session: string;
  };
  success: boolean;
};

type ResponseLogoutType = {
  results: string;
  success: boolean;
};

type ResponseUploadImageType = {
  results: string;
  success: boolean;
};

type ResponseGetUserInfoType = {
  results: Omit<iUserInfo, "password">;
  success: boolean;
};

type ResponseGetListUserType = {
  results: Omit<iUserInfo, "id" | "username" | "password" | "oldPassword">[];
  success: boolean;
};

type ResponseCreateUserType = {
  results: Omit<iUserInfo, "password" | "oldPassword">;
  success: boolean;
};

type ResponseGetEditUserInfoType = {
  results: Omit<iUserInfo, "password" | "oldPassword">;
  success: boolean;
};

type ResponseDeleteAccount = {
  success: boolean;
  results: boolean;
};
