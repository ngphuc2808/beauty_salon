import { useGetPost, usePostCreatePost } from '@/hooks/hooks'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CustomPageManager() {
  const { id } = useParams()

  const isUpdate = Boolean(id)

  const landing = useGetPost(id!, {
    onSuccess(data) {
      reset({
        title: data?.results.title,
        isLadingPage: true,
        content: {
          projectData: data.results.content.projectData,
          html: data.results.content.html,
          css: data.results.content.css,
        },
        thumbnail: '',
        status: true,
      })
    },
  })

  const posts = usePostCreatePost()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostsType>({
    defaultValues: {
      title: landing.data?.results.title,
      isLadingPage: true,
      content: {
        projectData: landing.data?.results.content.projectData,
        html: landing.data?.results.content.html,
        css: landing.data?.results.content.css,
      },
      thumbnail: '',
      status: true,
    },
  })

  const handleSave = (data: PostsType) => {
    data.content.html = (window as any).editor.getHtml()
    data.content.css = (window as any).editor.getCss()
    data.content.projectData = JSON.stringify(
      (window as any).editor.getProjectData(),
    )

    console.log(data)
    posts.mutate(data, {
      onSuccess() {
        reset({
          title: '',
        })
        ;(window as any).editor.runCommand('core:canvas-clear')
        toast.success('Thêm bài viết thành công!')
      },
      onError(error) {
        const err = error as ResponseErrorType
        console.log(err)
      },
    })
  }

  return (
    <div className='gjs-custom-page-manager'>
      <div className='mt-0 p-5'>
        <div className='mb-3 flex items-center justify-between'>
          <h1 className='text-textHeadingColor'>Ảnh bài viết</h1>
          <div className='flex items-center gap-3 text-sm'>
            <label htmlFor='dropZone' className='cursor-pointer text-blue-500'>
              Thay thế ảnh
            </label>
            <span className='cursor-pointer text-red-500' onClick={() => {}}>
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
              {true ? (
                <figure className='h-full w-full'>
                  <img className='max-h-full max-w-full' src={''} alt='image' />
                </figure>
              ) : (
                <>
                  <i className='ri-upload-cloud-2-line mb-1 text-4xl text-textPrimaryColor'></i>
                  <p className='mb-2 text-sm text-textPrimaryColor'>
                    <span className='font-semibold'>
                      Bấm hoặc kéo thả để chọn ảnh của bạn
                    </span>
                  </p>
                  <p className='text-xs text-textPrimaryColor'>SVG, PNG, JPG</p>
                </>
              )}
            </div>
            <input
              id='dropZone'
              type='file'
              onChange={() => {}}
              hidden
              accept='image/*'
            />
          </label>
        </div>
      </div>
      <div className='px-5 pb-5'>
        <label htmlFor='title'>
          <h1 className='text-textHeadingColor'>Tên bài viết</h1>
          <input
            id='title'
            type='text'
            placeholder='Nhập tên bài viết'
            {...register('title', {
              required: true,
              minLength: 5,
              maxLength: 80,
            })}
            className={`mt-3 w-full rounded border border-red-400 p-3 text-sm text-black focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500/20`}
          />
          {errors.title?.type === 'required' && (
            <p className='mt-2 text-sm text-red-600'>
              Vui lòng nhập tên bài viết!
            </p>
          )}
          {errors.title?.type === 'minLength' && (
            <p className='mt-2 text-sm text-red-600'>
              Vui lòng nhập tối thiểu 10 ký tự!
            </p>
          )}
        </label>
        <div className=' mt-3 flex items-center gap-3'>
          <button
            className='w-[48%] rounded-md bg-red-400 px-4 py-3 text-sm text-black hover:bg-red-500'
            onClick={handleSubmit(handleSave)}
          >
            Lưu
          </button>
          <button className='w-[48%] rounded-md bg-red-400 px-4 py-3 text-sm text-black hover:bg-red-500'>
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  )
}
