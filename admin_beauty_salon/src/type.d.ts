interface iUserInfo {
  id: string;
  slug: string;
  username: string;
  password: string;
  oldPassword: string;
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: boolean;
}

type LoginType = Pick<iUserInfo, "username" | "password">;

type EditMyAccountType = Pick<
  iUserInfo,
  | "username"
  | "password"
  | "oldPassword"
  | "avatar"
  | "fullName"
  | "email"
  | "phone"
>;

type AccountType = Pick<
  iUserInfo,
  | "username"
  | "password"
  | "fullName"
  | "email"
  | "phone"
  | "avatar"
  | "role"
  | "status"
>;

type TitleCategoryType = {
  title: string;
  childTitle: string;
};

type ItemType = {
  currentItems: iData[];
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

type CropImageType = {
  image: string | ArrayBuffer | null;
  setModalCrop: (modalCrop: boolean) => void;
  setFileImage: (fileImage: any) => void;
  setPreviewImg: (previewImg: string) => void;
};

type ModalType = {
  checked: string[];
  setModalDelete: (modal: boolean) => void;
};

type ListAccountType = {
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  role: string;
  avatar: string;
  slug: string;
};
