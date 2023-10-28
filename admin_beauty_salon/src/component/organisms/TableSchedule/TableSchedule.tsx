import { Fragment } from 'react'

const TableSchedule = () => {
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
          <button className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-gray-900 md:my-3'>
            Xóa
          </button>
          <button className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-gray-900 md:my-3'>
            Bật
          </button>
          <button className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-gray-900 md:my-3'>
            Tắt
          </button>
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

                <th scope='col' className='px-6 py-3 text-red-600'>
                  Ngày đặt
                </th>

                <th scope='col' className='px-6 py-3 text-red-600'>
                  Thời gian
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Họ và tên
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Số điện thoại
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Dịch vụ đăng ký
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Địa điểm
                </th>
              </tr>
              <tr className='cursor-pointer border-b bg-white hover:bg-gray-50'>
                <td className='w-4 p-5'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-1'
                      type='checkbox'
                      className='h-4 w-4 cursor-pointer'
                    />
                  </div>
                </td>

                <td className='px-6 py-4'>10/10/2010</td>
                <td className='px-6 py-4'>8:00</td>
                <td className='px-6 py-4'>Nguyễn Hoàng Phúc</td>
                <td className='px-6 py-4'>0901234567</td>
                <td className='px-6 py-4'>Trắng da</td>
                <td className='px-6 py-4'>HCM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default TableSchedule
