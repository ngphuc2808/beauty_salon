interface iUserInfo {
  id: string
  slug: string
  username: string
  password: string
  oldPassword: string
  avatar: string
  fullName: string
  email: string
  phone: string
  role: string
  status: string | boolean
}

type LoginType = Pick<iUserInfo, 'username' | 'password'>

type EditAccountType = Omit<iUserInfo, 'id' | 'username' | 'slug'>

type AddAccountType = Omit<iUserInfo, 'id' | 'slug' | 'oldPassword'>

type ResponseErrorType = {
  success: boolean
  message?: string
  results: {
    message: string
  }
}

type ResponseLoginType = {
  results: {
    message: string
    session: string
  }
  success: boolean
}

type ResponseLogoutType = {
  results: string
  success: boolean
}

type ResponseGetUserInfoType = {
  results: Omit<iUserInfo, 'password'>
  success: boolean
}

type ResponseGetListUserType = {
  results: Omit<iUserInfo, 'id' | 'username' | 'password' | 'oldPassword'>[]
  success: boolean
}

type ResponseCreateAndEditUserType = {
  results: Omit<iUserInfo, 'password' | 'oldPassword'>
  success: boolean
}

type ResponseDeleteType = {
  success: boolean
  results: boolean
}

//Images
type ResponseUploadImageType = {
  results: string
  success: boolean
}

type ResponseUploadImagesType = {
  results: string[]
  success: boolean
}

type ResponseGetAllImagesType = {
  message: {
    names: string[]
    urls: string[]
  }
  success: boolean
}

type ResponseDeleteImagesType = {
  message: string[]
  success: boolean
}

//Landing Page Type
interface iContentInLandingPage {
  projectData: string
  html: string
  css: string
}

// Post
interface iPost {
  id: string
  slug: string
  title: string
  isLadingPage: boolean
  content: iContentInLandingPage
  thumbnail: string
  status: boolean | string
  createdAt: string
  postId: string
  metaTitles: string
  metaKeyWords: string
  metaDescriptions: string
  comments: string[]
  updatedAt: string[]
}

type PostType = Omit<
  iPost,
  'id' | 'slug' | 'createdAt' | 'postId' | 'updatedAt'
>

type ResponseGetListPostType = {
  success: boolean
  results: Pick<
    iPost,
    | 'postId'
    | 'createdAt'
    | 'slug'
    | 'status'
    | 'thumbnail'
    | 'title'
    | 'comments'
  >[]
}

type ResponsePostType = {
  success: boolean
  results: Omit<iPost, 'postId'>
}

//Product
interface iProduct {
  id: string
  productId: string
  slug: string
  name: string
  content: iContentInLandingPage
  thumbnail: string
  links: LinkProductType[]
  status: boolean | string
  metaTitles: string
  metaKeyWords: string
  metaDescriptions: string
  createdAt: string
  updatedAt: string
  comments: string[]
}

type ProductType = Omit<
  iProduct,
  'id' | 'productId' | 'slug' | 'createdAt' | 'comments' | 'updatedAt'
>

type LinkProductType = {
  name: string
  link: string
}

type ResponseProductType = {
  success: boolean
  results: Omit<iProduct, 'productId'>
}

type ResponseGetListProductType = {
  success: boolean
  results: Pick<
    iProduct,
    'slug' | 'name' | 'status' | 'thumbnail' | 'createdAt' | 'productId'
  >[]
}

//Category
interface iCategory {
  id: string
  slug: string
  name: string
  thumbnail: string
  level: number
  landingPage: iContentInPost
  urlKey: string
  metaTitles: string
  metaKeyWords: string
  metaDescriptions: string
  contentType: string
  status: boolean | string
  listChildren: string[]
  listPosts: string[]
  listProducts: string[]
  createdAt: string
  updatedAt: string
}

type PostCategoryType = Omit<
  iCategory,
  'id' | 'slug' | 'createdAt' | 'updatedAt'
>

type TreeNodeCategory = {
  name: string
  level: number
  slug: string
  id: string
  child?: TreeNodeCategory[]
}

type ResponsePostCategoryType = {
  success: boolean
  results: iCategory
}

type ResponseGetCategoryType = {
  success: boolean
  message: iCategory
}

type ResponseGetAllCategoryType = {
  success: boolean
  message: TreeNodeCategory[]
}

type ResponseGetListCategoryType = {
  success: boolean
  message: iCategory[]
}

type ResponseSearchProductType = {
  success: boolean
  results: Pick<
    iProduct,
    'name' | 'productId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
  >[]
}

type ResponseSearchPostType = {
  success: boolean
  results: Pick<
    iPost,
    'title' | 'postId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
  >[]
}

// Other
type CropPixelType = {
  width: number
  height: number
  x: number
  y: number
}
