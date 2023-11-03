import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import slugify from 'react-slugify'
import Select from 'react-tailwindcss-select'
import { SelectValue } from 'react-tailwindcss-select/dist/components/type'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGlobalContext } from '@/contexts/globalContext'
import {
  useDebounce,
  useGetCategory,
  useGetListCategory,
  useGetListPost,
  useGetListProduct,
  useGetSearchPost,
  useGetSearchProduct,
  usePostCategory,
  usePostImage,
  usePutEditCategory,
} from '@/hooks/hooks'

import images from '@/assets/images'
import CropImage from '@/component/molecules/CropImage'
import Search from '@/component/molecules/Search'
import Button from '@/component/atoms/Button'
import { SpinnerIcon } from '@/component/atoms/CustomIcon'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const DetailCategory = () => {
  const router = useNavigate()

  const { id } = useParams()

  const { pathname } = useLocation()

  const isCategoryLevel3 = Boolean(
    pathname.split('/')[1] === 'tao-danh-muc-cap-3',
  )

  const isCategoryLevel2 = Boolean(
    pathname.split('/')[1] === 'tao-danh-muc-cap-2',
  )

  const isCategoryLevel1 = Boolean(
    pathname.split('/')[1] === 'tao-danh-muc-cap-1',
  )

  const {
    title,
    setTitle,
    status,
    setStatus,
    contentType,
    setContentType,
    projectData,
    setProjectData,
  } = useGlobalContext()

  const isUpdate = Boolean(id)

  const queryClient = useQueryClient()

  const postImageApi = usePostImage()

  const postCategoryApi = usePostCategory()

  const updateCategoryApi = usePutEditCategory(id!)

  const getCategoryApi = useGetCategory(id!, {
    onSuccess(data) {
      reset({
        name: data.message.name,
        level: data.message.level,
        thumbnail: data.message.thumbnail,
        landingPage: {
          projectData: data.message.landingPage.projectData,
        },
        urlKey: data.message.urlKey,
        metaTitles: data.message.metaTitles,
        metaKeyWords: data.message.metaKeyWords,
        metaDescriptions: data.message.metaDescriptions,
        contentType: data.message.contentType,
        status: data.message.status.toString(),
        listChildren: data.message.listChildren,
        listPosts: data.message.listPosts,
        listProducts: data.message.listProducts,
      })
      setPreviewImg(data.message.thumbnail as string)
    },
  })

  const listChildCategoryLevel1Api = useGetListCategory('2', {
    onSuccess(data) {
      setOptions(
        data.message.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      )
      setListChildCategory(
        data.message.filter((item) => watch('listChildren').includes(item.id)),
      )
    },
    enabled: isCategoryLevel1,
  })

  const listChildCategoryLevel2Api = useGetListCategory('3', {
    onSuccess(data) {
      setOptions(
        data.message.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      )
      setListChildCategory(
        data.message.filter((item) => watch('listChildren').includes(item.id)),
      )
    },
    enabled: isCategoryLevel2,
  })

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCategoryType>({
    defaultValues: {
      name: title || getCategoryApi.data?.message.name || '',
      level:
        getCategoryApi.data?.message.level ||
        Number(
          pathname.split('/')[1].substring(pathname.split('/')[1].length - 1),
        ),
      thumbnail: getCategoryApi.data?.message.thumbnail || '',
      landingPage: {
        html: getCategoryApi.data?.message.landingPage.html || '',
        projectData: getCategoryApi.data?.message.landingPage.projectData || '',
        css: getCategoryApi.data?.message.landingPage.css || '',
      },
      urlKey: title
        ? `/${slugify(title)}`
        : '' || getCategoryApi.data?.message.urlKey,
      metaTitles: getCategoryApi.data?.message.metaTitles || '',
      metaKeyWords: getCategoryApi.data?.message.metaKeyWords || '',
      metaDescriptions: getCategoryApi.data?.message.metaDescriptions || '',
      contentType:
        contentType || getCategoryApi.data?.message.contentType || '',
      status: status || getCategoryApi.data?.message.status.toString() || '',
      listChildren: getCategoryApi.data?.message.listChildren || [],
      listPosts: getCategoryApi.data?.message.listPosts || [],
      listProducts: getCategoryApi.data?.message.listProducts || [],
    },
  })

  const listPostApi = useGetListPost({
    onSuccess(data) {
      const filteredPostArray = data.results.filter(
        (item) => getCategoryApi.data?.message.listPosts.includes(item.postId),
      )
      setdataListPost(filteredPostArray)
    },
    enabled: watch('contentType') === 'posts',
  })

  const listProductApi = useGetListProduct({
    onSuccess(data) {
      const filteredProductArray = data.results.filter(
        (item) =>
          getCategoryApi.data?.message.listProducts.includes(item.productId),
      )
      setdataListProduct(filteredProductArray)
    },
    enabled: watch('contentType') === 'products',
  })

  const [searchTerm, setSearchTerm] = useState<string>('')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const searchProductApi = useGetSearchProduct(debouncedSearchTerm.trim(), {
    enabled: watch('contentType') === 'products',
  })

  const searchPostApi = useGetSearchPost(debouncedSearchTerm.trim(), {
    enabled: watch('contentType') === 'posts',
  })

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    (isCategoryLevel1
      ? listChildCategoryLevel1Api.data?.message.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      : isCategoryLevel2 &&
        listChildCategoryLevel2Api.data?.message.map((item) => ({
          value: item.id,
          label: item.name,
        }))) || [],
  )

  const [dataChildCategory, setDataChildCategory] = useState<SelectValue>(null)

  const [listChildCategory, setListChildCategory] = useState<iCategory[]>(
    (isCategoryLevel1
      ? listChildCategoryLevel1Api.data?.message.filter((item) =>
          watch('listChildren').includes(item.id),
        )
      : isCategoryLevel2 &&
        listChildCategoryLevel2Api.data?.message.filter((item) =>
          watch('listChildren').includes(item.id),
        )) || [],
  )

  const [dataListProduct, setdataListProduct] = useState<
    Pick<
      iProduct,
      'name' | 'productId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
    >[]
  >(
    listProductApi.data?.results.filter(
      (item) =>
        getCategoryApi.data?.message.listProducts.includes(item.productId),
    ) || [],
  )

  const [dataListPost, setdataListPost] = useState<
    Pick<
      iPost,
      'title' | 'postId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
    >[]
  >(
    listPostApi.data?.results.filter(
      (item) => getCategoryApi.data?.message.listPosts.includes(item.postId),
    ) || [],
  )

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null)
  const [modalCrop, setModalCrop] = useState(false)
  const [previewImg, setPreviewImg] = useState<string>(
    getCategoryApi.data?.message.thumbnail || '',
  )
  const [fileImage, setFileImage] = useState<Blob>(new Blob())
  const [file, setFile] = useState<File>()

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImg)
    }
  }, [previewImg])

  useEffect(() => {
    let reader: FileReader,
      isCancel: boolean = false
    if (file) {
      reader = new FileReader()
      reader.onload = (e: any) => {
        const { result } = e.target
        if (result && !isCancel) {
          setCropImage(result)
          setModalCrop(true)
        }
      }
      reader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (reader && reader.readyState === 2) {
        reader.abort()
        reader.onload = null
      }
    }
  }, [file])

  const handleChange = (value: SelectValue) => {
    setDataChildCategory(value)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  const addUniqueItemProduct = (
    value: Pick<
      iProduct,
      'name' | 'productId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
    >,
  ) => {
    const isIdExists = dataListProduct.some(
      (item) => item.productId === value.productId,
    )
    if (!isIdExists) {
      setdataListProduct([...dataListProduct, value])
    }
  }

  const removeItemProduct = (
    value: Pick<
      iProduct,
      'name' | 'productId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
    >,
  ) => {
    const updatedData = dataListProduct.filter(
      (item) => item.productId !== value.productId,
    )
    setdataListProduct(updatedData)
  }

  const addUniqueItemPost = (
    value: Pick<
      iPost,
      'title' | 'postId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
    >,
  ) => {
    const isIdExists = dataListPost.some((item) => item.postId === value.postId)
    if (!isIdExists) {
      setdataListPost([...dataListPost, value])
    }
  }

  const removeItemPost = (
    value: Pick<
      iPost,
      'title' | 'postId' | 'slug' | 'status' | 'thumbnail' | 'createdAt'
    >,
  ) => {
    const updatedData = dataListPost.filter(
      (item: any) => item.postId !== value.postId,
    )
    setdataListPost(updatedData)
  }

  const handleCrop = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget
    if (input.files?.length) {
      const file = input.files[0]
      if (!file.type.match(imageMimeType)) {
        toast.error('Vui lòng chọn đúng định dạng hình ảnh!')
        return
      }
      setFile(file)
    }
    e.currentTarget.value = ''
  }

  const uploadFile = async () => {
    const file = new File(
      [fileImage],
      `image-${Math.floor(Math.random() * 100000)}.${
        fileImage.type.split('/')[1]
      }`,
      {
        type: fileImage.type,
      },
    )
    const formData = new FormData()
    formData.append('image', file)

    let upload
    try {
      upload = await postImageApi.mutateAsync(formData)
    } catch (error) {
      console.log(error)
    }
    return upload
  }

  const handleCreateCategory = async (value: PostCategoryType) => {
    if (fileImage.size !== 0) {
      const thumbnail = await uploadFile()
      value.thumbnail = thumbnail?.data.results as string
    } else {
      value.thumbnail = previewImg
        ? (getCategoryApi.data?.message.thumbnail as string)
        : ''
    }

    value.landingPage.projectData = projectData.projectData
    value.landingPage.html = projectData.html
    value.landingPage.css = projectData.css

    if (dataChildCategory && Array.isArray(dataChildCategory)) {
      value.listChildren = dataChildCategory.map((item) => item.value)
    }

    if (!isUpdate) {
      if (dataListProduct.length > 0) {
        const dataIdProduct = dataListProduct.map((item) => item.productId)
        value.listProducts = dataIdProduct
      } else {
        value.listProducts = []
      }
      if (dataListPost.length > 0) {
        const dataIdPost = dataListPost.map((item) => item.postId)
        value.listPosts = dataIdPost
      } else {
        value.listPosts = []
      }
      postCategoryApi.mutate(value, {
        onSuccess() {
          reset()
          setContentType('')
          setStatus('')
          setTitle('')
          setValue('urlKey', '')
          setPreviewImg('')
          setProjectData({ projectData: '', html: '', css: '' })
          toast.success('Thêm danh mục thành công!')
          queryClient.invalidateQueries({
            queryKey: ['ListCategory', { level: watch('level') }],
          })
        },
        onError(error) {
          const err = error as ResponseErrorType
          console.log(err)
        },
      })
    } else {
      if (dataListProduct.length > 0) {
        const dataIdProduct = dataListProduct.map((item) => item.productId)
        value.listProducts = dataIdProduct
      } else {
        value.listProducts = []
      }
      if (dataListPost.length > 0) {
        const dataIdPost = dataListPost.map((item) => item.postId)
        value.listPosts = dataIdPost
      } else {
        value.listPosts = []
      }
      updateCategoryApi.mutate(value, {
        onSuccess() {
          toast.success('Cập nhật bài viết thành công!')
          queryClient.invalidateQueries({ queryKey: ['CateInfo', { id: id }] })
          queryClient.invalidateQueries({
            queryKey: ['ListCategory', { level: watch('level') }],
          })
          router(-1)
        },
        onError(error) {
          const err = error as ResponseErrorType
          console.log(err)
        },
      })
    }
  }

  const handleDeleteChildCategory = (item: string) => {
    setListChildCategory(listChildCategory.filter((value) => value.id !== item))
    setValue(
      'listChildren',
      watch('listChildren').filter((value) => value !== item),
    )
  }

  return (
    <Fragment>
      <div
        className={`mb-5 flex min-h-[72px] w-full flex-wrap items-center justify-between rounded-lg py-4 shadow lg:flex-nowrap ${
          getCategoryApi.isLoading ? 'animate-pulse bg-gray-300' : 'bg-white'
        }`}
      >
        {!getCategoryApi.isLoading && (
          <div
            className='flex items-center gap-3'
            onClick={() => {
              setContentType('')
              setTitle('')
              setStatus('')
              setProjectData({ projectData: '', html: '', css: '' })
            }}
          >
            <Button onClick={() => router(-1)}>
              <i className='ri-arrow-left-line ml-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primaryColor text-xl text-white hover:bg-secondColor lg:text-2xl'></i>
            </Button>
            <h1 className='text-xl text-textHeadingColor'>
              {!isUpdate ? 'Thêm danh mục' : 'Sửa danh mục'}
            </h1>
          </div>
        )}
      </div>
      <div
        className={`mb-5 rounded-lg p-5 shadow ${
          getCategoryApi.isLoading ? 'animate-pulse bg-gray-300' : 'bg-white'
        }`}
      >
        <h1 className='text-xl font-medium text-textHeadingColor'>Tổng quan</h1>
        <div className='mt-4'>
          <h1 className='mb-2 block font-normal text-textHeadingColor'>
            Tên danh mục
          </h1>
          <input
            type='text'
            disabled={
              getCategoryApi.isLoading || getCategoryApi.isError ? true : false
            }
            placeholder='Nhập tên danh mục'
            {...register('name', {
              required: true,
              minLength: 10,
              maxLength: 80,
              onChange: (e) => {
                setValue('urlKey', `/${slugify(e.target.value)}`)
                setTitle(e.target.value)
              },
            })}
            className={`block w-full rounded-md border p-3 text-sm outline-none ${
              errors.name
                ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                : 'bg-white'
            }`}
          />
          {errors.name?.type === 'required' && (
            <p className='mt-2 text-sm text-secondColor'>
              Vui lòng nhập tên bài viết!
            </p>
          )}
          {errors.name?.type === 'minLength' && (
            <p className='mt-2 text-sm text-secondColor'>
              Vui lòng nhập tối thiểu 10 ký tự!
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-3'>
        <div className='order-2 col-span-12 lg:order-none lg:col-span-8'>
          {(watch('contentType') === 'landing' ||
            watch('contentType') === 'landing_menu2') && (
            <div className='rounded-lg bg-white p-5 shadow'>
              <div className='items-center justify-between sm:flex'>
                <h1 className='block font-normal text-textHeadingColor'>
                  Trang landing page cho danh mục
                </h1>
                <Button
                  to={
                    !id
                      ? '/tao-trang-landing-page'
                      : `/tao-trang-landing-page/${id}`
                  }
                  className='mt-3 w-full rounded-md bg-primaryColor px-4 py-3 text-sm text-white hover:bg-secondColor sm:mt-0 sm:w-auto'
                >
                  {projectData.projectData ||
                  getCategoryApi.data?.message.landingPage.projectData
                    ? 'Cài đặt trang'
                    : 'Tạo trang landing page'}
                </Button>
              </div>
            </div>
          )}
          {(watch('contentType') === 'menu2' ||
            watch('contentType') === 'landing_menu2') && (
            <div
              className={`rounded-lg bg-white p-5 shadow ${
                watch('contentType') === 'menu2' ? 'mt-0' : 'mt-5'
              }`}
            >
              <div className='[&>:nth-child(2)]:h-[46px]'>
                <div className='mb-3 items-center justify-between sm:flex'>
                  <h1 className='block font-normal text-textHeadingColor'>
                    {isCategoryLevel2 ? 'Danh mục cấp 3' : 'Danh mục cấp 2'}
                  </h1>
                </div>
                <Select
                  classNames={{
                    menuButton: ({ isDisabled }: any) =>
                      `flex text-sm text-textPrimaryColor py-1 border border-gray-300 rounded shadow-sm focus:outline-none cursor-pointer ${
                        isDisabled
                          ? 'bg-gray-200'
                          : 'bg-white hover:border-gray-400 focus:border-primaryColor focus:ring focus:ring-primaryColor/20'
                      }`,
                  }}
                  primaryColor='red'
                  placeholder='Chọn tên danh mục'
                  value={dataChildCategory}
                  onChange={handleChange}
                  options={options}
                  isMultiple
                  isClearable
                  noOptionsMessage='Không tìm thấy danh mục nào!'
                />
                {listChildCategory.length > 0 && (
                  <ul className='mt-4 max-h-[300px] overflow-auto rounded border bg-white text-sm text-textPrimaryColor shadow [&>:last-child]:border-none [&>li]:border-b'>
                    {listChildCategory.map((item, index) => (
                      <li
                        className='flex items-center  justify-between rounded border-b px-4 py-3 hover:bg-red-50'
                        key={index}
                      >
                        <div className='flex items-center gap-4'>
                          <figure className='h-10 w-[77px]'>
                            <img
                              className='h-full object-cover'
                              src={item.thumbnail || images.banner}
                              alt={item.name}
                            />
                          </figure>
                          <p className='text-textPrimaryColor'>{item.name}</p>
                        </div>
                        <Button
                          className='text-primaryColor'
                          onClick={() => handleDeleteChildCategory(item.id)}
                        >
                          Xóa
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {(watch('contentType') === 'posts' ||
            watch('contentType') === 'products') && (
            <div className='rounded-lg bg-white p-5 shadow'>
              <div className='[&>*]:mb-4 [&>:first-child]:mb-3'>
                <h1 className='block font-normal text-textHeadingColor'>
                  {watch('contentType') === 'products'
                    ? 'Danh sách sản phẩm'
                    : watch('contentType') === 'posts' && 'Danh sách bài viết'}
                </h1>
                <div className='flex w-full [&>div]:flex-1'>
                  <Search
                    title={'danh sách bài viết'}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    handleClearChange={handleClearChange}
                  />
                </div>
                {watch('contentType') === 'products' &&
                  searchProductApi.data?.results.length! > 0 && (
                    <ul className='max-h-[250px] overflow-y-scroll rounded border bg-white text-sm shadow'>
                      {searchProductApi.data?.results.map((item, index) => (
                        <li
                          className='flex items-center  justify-between rounded border-b px-4 py-3 hover:bg-red-50'
                          key={index}
                        >
                          <div className='flex items-center gap-4'>
                            <figure className='h-10 w-[77px]'>
                              <img
                                className='h-full object-cover'
                                src={item.thumbnail || images.banner}
                                alt=''
                              />
                            </figure>
                            <p className='text-textPrimaryColor'>{item.name}</p>
                          </div>
                          <Button
                            className='text-green-500'
                            onClick={() => addUniqueItemProduct(item)}
                          >
                            Thêm
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                {watch('contentType') === 'posts' &&
                  searchPostApi.data?.results.length! > 0 && (
                    <ul className='max-h-[250px] overflow-y-scroll rounded border bg-white text-sm shadow'>
                      {searchPostApi.data?.results.map((item, index) => (
                        <li
                          className='flex items-center  justify-between rounded border-b px-4 py-3 hover:bg-red-50'
                          key={index}
                        >
                          <div className='flex items-center gap-4'>
                            <figure className='h-10 w-[77px]'>
                              <img
                                className='h-full object-cover'
                                src={item.thumbnail || images.banner}
                                alt=''
                              />
                            </figure>
                            <p className='text-textPrimaryColor'>
                              {item.title}
                            </p>
                          </div>
                          <Button
                            className='text-green-500'
                            onClick={() => addUniqueItemPost(item)}
                          >
                            Thêm
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                <h3 className='text-sm text-textHeadingColor'>
                  {watch('contentType') === 'posts'
                    ? `${dataListPost.length} bài viết`
                    : `${dataListProduct.length} sản phẩm`}
                </h3>
                {watch('contentType') === 'posts' &&
                  dataListPost.length > 0 && (
                    <ul className='max-h-[250px] overflow-y-scroll rounded border bg-white text-sm shadow'>
                      {dataListPost.map((item, index) => (
                        <li
                          className='flex items-center  justify-between rounded px-4 py-3 hover:bg-red-50'
                          key={index}
                        >
                          <div className='flex items-center gap-4'>
                            <figure className='h-10 w-[77px]'>
                              <img
                                className='h-full object-cover'
                                src={item.thumbnail || images.banner}
                                alt=''
                              />
                            </figure>
                            <p className='text-textPrimaryColor'>
                              {item.title}
                            </p>
                          </div>
                          <Button
                            className='text-primaryColor'
                            onClick={() => removeItemPost(item)}
                          >
                            Xóa
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                {watch('contentType') === 'products' &&
                  dataListProduct.length > 0 && (
                    <ul className='max-h-[250px] overflow-y-scroll rounded border bg-white text-sm shadow'>
                      {dataListProduct.map((item, index) => (
                        <li
                          className='flex items-center  justify-between rounded px-4 py-3 hover:bg-red-50'
                          key={index}
                        >
                          <div className='flex items-center gap-4'>
                            <figure className='h-10 w-[77px]'>
                              <img
                                className='h-full object-cover'
                                src={item.thumbnail || images.banner}
                                alt=''
                              />
                            </figure>
                            <p className='text-textPrimaryColor'>{item.name}</p>
                          </div>
                          <Button
                            className='text-primaryColor'
                            onClick={() => removeItemProduct(item)}
                          >
                            Xóa
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          )}
          <div
            className={`${
              !(contentType || watch('contentType')) ? 'mt-0' : 'mt-5'
            } mb-5  rounded-lg p-5 shadow ${
              getCategoryApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
            <div className='[&>*]:mb-4 [&>:first-child]:mb-3'>
              <h1 className='mb-2 block font-normal text-textHeadingColor'>
                Tối ưu hóa công cụ tìm kiếm
              </h1>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='urlKey'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('urlKey')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='urlKey'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                >
                  URL key
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='metaTitle'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('metaTitles')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='metaTitle'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                >
                  Meta title
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='metaKeyWords'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('metaKeyWords')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='metaKeyWords'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                >
                  Meta keywords
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='metaDescription'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('metaDescriptions')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='metaDescription'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                >
                  Meta description
                </label>
              </div>
            </div>
          </div>
          <div
            className={`rounded-lg p-5 shadow ${
              getCategoryApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
            {!getCategoryApi.isLoading && (
              <div className='flex items-center justify-between'>
                <Button
                  className='w-[48%] rounded-md bg-primaryColor px-4 py-3 text-sm text-white hover:bg-secondColor lg:w-[200px]'
                  onClick={handleSubmit(handleCreateCategory)}
                >
                  Lưu
                </Button>
                <Button
                  to={'/danh-muc-cap-1'}
                  className='flex w-[48%] justify-center rounded-md bg-primaryColor px-4 py-3 text-sm text-white hover:bg-secondColor lg:w-[200px]'
                >
                  Thoát
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className='col-span-12 lg:col-span-4 [&>*]:mb-5'>
          <div
            className={`mt-0 rounded-lg p-5 shadow ${
              getCategoryApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
            <div className='mb-3 flex items-center justify-between'>
              <h1 className='text-textHeadingColor'>Ảnh danh mục</h1>
              <div className='flex items-center gap-3 text-sm'>
                <label
                  htmlFor='dropZone'
                  className='cursor-pointer text-blue-500'
                >
                  Ảnh thay thế
                </label>
                <span
                  className='cursor-pointer text-primaryColor'
                  onClick={() => setPreviewImg('')}
                >
                  Xóa
                </span>
              </div>
            </div>
            <div className='flex w-full items-center justify-center'>
              <label
                htmlFor='dropZone'
                className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
              >
                {getCategoryApi.isLoading ? (
                  <div role='status'>
                    <SpinnerIcon />
                    <span className='sr-only'>Loading...</span>
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center overflow-hidden rounded-lg pb-6 pt-5'>
                    {previewImg ? (
                      <figure className='h-full w-full'>
                        <img
                          className='max-h-full max-w-full'
                          src={previewImg}
                          alt='image'
                        />
                      </figure>
                    ) : (
                      <>
                        <i className='ri-upload-cloud-2-line mb-1 text-4xl text-textPrimaryColor'></i>
                        <p className='mb-2 text-center text-sm text-textPrimaryColor'>
                          <span className='font-semibold'>
                            Bấm hoặc kéo thả để chọn ảnh của bạn
                          </span>
                        </p>
                        <p className='text-xs text-textPrimaryColor'>
                          SVG, PNG, JPG
                        </p>
                      </>
                    )}
                  </div>
                )}
                <input
                  id='dropZone'
                  type='file'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  onChange={handleCrop}
                  hidden
                  accept='image/*'
                />
              </label>
            </div>
          </div>
          <div
            className={`rounded-lg p-5 shadow ${
              getCategoryApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            } `}
          >
            <h1 className='mb-2 block font-normal text-textHeadingColor'>
              Trạng thái navbar
            </h1>
            <div>
              <label
                htmlFor='statusOn'
                className='mt-3 flex items-center gap-4 text-sm'
              >
                <input
                  type='radio'
                  id='statusOn'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('status', {
                    required: true,
                  })}
                  value='true'
                  onClick={() => setStatus('true')}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.status ? 'text-secondColor' : 'text-textPrimaryColor'
                  }`}
                >
                  Bật hiển thị
                </span>
              </label>
              <label
                htmlFor='statusOff'
                className='mt-4 flex items-center gap-4 text-sm'
              >
                <input
                  type='radio'
                  id='statusOff'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('status', {
                    required: true,
                  })}
                  value='false'
                  onClick={() => setStatus('false')}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.status ? 'text-secondColor' : 'text-textPrimaryColor'
                  }`}
                >
                  Tắt hiển thị
                </span>
              </label>
            </div>
          </div>
          <div
            className={`rounded-lg p-5 shadow ${
              getCategoryApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            } `}
          >
            <h1 className='mb-2 block font-normal text-textHeadingColor'>
              Trạng thái hiển thị
            </h1>
            <div>
              <label
                htmlFor='landing'
                className='mt-4 flex items-center gap-4 text-sm'
              >
                <input
                  type='radio'
                  id='landing'
                  value='landing'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('contentType', {
                    required: true,
                  })}
                  onClick={() => {
                    setContentType('landing')
                  }}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-secondColor'
                      : 'text-textPrimaryColor'
                  }`}
                >
                  Trang landing page
                </span>
              </label>
              {!isCategoryLevel3 && (
                <>
                  <label
                    htmlFor='menu2'
                    className='mt-4 flex items-center gap-4 text-sm'
                  >
                    <input
                      type='radio'
                      id='menu2'
                      value='menu2'
                      disabled={
                        getCategoryApi.isLoading || getCategoryApi.isError
                          ? true
                          : false
                      }
                      {...register('contentType', {
                        required: true,
                      })}
                      onClick={() => {
                        setContentType('menu2')
                      }}
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                        checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <span
                      className={`${
                        errors.contentType
                          ? 'text-secondColor'
                          : 'text-textPrimaryColor'
                      }`}
                    >
                      {isCategoryLevel2 ? 'Danh mục cấp 3' : 'Danh mục cấp 2'}
                    </span>
                  </label>
                  <label
                    htmlFor='landing_menu2'
                    className='mt-3 flex items-center gap-4 text-sm'
                  >
                    <input
                      type='radio'
                      id='landing_menu2'
                      value='landing_menu2'
                      disabled={
                        getCategoryApi.isLoading || getCategoryApi.isError
                          ? true
                          : false
                      }
                      {...register('contentType', {
                        required: true,
                      })}
                      onClick={() => {
                        setContentType('landing_menu2')
                      }}
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                        checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <span
                      className={`${
                        errors.contentType
                          ? 'text-secondColor'
                          : 'text-textPrimaryColor'
                      }`}
                    >
                      {isCategoryLevel2
                        ? 'Trang landing page, menu danh mục cấp 3'
                        : 'Trang landing page, menu danh mục cấp 2'}
                    </span>
                  </label>
                </>
              )}
              <label
                htmlFor='posts'
                className='mt-4 flex items-center gap-4 text-sm'
              >
                <input
                  type='radio'
                  id='posts'
                  value='posts'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('contentType', {
                    required: true,
                  })}
                  onClick={() => {
                    setContentType('posts')
                  }}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-secondColor'
                      : 'text-textPrimaryColor'
                  }`}
                >
                  Trang danh sách bài viết
                </span>
              </label>
              <label
                htmlFor='products'
                className='mt-4 flex items-center gap-4 text-sm'
              >
                <input
                  type='radio'
                  id='products'
                  value='products'
                  disabled={
                    getCategoryApi.isLoading || getCategoryApi.isError
                      ? true
                      : false
                  }
                  {...register('contentType', {
                    required: true,
                  })}
                  onClick={() => {
                    setContentType('products')
                  }}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-secondColor'
                      : 'text-textPrimaryColor'
                  }`}
                >
                  Trang danh sách sản phẩm
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {modalCrop && (
        <CropImage
          image={cropImage}
          setModalCrop={setModalCrop}
          setFileImage={setFileImage}
          setPreviewImg={setPreviewImg}
        />
      )}
    </Fragment>
  )
}

export default DetailCategory
