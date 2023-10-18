interface Props {
  children?: React.ReactNode;
}

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
  status: string | boolean;
}

type LoginType = Pick<iUserInfo, "username" | "password">;

type EditAccountType = Pick<
  iUserInfo,
  | "username"
  | "password"
  | "oldPassword"
  | "fullName"
  | "email"
  | "phone"
  | "avatar"
  | "role"
  | "status"
>;

type AddAccountType = Pick<
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

// type EditAccountType = Omit<iUserInfo, "id">;

// type AddAccountType = Omit<iUserInfo, "id" | "slug" | "oldPassword">;

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

type CropImageType = {
  image: string | ArrayBuffer | null;
  setModalCrop: (modalCrop: boolean) => void;
  setFileImage: (fileImage: Blob) => void;
  setPreviewImg: (previewImg: string) => void;
};

type CropPixel = {
  width: number;
  height: number;
  x: number;
  y: number;
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

type ErrorType = {
  success: boolean;
  message?: string;
  results: {
    message: string;
  };
};
