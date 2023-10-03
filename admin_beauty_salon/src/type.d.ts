interface Window {
  Image: {
    prototype: HTMLImageElement;
    new (): HTMLImageElement;
  };
}

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

interface iDataList {
  id: string;
  imgUrl: string;
  name: string;
  category: string;
  dateTime: string;
  permission: boolean;
}

interface ICrop {
  image: string | ArrayBuffer | null;
  setModalCrop: (modalCrop: boolean) => void;
  setPreviewImg: (img: string) => void;
}
