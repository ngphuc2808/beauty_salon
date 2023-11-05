import { Fragment } from 'react'

import Button from '@/component/atoms/Button'

const ListSchedule = () => {
  return (
    <Fragment>
      <div className='mb-5 flex w-full flex-wrap items-center justify-between rounded-lg bg-white py-4 shadow sm:flex-nowrap'>
        <h1 className='ml-5 text-textHeadingColor md:ml-3 md:text-base lg:ml-5 lg:text-xl'>
          Danh sách lịch hẹn
        </h1>
      </div>
      <div className='relative mb-5 overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='mx-3 mb-3 flex items-center justify-center gap-4 border-b border-gray-200 sm:mx-5 sm:mb-5 lg:justify-normal'>
          <span className='rounded-md text-sm md:my-3 md:py-2 lg:my-5 lg:px-4 lg:text-base'>
            0 lượt chọn
          </span>
          <Button className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-textHeadingColor md:my-3'>
            Xóa
          </Button>
          <Button className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-textHeadingColor md:my-3'>
            Bật
          </Button>
          <Button className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-textHeadingColor md:my-3'>
            Tắt
          </Button>
        </div>
        <div className='max-h-[626px] w-full overflow-x-auto overflow-y-auto'>
          <table className='mb-4 min-w-full max-w-full whitespace-nowrap text-left text-sm text-textPrimaryColor'>
            <tbody>
              <tr>
                <th scope='col' className='p-5'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='h-4 w-4 cursor-pointer'
                    />
                  </div>
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Ngày đặt
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Thời gian
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Họ và tên
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Số điện thoại
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Dịch vụ đăng ký
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Địa điểm
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default ListSchedule
