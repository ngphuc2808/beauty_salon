import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'react-slugify'
import { Link } from 'react-router-dom'
import Select from 'react-tailwindcss-select'
import Search from '@/component/molecules/Search'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGlobalContext } from '@/contexts/globalContext'
import { useGetListPost, usePostCategory, usePostImage } from '@/hooks/hooks'
import CropImage from '@/component/molecules/CropImage'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const DetailCategory = () => {
  const { projectData } = useGlobalContext()

  const listPost = useGetListPost()

  const [searchTerm, setSearchTerm] = useState<string>('')

  const { mutateAsync } = usePostImage()

  let categories = usePostCategory()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCategoryType>({
    defaultValues: {
      name: '',
      level: 1,
      thumbnail: '',
      landingPage: {
        html: '',
        projectData: '',
        css: '',
      },
      urlKey: '',
      metaTitles: '',
      metaKeyWords: '',
      metaDescriptions: '',
      contentType: '',
      status: '',
      listChildren: [],
      listPost: [],
      listProduct: [],
    },
  })

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null)
  const [modalCrop, setModalCrop] = useState(false)
  const [previewImg, setPreviewImg] = useState<string>('')
  const [fileImage, setFileImage] = useState<Blob>(new Blob())
  const [file, setFile] = useState<File>()

  const options = [
    { value: 'fox', label: '🦊 Fox' },
    { value: 'Butterfly', label: '🦋 Butterfly' },
    { value: 'Honeybee', label: '🐝 Honeybee' },
  ]

  const [animal, setAnimal] = useState(null)

  const handleChange = (value: any) => {
    setAnimal(value)
  }

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
      upload = await mutateAsync(formData)
    } catch (error) {
      console.log(error)
    }
    return upload
  }

  const handlePost = async (value: PostCategoryType) => {
    const newValue = value
    if (fileImage.size !== 0) {
      const thumbnail = await uploadFile()
      newValue.thumbnail = thumbnail?.data.results as string
    } else {
      newValue.thumbnail = ''
    }

    value.landingPage.projectData = projectData.projectData
    value.landingPage.html = projectData.html
    value.landingPage.css = projectData.css

    categories.mutate(newValue, {
      onSuccess(data) {
        console.log(data)
        reset()
        toast.success('Thêm danh mục thành công!')
      },
    })
  }

  return (
    <Fragment>
      <div className='mb-5 flex w-full flex-wrap items-center justify-between rounded-lg bg-white py-4 shadow sm:flex-nowrap'>
        <div className='flex items-center gap-3'>
          <Link to={'/danh-muc-cap-1'}>
            <i className='ri-arrow-left-line ml-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-red-400 text-xl text-white hover:bg-red-500 lg:text-2xl'></i>
          </Link>
          <h1 className='text-xl text-textHeadingColor'>Thêm danh mục</h1>
        </div>
      </div>
      <div className='hidden rounded-lg bg-white p-5 shadow lg:block'>
        <h1 className='text-xl font-medium text-textHeadingColor'>Tổng quan</h1>
        <div className='mt-4'>
          <h1 className='mb-2 block font-normal text-textHeadingColor'>
            Tên danh mục
          </h1>
          <input
            type='text'
            placeholder='Nhập tên danh mục'
            {...register('name', {
              required: true,
              minLength: 10,
              maxLength: 80,
              onChange: (e) => {
                setValue('urlKey', `/${slugify(e.target.value)}`)
              },
            })}
            className={`block w-full rounded-md border p-3 text-sm outline-none ${
              errors.name
                ? 'border-red-500 bg-red-50 placeholder-red-400'
                : 'border-gray-300 bg-white'
            }`}
          />
          {errors.name?.type === 'required' && (
            <p className='mt-2 text-sm text-red-600'>
              Vui lòng nhập tên bài viết!
            </p>
          )}
          {errors.name?.type === 'minLength' && (
            <p className='mt-2 text-sm text-red-600'>
              Vui lòng nhập tối thiểu 10 ký tự!
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-3'>
        <div className='order-2 col-span-12 lg:order-none lg:col-span-8'>
          {(watch('contentType') === 'landing' ||
            watch('contentType') === 'landing_menu2') && (
            <div className='mt-0 rounded-lg bg-white p-5 shadow lg:mt-5'>
              <div className='items-center justify-between sm:flex'>
                <h1 className='text-lg text-textHeadingColor'>
                  Trang landing page cho danh mục
                </h1>
                <Link
                  to={'/tao-trang-landing-page'}
                  className='mt-3 w-full rounded-md bg-red-400 px-4 py-3 text-sm text-white hover:bg-red-500 sm:mt-0 sm:w-auto'
                >
                  {projectData.projectData
                    ? 'Cài đặt trang'
                    : 'Tạo trang landing page'}
                </Link>
              </div>
            </div>
          )}
          {(watch('contentType') === 'menu2' ||
            watch('contentType') === 'landing_menu2') && (
            <div
              className={`rounded-lg bg-white p-5 shadow ${
                watch('contentType') === 'menu2' ? 'mt-0 lg:mt-5' : 'mt-5'
              }`}
            >
              <div className='[&>:nth-child(2)]:h-[46px]'>
                <div className='mb-3 items-center justify-between sm:flex'>
                  <h1 className='text-lg text-textHeadingColor'>
                    Danh mục cấp 2
                  </h1>
                </div>
                <Select
                  classNames={{
                    menuButton: ({ isDisabled }: any) =>
                      `flex text-sm text-textPrimaryColor py-1 border border-gray-300 rounded shadow-sm focus:outline-none cursor-pointer ${
                        isDisabled
                          ? 'bg-gray-200'
                          : 'bg-white hover:border-gray-400 focus:border-red-500 focus:ring focus:ring-red-500/20'
                      }`,
                  }}
                  primaryColor='red'
                  placeholder='Chọn tên danh mục'
                  value={animal}
                  onChange={handleChange}
                  options={options}
                  isMultiple
                  isClearable
                />
                <ul className='mt-4 max-h-[400px] overflow-auto text-sm text-textPrimaryColor [&>:last-child]:border-none [&>li]:border-b'>
                  {/* <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li> */}
                </ul>
              </div>
            </div>
          )}
          {(watch('contentType') === 'posts' ||
            watch('contentType') === 'products') && (
            <div className='mt-5 rounded-lg bg-white p-5 shadow'>
              <div className='[&>*]:mb-4 [&>:first-child]:mb-3'>
                <div className='flex w-full items-center justify-between'>
                  <h1 className='text-lg text-textHeadingColor'>
                    Danh sách sản phẩm
                  </h1>
                  <Link
                    to={
                      watch('contentType') === 'posts'
                        ? '/tao-trang-bai-viet'
                        : watch('contentType') === 'products'
                        ? '/tao-trang-san-pham'
                        : ''
                    }
                    className='flex justify-center rounded-md bg-red-400 px-4 py-3 text-sm text-white hover:bg-red-500'
                  >
                    {watch('contentType') === 'posts'
                      ? 'Thêm bài viết'
                      : watch('contentType') === 'products' && 'Thêm sản phẩm'}
                  </Link>
                </div>
                <div className='flex w-full [&>div]:flex-1'>
                  <Search
                    title={'danh sách bài viết'}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    handleClearChange={handleClearChange}
                  />
                </div>
                <h3 className='text-sm text-textHeadingColor'>100 sản phẩm</h3>
                <ul className='max-h-[385px] overflow-y-scroll text-sm'>
                  {listPost.data?.results.map((item, index) => (
                    <li
                      className='flex items-center justify-between gap-5 border-b py-3'
                      key={index}
                    >
                      <figure className='w-[100px]'>
                        <img src={item.thumbnail} alt='thumbnail' />
                      </figure>
                      <p>{item.title}</p>
                      <button className='text-red-500'>Xóa</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className='mt-5 rounded-lg bg-white p-5 shadow'>
            <div className='[&>*]:mb-4 [&>:first-child]:mb-3'>
              <h1 className='mb-2 block font-normal text-textHeadingColor'>
                Tối ưu hóa công cụ tìm kiếm
              </h1>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='urlKey'
                  {...register('urlKey')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-red-500 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='urlKey'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-500'
                >
                  URL key
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='metaTitle'
                  {...register('metaTitles')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-red-500 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='metaTitle'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-500'
                >
                  Meta title
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='metaKeyWords'
                  {...register('metaKeyWords')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-red-500 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='metaKeyWords'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-500'
                >
                  Meta keywords
                </label>
              </div>
              <div className='relative z-0'>
                <input
                  type='text'
                  id='metaDescription'
                  {...register('metaDescriptions')}
                  className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-red-500 focus:outline-none focus:ring-0'
                  placeholder=' '
                />
                <label
                  htmlFor='metaDescription'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-500'
                >
                  Meta description
                </label>
              </div>
            </div>
          </div>
          <div className='mt-5 rounded-lg bg-white p-5 shadow'>
            <div className='flex items-center justify-between'>
              <button
                className='w-[48%] rounded-md bg-red-400 px-4 py-3 text-sm text-white hover:bg-red-500 lg:w-[200px]'
                onClick={handleSubmit(handlePost)}
              >
                Lưu
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
        <div className='col-span-12 lg:col-span-4 [&>*]:mb-5'>
          <div className='mt-5 rounded-lg bg-white p-5 shadow'>
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
                  className='cursor-pointer text-red-500'
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
                  hidden
                  accept='image/*'
                />
              </label>
            </div>
          </div>
          <div className='rounded-lg bg-white p-5 shadow'>
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
                  {...register('status', {
                    required: true,
                  })}
                  value='true'
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.status ? 'text-red-600' : 'text-textPrimaryColor'
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
                  {...register('status', {
                    required: true,
                  })}
                  value='false'
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.status ? 'text-red-600' : 'text-textPrimaryColor'
                  }`}
                >
                  Tắt hiển thị
                </span>
              </label>
            </div>
          </div>
          <div className='rounded-lg bg-white p-5 shadow'>
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
                  {...register('contentType', {
                    required: true,
                  })}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-red-600'
                      : 'text-textPrimaryColor'
                  }`}
                >
                  Trang landing page
                </span>
              </label>
              <label
                htmlFor='menu2'
                className='mt-4 flex items-center gap-4 text-sm'
              >
                <input
                  type='radio'
                  id='menu2'
                  value='menu2'
                  {...register('contentType', {
                    required: true,
                  })}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-red-600'
                      : 'text-textPrimaryColor'
                  }`}
                >
                  Danh mục cấp 2
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
                  {...register('contentType', {
                    required: true,
                  })}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-red-600'
                      : 'text-textPrimaryColor'
                  }`}
                >
                  Trang landing page, menu danh mục cấp 2
                </span>
              </label>
              <label
                htmlFor='posts'
                className='mt-4 flex items-center gap-4 text-sm'
              >
                <input
                  type='radio'
                  id='posts'
                  value='posts'
                  {...register('contentType', {
                    required: true,
                  })}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-red-600'
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
                  {...register('contentType', {
                    required: true,
                  })}
                  className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                />
                <span
                  className={`${
                    errors.contentType
                      ? 'text-red-600'
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
