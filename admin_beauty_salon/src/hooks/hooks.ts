import { AuthApi } from '@/services/api/auth'
import { CategoryApi } from '@/services/api/categories'
import { ImageApi } from '@/services/api/image'
import { PostApi } from '@/services/api/post'
import { ProductApi } from '@/services/api/products'
import { useEffect, useState } from 'react'
import { UseQueryOptions, useMutation, useQuery } from 'react-query'

export const handleGetInfo = async (slug: string) => {
  const { data } = await AuthApi.getInfo(slug)
  return data
}

export const handleGetListUser = async () => {
  const { data } = await AuthApi.listUser()
  return data
}

export const handleGetPost = async (slug: string) => {
  const { data } = await PostApi.getPost(slug)
  return data
}

export const handleSearchPost = async (title: string) => {
  const { data } = await PostApi.searchPost(title)
  return data
}

export const handleGetListPost = async () => {
  const { data } = await PostApi.listPosts()
  return data
}

export const handleGetProduct = async (slug: string) => {
  const { data } = await ProductApi.getProduct(slug)
  return data
}

export const handleSearchProduct = async (name: string) => {
  const { data } = await ProductApi.searchProduct(name)
  return data
}

export const handleGetListProduct = async () => {
  const { data } = await ProductApi.listProducts()
  return data
}

export const handleGetCategory = async (id: string) => {
  const { data } = await CategoryApi.getCategory(id)
  return data
}

export const handleGetAllCategory = async () => {
  const { data } = await CategoryApi.getAllCategory()
  return data
}

export const handleGetListCategory = async (level: string) => {
  const { data } = await CategoryApi.listCategory(level)
  return data
}

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}

//Image
export const usePostImage = () => {
  return useMutation({
    mutationFn: (file: FormData) => {
      return ImageApi.uploadImage(file)
    },
  })
}

export const usePostImages = () => {
  return useMutation({
    mutationFn: (files: FormData) => {
      return ImageApi.uploadImages(files)
    },
  })
}

//Auth
export const useGetUserInfo = (
  slug: string,
  options?: UseQueryOptions<ResponseGetUserInfoType>,
) => {
  return useQuery({
    queryKey: ['UserInfo', { slug: slug }],
    queryFn: () => handleGetInfo(slug),
    enabled: slug !== undefined,
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetListUser = (
  options?: UseQueryOptions<ResponseGetListUserType>,
) => {
  return useQuery({
    queryKey: ['ListUser'],
    queryFn: () => handleGetListUser(),
    staleTime: 60000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetEditUserInfo = (
  slug: string,
  options?: UseQueryOptions<ResponseCreateAndEditUserType>,
) => {
  return useQuery({
    queryKey: ['EditUserInfo', { slug: slug }],
    queryFn: () => handleGetInfo(slug),
    enabled: slug !== undefined,
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (body: LoginType) => {
      return AuthApi.login(body)
    },
  })
}

export const usePostLogout = () => {
  return useMutation({
    mutationFn: () => {
      return AuthApi.logout()
    },
  })
}

export const usePostCreateUser = () => {
  return useMutation({
    mutationFn: (body: AddAccountType) => {
      return AuthApi.createAccount(body)
    },
  })
}

export const usePutEditUserInfo = (slug: string) => {
  return useMutation({
    mutationFn: (body: EditAccountType) => {
      return AuthApi.updateAccount(slug, body)
    },
  })
}

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (slug: string) => {
      return AuthApi.deleteAccount(slug)
    },
  })
}

//Post
export const usePostCreatePost = () => {
  return useMutation({
    mutationFn: (body: PostType) => {
      return PostApi.createPost(body)
    },
  })
}

export const useGetListPost = (
  options?: UseQueryOptions<ResponseGetListPostType>,
) => {
  return useQuery({
    queryKey: ['ListPost'],
    queryFn: () => handleGetListPost(),
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetPost = (
  slug: string,
  options?: UseQueryOptions<ResponsePostType>,
) => {
  return useQuery({
    queryKey: ['EditPost', { slug: slug }],
    queryFn: () => handleGetPost(slug),
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetSearchPost = (
  title: string,
  options?: UseQueryOptions<ResponseSearchPostType>,
) => {
  return useQuery({
    queryKey: ['SearchListPost', title],
    queryFn: () => handleSearchPost(title),
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const usePutEditPost = (id: string) => {
  return useMutation({
    mutationFn: (body: PostType) => {
      return PostApi.updatePost(id, body)
    },
  })
}

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (slug: string) => {
      return PostApi.deletePost(slug)
    },
  })
}

//Product
export const usePostCreateProduct = () => {
  return useMutation({
    mutationFn: (body: ProductType) => {
      return ProductApi.createProduct(body)
    },
  })
}

export const useGetSearchProduct = (
  name: string,
  options?: UseQueryOptions<ResponseSearchProductType>,
) => {
  return useQuery({
    queryKey: ['SearchListProduct', name],
    queryFn: () => handleSearchProduct(name),
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetProduct = (
  slug: string,
  options?: UseQueryOptions<ResponseProductType>,
) => {
  return useQuery({
    queryKey: ['EditProduct', { slug: slug }],
    queryFn: () => handleGetProduct(slug),
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetListProduct = (
  options?: UseQueryOptions<ResponseGetListProductType>,
) => {
  return useQuery({
    queryKey: ['ListProduct'],
    queryFn: () => handleGetListProduct(),
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const usePutEditProduct = (id: string) => {
  return useMutation({
    mutationFn: (body: ProductType) => {
      return ProductApi.updateProduct(id, body)
    },
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (slug: string) => {
      return ProductApi.deleteProduct(slug)
    },
  })
}

//Category
export const usePostCategory = () => {
  return useMutation({
    mutationFn: (body: PostCategoryType) => {
      return CategoryApi.createCategory(body)
    },
  })
}

export const useGetCategory = (
  id: string,
  options?: UseQueryOptions<ResponseGetCategoryType>,
) => {
  return useQuery({
    queryKey: ['CateInfo', { id: id }],
    queryFn: () => handleGetCategory(id),
    enabled: id !== undefined,
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetAllCategory = (
  id: string,
  options?: UseQueryOptions<ResponseGetAllCategoryType>,
) => {
  return useQuery({
    queryKey: ['AllCategory'],
    queryFn: () => handleGetAllCategory(),
    enabled: id !== undefined,

    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const useGetListCategory = (
  level: string,
  options?: UseQueryOptions<ResponseGetListCategoryType>,
) => {
  return useQuery({
    queryKey: ['ListCategory', { level: level }],
    queryFn: () => handleGetListCategory(level),
    staleTime: 10000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

export const usePutEditCategory = (id: string) => {
  return useMutation({
    mutationFn: (body: PostCategoryType) => {
      return CategoryApi.updateCategory(id, body)
    },
  })
}

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return CategoryApi.deleteCategory(id)
    },
  })
}
