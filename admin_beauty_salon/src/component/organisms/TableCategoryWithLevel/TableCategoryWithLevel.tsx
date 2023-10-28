import { ChangeEvent, Fragment, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import Search from '@/component/molecules/Search'

const TableCategoryWithLevel = () => {
  const TableCategorySecondary = Boolean(useMatch('/danh-muc-cap-2'))

  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  return (
    <Fragment>
      <div className='mb-5 flex w-full flex-wrap items-center justify-between rounded-lg bg-white px-5 py-4 shadow lg:flex-nowrap'>
        <h1 className='text-textHeadingColor md:text-base lg:text-xl'>
          {TableCategorySecondary ? 'Danh mục cấp 2' : 'Danh mục cấp 3'}
        </h1>
        <Search
          title={TableCategorySecondary ? 'danh mục cấp 2' : 'danh mục cấp 3'}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleClearChange={handleClearChange}
        />
        <Link
          to={
            TableCategorySecondary
              ? '/tao-danh-muc-cap-2'
              : '/tao-danh-muc-cap-3'
          }
          className='rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 md:text-sm lg:text-base'
        >
          Thêm danh mục
        </Link>
      </div>
      <div className='relative mb-5 overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='mx-3 mb-3 flex items-center justify-center gap-4 border-b border-gray-200 sm:mx-5 sm:mb-5 lg:justify-normal'>
          <span className='rounded-md text-sm md:my-3 md:py-2 lg:my-5 lg:px-4 lg:text-base'>
            0 lượt chọn
          </span>
          <button className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-gray-900 md:my-3'>
            Xóa
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
                  {TableCategorySecondary
                    ? 'Tên danh mục cấp 2'
                    : 'Tên danh mục cấp 3'}
                </th>

                <th scope='col' className='px-6 py-3 text-red-600'>
                  {TableCategorySecondary
                    ? 'Tên danh mục cấp 1'
                    : 'Tên danh mục cấp 2'}
                </th>

                <th scope='col' className='px-6 py-3 text-red-600'>
                  Nội dung
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Trạng thái
                </th>
              </tr>
              <tr className='border-b bg-white hover:bg-gray-50'>
                <td className='w-4 p-5'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-1'
                      type='checkbox'
                      className='h-4 w-4 cursor-pointer'
                    />
                  </div>
                </td>
                <th
                  scope='row'
                  className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
                >
                  Apple MacBook Pro 17"
                </th>
                <td className='px-6 py-4'>Render tên danh mục cấp 1</td>

                <td className='px-6 py-4'>Trang Landing Page</td>
                <td className='px-6 py-4'>
                  <span className='font-medium text-green-500'>Bật</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default TableCategoryWithLevel
