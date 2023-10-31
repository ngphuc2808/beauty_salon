import Button from '@/component/atoms/Button'

type Props = {
  title: string
  description: string
  setModalDelete: (value: boolean) => void
  handleDelete: () => void
  isLoading: boolean
}

const Modal = ({
  title,
  description,
  setModalDelete,
  handleDelete,
  isLoading,
}: Props) => {
  return (
    <>
      <div className='fixed inset-0 z-50 bg-gray-500 bg-opacity-40'></div>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center transition'>
        <div className='relative z-20 max-h-full w-full max-w-[90%] sm:max-w-md'>
          <div className='relative rounded-md bg-white shadow'>
            <i
              className='ri-close-line absolute right-4 top-2 cursor-pointer text-2xl hover:text-secondColor'
              onClick={() => setModalDelete(false)}
            ></i>
            <div className='p-8 text-center'>
              <div className='mb-5'>
                <h3 className='mb-1 font-normal text-textHeadingColor'>
                  {title}
                </h3>
                <p className='text-sm text-textPrimaryColor'>{description}</p>
              </div>
              <hr />
              <div className='mt-5 flex items-center justify-center'>
                <Button
                  className='mr-2 inline-flex max-h-[40px] min-w-[105px] items-center justify-center rounded-md bg-primaryColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondColor'
                  onClick={handleDelete}
                >
                  {isLoading ? (
                    <i className='ri-loader-4-line animate-spin text-2xl'></i>
                  ) : (
                    <span>Xác nhận</span>
                  )}
                </Button>
                <Button
                  className='min-w-[105px] rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-textPrimaryColor hover:bg-gray-100 hover:text-textHeadingColor focus:z-10'
                  onClick={() => setModalDelete(false)}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
