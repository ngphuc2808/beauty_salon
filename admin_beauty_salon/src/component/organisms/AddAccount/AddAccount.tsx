import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { usePostCreateUser, usePostImage } from '@/hooks/hooks'
import { useQueryClient } from 'react-query'

import CropImage from '@/component/molecules/CropImage'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const AddAccount = () => {
  const queryClient = useQueryClient()

  const postImageApi = usePostImage()

  const createUserApi = usePostCreateUser()

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null)
  const [modalCrop, setModalCrop] = useState<boolean>(false)
  const [previewImg, setPreviewImg] = useState<string>('')
  const [file, setFile] = useState<File>()
  const [fileImage, setFileImage] = useState<Blob>(new Blob())

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddAccountType>({})

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
          setModalCrop(true)
          setCropImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (reader && reader.readyState === 2) {
        setCropImage('')
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

  const handleAddAccount = async (value: AddAccountType) => {
    const newValue = value
    if (fileImage.size !== 0) {
      const avatar = await uploadFile()
      newValue.avatar = avatar?.data.results as string
    } else {
      newValue.avatar = ''
    }

    createUserApi.mutate(newValue, {
      onSuccess() {
        setPreviewImg('')
        reset()
        toast.success('Thêm tài khoản thành công!')
        queryClient.invalidateQueries({ queryKey: ['ListUser'] })
      },
      onError(error) {
        const err = error as ResponseErrorType
        if (
          err.message ===
          'Tên đăng nhập chỉ chứa các ký tự chữ cái, chữ số, dấu gạch dưới và có độ dài từ 3 đến 30 kí tự.'
        ) {
          toast.error(
            'Tạo account thất bại, vui lòng kiểm tra lại định dạng tài khoản!',
          )
          return
        }
        if (err.message === 'email đã tồn tại.') {
          toast.error('Email đã tồn tại trong hệ thống!')
          return
        }
        if (err.message === 'phone đã tồn tại.') {
          toast.error('Số điện thoại đã tồn tại trong hệ thống!')
          return
        }
      },
    })
  }

  return (
    <Fragment>
      <div className='mb-5 flex w-full flex-wrap items-center justify-between rounded-lg bg-white py-4 shadow lg:flex-nowrap'>
        <h1 className='ml-5 text-textHeadingColor md:text-base lg:text-xl'>
          Thêm tài khoản
        </h1>
        <div className='ml-5 mr-5 mt-4 flex w-full flex-col items-center gap-3 lg:ml-0 lg:mt-0 lg:w-auto lg:flex-row'>
          <Link
            to={'/danh-sach-nguoi-dung'}
            className='w-full rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 md:text-sm lg:w-auto lg:text-base'
          >
            Danh sách tài khoản
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-3'>
        <div className='order-2 col-span-12 lg:order-none lg:col-span-8'>
          <div className='rounded-lg bg-white p-5 shadow'>
            <form>
              <div className='mb-5'>
                <label
                  htmlFor='username'
                  className='mb-2 block text-sm font-normal text-textHeadingColor'
                >
                  Tài khoản
                </label>
                <input
                  type='text'
                  id='username'
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập tài khoản!',
                    },
                  })}
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.username
                      ? 'border-red-500 bg-red-50 placeholder-red-400'
                      : 'bg-white'
                  }`}
                  placeholder='Tài khoản'
                />
                <p className='mt-2 text-sm text-red-600'>
                  {errors.username?.message}
                </p>
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-normal text-textHeadingColor'
                >
                  Mật khẩu
                </label>
                <input
                  type='password'
                  id='password'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập mật khẩu!',
                    },
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
                      ? 'border-red-500 bg-red-50 placeholder-red-400'
                      : 'bg-white'
                  }`}
                  placeholder='Nhập mật khẩu'
                />
                <p className='mt-2 text-sm text-red-600'>
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
                      ? 'border-red-500 bg-red-50 placeholder-red-400'
                      : 'bg-white'
                  }`}
                  placeholder='Họ và tên'
                />
                <p className='mt-2 text-sm text-red-600'>
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
                      ? 'border-red-500 bg-red-50 placeholder-red-400'
                      : 'bg-white'
                  }`}
                  placeholder='Email'
                />
                <p className='mt-2 text-sm text-red-600'>
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
                      ? 'border-red-500 bg-red-50 placeholder-red-400'
                      : 'bg-white'
                  }`}
                  placeholder='Số điện thoại'
                />
                <p className='mt-2 text-sm text-red-600'>
                  {errors.phone?.message}
                </p>
              </div>
              <div className='mb-5'>
                <h1 className='mb-2 block text-sm font-normal text-textHeadingColor'>
                  Trạng thái
                </h1>
                <div className='flex items-center gap-10'>
                  <label
                    htmlFor='statusOn'
                    className='flex items-center gap-4 text-sm'
                  >
                    <input
                      type='radio'
                      id='statusOn'
                      {...register('status', {
                        required: {
                          value: true,
                          message: 'Vui lòng chọn trạng thái!',
                        },
                      })}
                      value='true'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <p
                      className={`${
                        errors.status ? 'text-red-600' : 'text-textPrimaryColor'
                      }`}
                    >
                      Bật
                    </p>
                  </label>
                  <label
                    htmlFor='statusOff'
                    className='flex items-center gap-4 text-sm'
                  >
                    <input
                      type='radio'
                      id='statusOff'
                      {...register('status', {
                        required: true,
                      })}
                      value='false'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <p
                      className={`${
                        errors.status ? 'text-red-600' : 'text-textPrimaryColor'
                      }`}
                    >
                      Tắt
                    </p>
                  </label>
                </div>
                <p className='mt-2 text-sm text-red-600'>
                  {errors.status?.message}
                </p>
              </div>
              <div className='mb-5'>
                <h1 className='mb-2 block text-sm font-normal text-textHeadingColor'>
                  Phân quyền
                </h1>
                <div className='flex items-center gap-10'>
                  <label
                    htmlFor='admin'
                    className='flex items-center gap-4 text-sm'
                  >
                    <input
                      type='radio'
                      id='admin'
                      {...register('role', {
                        required: {
                          value: true,
                          message: 'Vui lòng chọn quyền hạn!',
                        },
                      })}
                      value='admin'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <span
                      className={`${
                        errors.role ? 'text-red-600' : 'text-textPrimaryColor'
                      }`}
                    >
                      Quản trị viên
                    </span>
                  </label>
                  <label
                    htmlFor='employee'
                    className='flex items-center gap-4 text-sm'
                  >
                    <input
                      type='radio'
                      id='employee'
                      {...register('role', {
                        required: true,
                      })}
                      value='employee'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <span
                      className={`${
                        errors.role ? 'text-red-600' : 'text-textPrimaryColor'
                      }`}
                    >
                      Nhân viên
                    </span>
                  </label>
                </div>
                <p className='mt-2 text-sm text-red-600'>
                  {errors.role?.message}
                </p>
              </div>
            </form>
          </div>
          <div className='mt-5'>
            <div className='rounded-lg bg-white p-5 shadow'>
              <div className='flex items-center justify-between'>
                <button
                  className='flex max-h-[42px] w-[48%] items-center justify-center rounded-md bg-red-400 px-4 py-3 text-sm text-white hover:bg-red-500 lg:w-[200px]'
                  onClick={handleSubmit(handleAddAccount)}
                >
                  {createUserApi.isLoading ? (
                    <i className='ri-loader-4-line animate-spin text-2xl'></i>
                  ) : (
                    <span>Lưu</span>
                  )}
                </button>
                <Link
                  to={'/danh-muc-cap-1'}
                  className='flex w-[48%] justify-center rounded-md bg-red-400 px-4 py-3 text-sm text-white hover:bg-red-500 lg:w-[200px]'
                >
                  Thoát
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-4 [&>*]:mb-5'>
          <div className='mt-0 rounded-lg bg-white p-5 shadow'>
            <div className='mb-3 flex items-center justify-between'>
              <h1 className='text-textHeadingColor'>Ảnh bài viết</h1>
              <div className='flex items-center gap-3 text-sm'>
                <label
                  htmlFor='dropZone'
                  className='cursor-pointer text-blue-500'
                >
                  Thay thế ảnh
                </label>
                <span
                  className='cursor-pointer text-red-500'
                  onClick={() => {
                    setPreviewImg('')
                    setValue('avatar', '')
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
                      <p className='mb-2 text-sm text-textPrimaryColor'>
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
                <input
                  id='dropZone'
                  type='file'
                  onChange={handleCrop}
                  accept='.png, .jpg, .jpeg'
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
        />
      )}
    </Fragment>
  )
}

export default AddAccount
