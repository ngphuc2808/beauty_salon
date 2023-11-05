import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGetUserInfo, usePostImage, usePutEditUserInfo } from '@/hooks/hooks'

import CropImage from '@/component/molecules/CropImage'
import Button from '@/component/atoms/Button'
import { SpinnerIcon } from '@/component/atoms/CustomIcon/CustomIcon'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const EditMyAccount = () => {
  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  const queryClient = useQueryClient()

  const getInfoApi = useGetUserInfo(isLogin.session, {
    onSuccess(data) {
      reset({
        fullName: data.results.fullName,
        email: data.results.email,
        phone: data.results.phone,
      })
      setPreviewImg(data?.results.avatar as string)
    },
  })

  const postImageApi = usePostImage(`EditUser-${isLogin?.session}`)

  const editUserApi = usePutEditUserInfo(isLogin.session)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAccountType>({
    defaultValues: {
      fullName: getInfoApi.data?.results.fullName,
      email: getInfoApi.data?.results.email,
      phone: getInfoApi.data?.results.phone,
    },
  })

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null)
  const [modalCrop, setModalCrop] = useState<boolean>(false)
  const [previewImg, setPreviewImg] = useState<string>(
    getInfoApi.data?.results.avatar! || '',
  )
  const [file, setFile] = useState<File>()
  const [fileImage, setFileImage] = useState<Blob>(new Blob())

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
    const fileAvt = new File(
      [fileImage],
      `image-${Math.floor(Math.random() * 100000)}.${
        fileImage.type.split('/')[1]
      }`,
      {
        type: fileImage.type,
      },
    )
    const formData = new FormData()
    formData.append('image', fileAvt)

    let upload
    try {
      upload = await postImageApi.mutateAsync(formData)
    } catch (error) {
      console.log(error)
    }
    return upload
  }

  const handleUpdateInfo = async (value: EditAccountType) => {
    if (fileImage.size !== 0) {
      const avatar = await uploadFile()
      value.avatar = avatar?.data.results as string
    } else {
      value.avatar = previewImg
        ? (getInfoApi.data?.results.avatar as string)
        : ''
    }

    editUserApi.mutate(value, {
      onSuccess(data) {
        toast.success('Cập nhật thông tin tài khoản thành công!')
        queryClient.setQueryData(
          ['UserInfo', { slug: isLogin.session }],
          data.data,
        )
      },
      onError(error) {
        const err = error as ResponseErrorType
        if (err.message === 'Mật khẩu cũ không đúng.') {
          toast.error('Sai mật khẩu cũ, vui lòng nhập lại!')
          return
        }
        if (err.message === 'email đã tồn tại.') {
          toast.error('Email đã tồn tại, vui lòng kiểm tra lại!')
          return
        }
        if (err.message === 'phone đã tồn tại.') {
          toast.error('Số điện thoại đã tồn tại, vui lòng kiểm tra lại!')
          return
        }
      },
    })
  }

  return (
    <Fragment>
      <div
        className={`mb-5 flex min-h-[72px] w-full flex-wrap items-center justify-between rounded-lg py-4 shadow lg:flex-nowrap ${
          getInfoApi.isLoading ? 'animate-pulse bg-gray-300' : 'bg-white'
        }`}
      >
        {!getInfoApi.isLoading && (
          <>
            <div className='flex items-center gap-3'>
              <h1 className='ml-5 text-textHeadingColor md:text-base lg:text-xl'>
                Chỉnh sửa thông tin cá nhân
              </h1>
            </div>
            <Button
              className='mx-5 mt-4 flex max-h-[40px] w-full min-w-[112px] items-center justify-center rounded-md bg-primaryColor px-3 py-2 text-white hover:bg-secondColor sm:mt-0 sm:w-max md:text-sm lg:text-base'
              onClick={handleSubmit(handleUpdateInfo)}
            >
              {editUserApi.isLoading ? (
                <i className='ri-loader-4-line animate-spin text-2xl'></i>
              ) : (
                <span>Lưu cài đặt</span>
              )}
            </Button>
          </>
        )}
      </div>
      <div className='grid grid-cols-12 gap-x-3'>
        <div className='order-2 col-span-12 lg:order-none lg:col-span-8'>
          <div
            className={` min-h-[536px] rounded-lg p-5 shadow ${
              getInfoApi.isLoading ? 'animate-pulse bg-gray-300' : 'bg-white'
            }`}
          >
            <form>
              <div className='mb-5'>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-normal text-textHeadingColor'
                >
                  Mật khẩu hiện tại
                </label>
                <input
                  disabled={getInfoApi.isLoading ? true : false}
                  type='password'
                  id='oldPassword'
                  {...register('oldPassword', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập mật khẩu!',
                    },
                  })}
                  autoComplete='on'
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.oldPassword
                      ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                      : 'bg-white'
                  }`}
                  placeholder='Mật khẩu cũ'
                />
                <p className='mt-2 text-sm text-secondColor'>
                  {errors.oldPassword?.message}
                </p>
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-normal text-textHeadingColor'
                >
                  Mật khẩu mới
                </label>
                <input
                  disabled={getInfoApi.isLoading ? true : false}
                  type='password'
                  id='password'
                  {...register('password', {
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/,
                      message:
                        'Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ cái viết thường, 1 chữ cái viết hoa và 1 chữ số!',
                    },
                  })}
                  autoComplete='on'
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.password
                      ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                      : 'bg-white'
                  }`}
                  placeholder='Nhập mật khẩu'
                />
                <p className='mt-2 text-sm text-secondColor'>
                  {errors.password?.message}
                </p>
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='name'
                  className='mb-2 block text-sm font-normal text-textHeadingColor'
                >
                  Họ và tên
                </label>
                <input
                  disabled={getInfoApi.isLoading ? true : false}
                  type='text'
                  id='name'
                  {...register('fullName', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập họ và tên!',
                    },
                  })}
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.fullName
                      ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                      : 'bg-white'
                  }`}
                  placeholder='Họ và tên'
                />
                <p className='mt-2 text-sm text-secondColor'>
                  {errors.fullName?.message}
                </p>
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-normal text-textHeadingColor'
                >
                  Email
                </label>
                <input
                  disabled={getInfoApi.isLoading ? true : false}
                  type='email'
                  id='email'
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập email!',
                    },
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Vui lòng nhập đúng định dạng email!',
                    },
                  })}
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.email
                      ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                      : 'bg-white'
                  }`}
                  placeholder='Email'
                />
                <p className='mt-2 text-sm text-secondColor'>
                  {errors.email?.message}
                </p>
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='phone'
                  className='mb-2 block text-sm font-normal text-textHeadingColor'
                >
                  Số điện thoại
                </label>
                <input
                  disabled={getInfoApi.isLoading ? true : false}
                  type='text'
                  id='phone'
                  {...register('phone', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập số điện thoại!',
                    },
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                    },
                  })}
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.phone
                      ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                      : 'bg-white'
                  }`}
                  placeholder='Số điện thoại'
                />
                <p className='mt-2 text-sm text-secondColor'>
                  {errors.phone?.message}
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-4 [&>*]:mb-5'>
          <div
            className={`mt-0 rounded-lg p-5 shadow ${
              getInfoApi.isLoading ? 'animate-pulse bg-gray-300' : 'bg-white'
            }`}
          >
            <div className='mb-3 flex items-center justify-between'>
              <h1 className='text-textHeadingColor'>Ảnh đại diện</h1>
              <div className='flex items-center gap-3 text-sm'>
                <label
                  htmlFor='dropZone'
                  className='cursor-pointer text-blue-500'
                >
                  Thay thế ảnh
                </label>
                <span
                  className='cursor-pointer text-primaryColor'
                  onClick={() => {
                    setPreviewImg('')
                  }}
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
                {getInfoApi.isLoading ? (
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
                          crossOrigin='anonymous'
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
                  disabled={getInfoApi.isLoading ? true : false}
                  onChange={handleCrop}
                  accept='image/*'
                  hidden
                />
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
          user
        />
      )}
    </Fragment>
  )
}

export default EditMyAccount
