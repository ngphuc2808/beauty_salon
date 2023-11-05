import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import he from 'he'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Editor } from '@ckeditor/ckeditor5-core'
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Font } from '@ckeditor/ckeditor5-font'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Underline, Bold, Italic } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { Link as LinkEditor } from '@ckeditor/ckeditor5-link'
import { List } from '@ckeditor/ckeditor5-list'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import {
  Image,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
} from '@ckeditor/ckeditor5-image'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent'
import { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload'

import CropImage from '@/component/molecules/CropImage'
import Button from '@/component/atoms/Button'
import { SpinnerIcon } from '@/component/atoms/CustomIcon/CustomIcon'

import {
  useGetPost,
  usePostImage,
  usePostCreatePost,
  usePutEditPost,
  usePostCreateProduct,
  useGetProduct,
  usePutEditProduct,
} from '@/hooks/hooks'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const CreatePost = () => {
  const router = useNavigate()

  const { pathname } = useLocation()

  const isCreatePosts = Boolean(pathname.split('/')[1] === 'tao-trang-bai-viet')

  const { id, slug } = useParams()

  const isUpdate = Boolean(id)

  const queryClient = useQueryClient()

  const getPostApi = useGetPost(slug!, {
    onSuccess(data) {
      postForm.reset({
        title: data.results.title,
        content: {
          html: data.results.content.html,
        },
        thumbnail: data.results.thumbnail,
        status: data.results.status.toString(),
      })
      setPreviewContent(he.decode(data.results.content.html) || '')
      setPreviewImg(data.results.thumbnail as string)
    },
    enabled: slug !== undefined && isCreatePosts,
  })

  const getProductApi = useGetProduct(slug!, {
    onSuccess(data) {
      productForm.reset({
        name: data.results.name,
        content: {
          html: data.results.content.html,
        },
        thumbnail: data.results.thumbnail,
        status: data.results.status.toString(),
        links: data.results.links,
      })
      setPreviewContent(he.decode(data.results.content.html) || '')
      setPreviewImg(data.results.thumbnail as string)
    },
    enabled: slug !== undefined && !isCreatePosts,
  })

  const postImageApi = usePostImage('CreatePost')

  const createPostApi = usePostCreatePost()

  const createProductApi = usePostCreateProduct()

  const updatePostApi = usePutEditPost(id!)

  const updateProductApi = usePutEditProduct(id!)

  const postForm = useForm<PostType>({
    defaultValues: {
      isLadingPage: false,
      title: getPostApi.data?.results.title || '',
      content: {
        projectData: '',
        html: getPostApi.data?.results.content.html || '',
        css: '',
      },
      thumbnail: getPostApi.data?.results.thumbnail || '',
      status: getPostApi.data?.results.status?.toString() || '',
      metaTitles: getPostApi.data?.results.metaTitles || '',
      metaKeyWords: getPostApi.data?.results.metaKeyWords || '',
      metaDescriptions: getPostApi.data?.results.metaDescriptions || '',
    },
  })

  const productForm = useForm<ProductType>({
    defaultValues: {
      name: getProductApi.data?.results.name || '',
      content: {
        projectData: '',
        html: getProductApi.data?.results.content.html || '',
        css: '',
      },
      thumbnail: getProductApi.data?.results.thumbnail || '',
      links: getProductApi.data?.results.links || [
        {
          name: '',
          link: '',
        },
      ],
      status: getProductApi.data?.results.status?.toString() || '',
      metaTitles: getProductApi.data?.results.metaTitles || '',
      metaKeyWords: getProductApi.data?.results.metaKeyWords || '',
      metaDescriptions: getProductApi.data?.results.metaDescriptions || '',
    },
  })

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null)
  const [modalCrop, setModalCrop] = useState(false)
  const [previewImg, setPreviewImg] = useState<string>(
    (isCreatePosts
      ? getPostApi.data?.results.thumbnail
      : getProductApi.data?.results.thumbnail) || '',
  )
  const [previewContent, setPreviewContent] = useState<string>(
    isCreatePosts
      ? getPostApi.data?.results! &&
          he.decode(getPostApi.data.results.content.html!)
      : (getProductApi.data?.results! &&
          he.decode(getProductApi.data?.results.content.html!)) ||
          '',
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

  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control: productForm.control,
  })

  function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const fileImge = await loader.file

            const formData = await new FormData()
            await formData.append('image', fileImge!)

            const response = await postImageApi.mutateAsync(formData)

            resolve({
              default: `${response.data.results}`,
            })
          } catch (error) {
            reject('Hello')
          }
        })
      },
      abort: () => {},
    }
  }

  function uploadPlugin(editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
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

  const handleCreatePost = async (value: PostType) => {
    if (fileImage.size !== 0) {
      const thumbnail = await uploadFile()
      value.thumbnail = thumbnail?.data.results as string
    } else {
      value.thumbnail = previewImg
        ? (getPostApi.data?.results.thumbnail as string)
        : ''
    }

    value.content.html = previewContent

    if (!isUpdate) {
      createPostApi.mutate(value, {
        onSuccess() {
          postForm.reset()
          setPreviewImg('')
          setPreviewContent('')
          toast.success('Thêm bài viết thành công!')
          queryClient.invalidateQueries({ queryKey: ['ListPost'] })
        },
        onError(error) {
          const err = error as ResponseErrorType
          console.log(err)
        },
      })
    } else {
      updatePostApi.mutate(value, {
        onSuccess() {
          toast.success('Cập nhật bài viết thành công!')
          queryClient.invalidateQueries({ queryKey: ['ListPost'] })
          router('/danh-sach-bai-viet')
        },
        onError(error) {
          const err = error as ResponseErrorType
          console.log(err)
        },
      })
    }
  }

  const handleCreateProduct = async (value: ProductType) => {
    if (fileImage.size !== 0) {
      const thumbnail = await uploadFile()
      value.thumbnail = thumbnail?.data.results as string
    } else {
      value.thumbnail = (getPostApi.data?.results.thumbnail as string) || ''
    }

    value.content.html = previewContent

    if (!isUpdate) {
      createProductApi.mutate(value, {
        onSuccess() {
          productForm.reset()
          setPreviewImg('')
          setPreviewContent('')
          toast.success('Thêm sản phẩm thành công!')
          queryClient.invalidateQueries({ queryKey: ['ListProduct'] })
        },
        onError(error) {
          const err = error as ResponseErrorType
          console.log(err)
        },
      })
    } else {
      updateProductApi.mutate(value, {
        onSuccess() {
          toast.success('Cập nhật sản phẩm thành công!')
          queryClient.invalidateQueries({ queryKey: ['ListProduct'] })
          router('/danh-sach-san-pham')
        },
        onError(error) {
          const err = error as ResponseErrorType
          console.log(err)
        },
      })
    }
  }

  return (
    <Fragment>
      <div
        className={`mb-5 flex min-h-[72px] w-full flex-wrap items-center justify-between rounded-lg py-4 shadow lg:flex-nowrap ${
          getPostApi.isLoading || getProductApi.isLoading
            ? 'animate-pulse bg-gray-300'
            : 'bg-white'
        }`}
      >
        {(isCreatePosts ? !getPostApi.isLoading : !getProductApi.isLoading) && (
          <>
            <div className='flex items-center gap-3'>
              <Button
                to={
                  isCreatePosts ? '/danh-sach-bai-viet' : '/danh-sach-san-pham'
                }
              >
                <i className='ri-arrow-left-line ml-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primaryColor text-xl text-white hover:bg-secondColor lg:text-2xl'></i>
              </Button>
              <h1 className='text-xl text-textHeadingColor'>
                {isCreatePosts
                  ? !isUpdate
                    ? 'Tạo trang bài viết'
                    : 'Sửa trang bài viêt'
                  : !isUpdate
                  ? 'Tạo trang sản phẩm'
                  : 'Sửa trang sản phẩm'}
              </h1>
            </div>
            {id && (
              <div className='mr-5'>
                <Button
                  to={'#'}
                  className='w-[48%] rounded-md bg-primaryColor px-4 py-3 text-sm text-white hover:bg-secondColor lg:w-[200px]'
                >
                  Truy cập trang
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <div className='grid grid-cols-12 gap-x-3'>
        <div className='order-2 col-span-12 lg:order-none lg:col-span-8'>
          <div
            className={`mb-5 rounded-lg p-5 shadow ${
              getPostApi.isLoading || getProductApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
            <h1 className='mb-2 block font-normal text-textHeadingColor'>
              {getPostApi.error || getProductApi.error
                ? 'Bài viết/Sản phẩm không tồn tại!'
                : isCreatePosts
                ? 'Tên bài viết'
                : 'Tên sản phẩm'}
            </h1>
            {isCreatePosts ? (
              <>
                <input
                  type='text'
                  placeholder='Nhập tên bài viết'
                  disabled={
                    getPostApi.isLoading || getPostApi.isError ? true : false
                  }
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    postForm.formState.errors.title
                      ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                      : 'bg-white'
                  }`}
                  {...postForm.register('title', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập tên bài viết!',
                    },
                    minLength: {
                      value: 10,
                      message: 'Vui lòng nhập tối thiểu 10 ký tự!',
                    },
                  })}
                />
                <p className='mt-2 text-sm text-secondColor'>
                  {postForm.formState.errors.title?.message}
                </p>
              </>
            ) : (
              <>
                <input
                  type='text'
                  placeholder='Nhập tên sản phẩm'
                  disabled={
                    getProductApi.isLoading || getProductApi.isError
                      ? true
                      : false
                  }
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    productForm.formState.errors.name
                      ? 'border-primaryColor bg-red-50 placeholder-primaryColor'
                      : 'bg-white'
                  }`}
                  {...productForm.register('name', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập tên sản phẩm!',
                    },
                    minLength: {
                      value: 10,
                      message: 'Vui lòng nhập tối thiểu 10 ký tự!',
                    },
                  })}
                />
                <p className='mt-2 text-sm text-secondColor'>
                  {productForm.formState.errors.name?.message}
                </p>
              </>
            )}
          </div>
          <div
            className={`mb-5 w-full rounded-lg p-4 shadow ${
              getPostApi.isLoading || getProductApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
            <CKEditor
              disabled={
                getPostApi.isLoading ||
                getPostApi.isError ||
                getProductApi.isLoading ||
                getProductApi.isError
                  ? true
                  : false
              }
              editor={ClassicEditor}
              config={{
                extraPlugins: [uploadPlugin],
                plugins: [
                  Autoformat,
                  Essentials,
                  Paragraph,
                  Bold,
                  Italic,
                  Heading,
                  Indent,
                  IndentBlock,
                  Underline,
                  BlockQuote,
                  Font,
                  Alignment,
                  List,
                  LinkEditor,
                  MediaEmbed,
                  PasteFromOffice,
                  Image,
                  ImageStyle,
                  ImageToolbar,
                  ImageUpload,
                  ImageResize,
                  Table,
                  TableToolbar,
                  TextTransformation,
                ],
                toolbar: [
                  'undo',
                  'redo',
                  '|',
                  'heading',
                  '|',
                  'fontFamily',
                  'fontSize',
                  'fontColor',
                  'fontBackgroundColor',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  '|',
                  'alignment',
                  'outdent',
                  'indent',
                  'bulletedList',
                  'numberedList',
                  'blockQuote',
                  '|',
                  'link',
                  'insertTable',
                  'imageUpload',
                  'mediaEmbed',
                ],
                heading: {
                  options: [
                    {
                      model: 'paragraph',
                      title: 'Paragraph',
                      class: 'ck-heading_paragraph',
                    },
                    {
                      model: 'heading1',
                      view: 'h1',
                      title: 'Heading 1',
                      class: 'ck-heading_heading1',
                    },
                    {
                      model: 'heading2',
                      view: 'h2',
                      title: 'Heading 2',
                      class: 'ck-heading_heading2',
                    },
                    {
                      model: 'heading3',
                      view: 'h3',
                      title: 'Heading 3',
                      class: 'ck-heading_heading3',
                    },
                  ],
                },
                fontSize: {
                  options: [
                    9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25,
                    27, 29, 31, 33, 35,
                  ],
                },
                fontFamily: {
                  options: [
                    'default',
                    'Arial, Helvetica, sans-serif',
                    'Courier New, Courier, monospace',
                    'Georgia, serif',
                    'Lucida Sans Unicode, Lucida Grande, sans-serif',
                    'Tahoma, Geneva, sans-serif',
                    'Times New Roman, Times, serif',
                    'Trebuchet MS, Helvetica, sans-serif',
                    'Verdana, Geneva, sans-serif',
                  ],
                },
                alignment: {
                  options: ['justify', 'left', 'center', 'right'],
                },
                table: {
                  contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                  ],
                },
                image: {
                  resizeUnit: 'px',
                  toolbar: [
                    'imageStyle:alignLeft',
                    'imageStyle:alignCenter',
                    'imageStyle:alignRight',
                    '|',
                    'imageTextAlternative',
                  ],
                },
                typing: {
                  transformations: {
                    include: [
                      'quotes',
                      'typography',
                      { from: 'CKE', to: 'CKEditor' },
                    ],
                    remove: [
                      'enDash',
                      'emDash',
                      'oneHalf',
                      'oneThird',
                      'twoThirds',
                      'oneForth',
                      'threeQuarters',
                    ],
                  },
                },
                placeholder: 'Nhập nội dung...',
              }}
              data={previewContent}
              onChange={(_event, editor) => {
                setPreviewContent(editor.getData())
              }}
            />
          </div>
          {isUpdate && (
            <div
              className={`mb-5 rounded-lg p-5 shadow ${
                getPostApi.isLoading || getProductApi.isLoading
                  ? 'animate-pulse bg-gray-300'
                  : 'bg-white'
              }`}
            >
              {(isCreatePosts
                ? !getPostApi.isLoading
                : !getProductApi.isLoading) && (
                <>
                  <h1 className='text-lg text-textHeadingColor'>
                    Bình luận của khách hàng
                  </h1>
                  {(isCreatePosts
                    ? !getPostApi.error
                    : !getProductApi.error) && (
                    <ul className='mt-5 '>
                      <li className='rounded-md  bg-red-200'>
                        <div className='flex items-center justify-between px-5 py-2'>
                          <h1 className='text-textPrimaryColor'>
                            Tên khách hàng
                          </h1>
                          <Button className='text-primaryColor'>Xóa</Button>
                        </div>
                        <div className='mx-5 max-h-[100px] overflow-y-scroll rounded-md bg-white px-5 py-2'>
                          <p className='text-sm text-textPrimaryColor'>
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                          </p>
                        </div>
                        <div className='flex items-center justify-between px-5 py-2'>
                          <div className='flex items-center gap-4'>
                            <Button className='text-blue-500'>Trả lời</Button>
                            <i className='ri-heart-fill cursor-pointer text-xl text-primaryColor' />
                            <i className='ri-dislike-fill cursor-pointer text-xl text-textPrimaryColor' />
                          </div>
                          <span className='block'>
                            <p className='text-sm text-textPrimaryColor'>
                              Thời gian: 20/10/2023
                            </p>
                          </span>
                        </div>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </div>
          )}
          <div
            className={`rounded-lg p-5 shadow ${
              getPostApi.isLoading || getProductApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
            {(isCreatePosts
              ? !getPostApi.isLoading
              : !getProductApi.isLoading) && (
              <div className='flex items-center justify-between'>
                <Button
                  className='w-[48%] rounded-md bg-primaryColor px-4 py-3 text-sm text-white hover:bg-secondColor lg:w-[200px]'
                  onClick={
                    isCreatePosts
                      ? postForm.handleSubmit(handleCreatePost)
                      : productForm.handleSubmit(handleCreateProduct)
                  }
                >
                  Lưu
                </Button>
                <Button
                  to={'/tao-danh-muc'}
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
              getPostApi.isLoading || getProductApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
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
                {getPostApi.isLoading || getProductApi.isLoading ? (
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
                    getPostApi.error || getPostApi.isLoading ? true : false
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
              getPostApi.isLoading || getProductApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            } `}
          >
            <h1 className='mb-2 block font-normal text-textHeadingColor'>
              Trạng thái đăng
            </h1>
            <div>
              <label
                htmlFor='statusOn'
                className='mt-3 flex items-center gap-4 text-sm'
              >
                {isCreatePosts ? (
                  <>
                    <input
                      type='radio'
                      id='statusOn'
                      disabled={
                        getPostApi.error || getPostApi.isLoading ? true : false
                      }
                      {...postForm.register('status', {
                        required: true,
                      })}
                      value='true'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                        checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <p
                      className={`${
                        postForm.formState.errors.status
                          ? 'text-secondColor'
                          : 'text-textPrimaryColor'
                      }`}
                    >
                      Bật hiển thị
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type='radio'
                      id='statusOn'
                      disabled={
                        getProductApi.error || getProductApi.isLoading
                          ? true
                          : false
                      }
                      {...productForm.register('status', {
                        required: true,
                      })}
                      value='true'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                        checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <p
                      className={`${
                        productForm.formState.errors.status
                          ? 'text-secondColor'
                          : 'text-textPrimaryColor'
                      }`}
                    >
                      Bật hiển thị
                    </p>
                  </>
                )}
              </label>
              <label
                htmlFor='statusOff'
                className='mt-4 flex items-center gap-4 text-sm'
              >
                {isCreatePosts ? (
                  <>
                    <input
                      type='radio'
                      id='statusOff'
                      disabled={
                        getPostApi.error || getPostApi.isLoading ? true : false
                      }
                      {...postForm.register('status', {
                        required: true,
                      })}
                      value='false'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                        checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <span
                      className={`${
                        postForm.formState.errors.status
                          ? 'text-secondColor'
                          : 'text-textPrimaryColor'
                      }`}
                    >
                      Tắt hiển thị
                    </span>
                  </>
                ) : (
                  <>
                    <input
                      type='radio'
                      id='statusOff'
                      disabled={
                        getProductApi.error || getProductApi.isLoading
                          ? true
                          : false
                      }
                      {...productForm.register('status', {
                        required: true,
                      })}
                      value='false'
                      className="visible after:relative after:left-0 after:top-[-2px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                        checked:after:visible checked:after:relative checked:after:left-0 checked:after:top-[-2px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <span
                      className={`${
                        productForm.formState.errors.status
                          ? 'text-secondColor'
                          : 'text-textPrimaryColor'
                      }`}
                    >
                      Tắt hiển thị
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>
          <div
            className={`mt-5 rounded-lg p-5 shadow ${
              getPostApi.isLoading || getProductApi.isLoading
                ? 'animate-pulse bg-gray-300'
                : 'bg-white'
            }`}
          >
            <div className='[&>*]:mb-4 [&>:first-child]:mb-3'>
              <h1 className='mb-2 block font-normal text-textHeadingColor'>
                Tối ưu hóa công cụ tìm kiếm
              </h1>
              <div className='relative z-0 mt-5'>
                {isCreatePosts ? (
                  <input
                    type='text'
                    id='metaTitle'
                    disabled={
                      getPostApi.isLoading || getPostApi.isError ? true : false
                    }
                    {...postForm.register('metaTitles')}
                    className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  />
                ) : (
                  <input
                    type='text'
                    id='metaTitle'
                    disabled={
                      getProductApi.isLoading || getProductApi.isError
                        ? true
                        : false
                    }
                    {...productForm.register('metaTitles')}
                    className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  />
                )}
                <label
                  htmlFor='metaTitle'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                >
                  Meta title
                </label>
              </div>
              <div className='relative z-0'>
                {isCreatePosts ? (
                  <input
                    type='text'
                    id='metaKeyWords'
                    disabled={
                      getPostApi.isLoading || getPostApi.isError ? true : false
                    }
                    {...postForm.register('metaKeyWords')}
                    className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  />
                ) : (
                  <input
                    type='text'
                    id='metaKeyWords'
                    disabled={
                      getProductApi.isLoading || getProductApi.isError
                        ? true
                        : false
                    }
                    {...productForm.register('metaKeyWords')}
                    className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  />
                )}
                <label
                  htmlFor='metaKeyWords'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                >
                  Meta keywords
                </label>
              </div>
              <div className='relative z-0'>
                {isCreatePosts ? (
                  <input
                    type='text'
                    id='metaDescription'
                    disabled={
                      getPostApi.isLoading || getPostApi.isError ? true : false
                    }
                    {...postForm.register('metaDescriptions')}
                    className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  />
                ) : (
                  <input
                    type='text'
                    id='metaDescription'
                    disabled={
                      getProductApi.isLoading || getProductApi.isError
                        ? true
                        : false
                    }
                    {...productForm.register('metaDescriptions')}
                    className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                  />
                )}
                <label
                  htmlFor='metaDescription'
                  className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                >
                  Meta description
                </label>
              </div>
            </div>
          </div>
          {!isCreatePosts && (
            <div
              className={`mt-5 rounded-lg p-5 shadow ${
                getProductApi.isLoading
                  ? 'animate-pulse bg-gray-300'
                  : 'bg-white'
              }`}
            >
              <div className='[&>*]:mb-4 [&>:first-child]:mb-3'>
                <h1 className='text-lg text-textHeadingColor'>
                  Button đặt hàng
                </h1>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <div className='mt-5 flex items-center gap-5'>
                      <div className='relative z-0 w-1/4'>
                        <input
                          type='text'
                          id='link'
                          disabled={getProductApi.isLoading ? true : false}
                          {...productForm.register(`links.${index}.name`)}
                          className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                        />
                        <label
                          htmlFor='links'
                          className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                        >
                          Tên
                        </label>
                      </div>
                      <div className='relative z-0 flex-1'>
                        <input
                          type='text'
                          id='link'
                          {...productForm.register(`links.${index}.link`)}
                          className='peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-sm text-textPrimaryColor focus:border-primaryColor focus:outline-none focus:ring-0'
                        />
                        <label
                          htmlFor='links'
                          className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-textPrimaryColor duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primaryColor'
                        >
                          Button
                        </label>
                      </div>
                      {index === 0 && (
                        <Button
                          className=''
                          onClick={() => append({ name: '', link: '' })}
                          disable={getProductApi.isLoading ? true : false}
                        >
                          <i className='ri-add-line cursor-pointer p-1 text-xl hover:text-green-500'></i>
                        </Button>
                      )}
                      {index !== 0 && (
                        <Button className='' onClick={() => remove(index)}>
                          <i className='ri-close-line cursor-pointer p-1 text-xl hover:text-secondColor'></i>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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

export default CreatePost
