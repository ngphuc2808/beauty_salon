interface iAccount {
  username: string;
  password: string;
}

interface FormInputs {
  test: string;
}

interface iFakeData {
  id: string;
  name: string;
  icon: string;
}

interface iCategory {
  category: string;
}

interface iPropCategoryLevel {
  title: string;
  childTitle: string;
}

interface iItem {
  currentItems: iData[];
}

interface iPost {
  title: string;
  content: string;
  thumbnail: string;
  status: boolean;
}

interface iDataList {
  id: string;
  imgUrl: string;
  name: string;
  category: string;
  dateTime: string;
  permission: boolean;
}

interface ICropImageUser {
  image: string | ArrayBuffer | null;
  setModalCrop: (modalCrop: boolean) => void;
  setFileImage: (fileImage: any) => void;
  setPreviewImg: (previewImg: string) => void;
}

interface ICropImagePost {
  image: string | ArrayBuffer | null;
  setModalCrop: (modalCrop: boolean) => void;
  formValue: {
    title: string;
    content: string;
    thumbnail: string;
  };
  setFormValue: (item: {
    title: string;
    content: string;
    thumbnail: string;
  }) => void;
}

interface iModal {
  checked: string[];
  setModal: (modal: boolean) => void;
}

interface iAccountAuth {
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  role: string;
  avatar: string;
  slug: string;
}

interface iAddAccount {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  status: boolean;
}

interface iEditAccount {
  username: string;
  password: string;
  oldPassword: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  status: boolean;
}

interface iUserInfo {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  role: string;
  slug: string;
  avatar: string;
}

interface iDataListAccount {
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  role: string;
  avatar: string;
  slug: string;
}

interface iLogin {
  isLoggedIn: boolean;
  session: string;
}
