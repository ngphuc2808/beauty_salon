import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useDeleteCategory, useGetListCategory } from '@/hooks/hooks'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { dataContentType } from '@/utils/data'
import Search from '@/component/molecules/Search'
import Modal from '@/component/molecules/Modal'

const TableCategory = () => {
  const queryClient = useQueryClient()

  const listCategoryApi = useGetListCategory('3')

  const deleteCategoryApi = useDeleteCategory()

  const [checked, setChecked] = useState<string[]>([])
  const [checkedAll, setCheckedAll] = useState<string[]>([])
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (checked.length === listCategoryApi.data?.message.length) {
      setCheckedAll(checked)
    }
  }, [checked.length])

  const handleCheck = (id: string) => {
    const isChecked = checked.includes(id)
    if (isChecked)
      setChecked((checked) => checked.filter((check) => check !== id))
    else {
      setChecked((prev) => [...prev, id])
    }
  }

  const handleCheckAll = () => {
    const newArr = listCategoryApi.data?.message.map(
      (item) => item.id,
    ) as string[]
    if (
      (checkedAll.length && checked.length) ===
      listCategoryApi.data?.message.length
    ) {
      setCheckedAll([])
      setChecked([])
    } else {
      setCheckedAll(newArr)
      setChecked(newArr)
    }
  }

  const handleOpenModal = () => {
    if (checked.length > 0) {
      setModalDelete(true)
      return
    }
  }

  const handleDeleteCategory = () => {
    deleteCategoryApi.mutate(checked.toString(), {
      onSuccess() {
        setModalDelete(false)
        setChecked([])
        queryClient.invalidateQueries({ queryKey: ['ListCategory'] })
        toast.success('Xóa người dùng thành công!')
      },
      onError() {
        toast.error('Xóa thất bại, vui lòng kiểm tra lại!')
      },
    })
  }

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
          Danh mục cấp 3
        </h1>
        <Search
          title='danh mục cấp 1'
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleClearChange={handleClearChange}
        />
        <Link
          to={'/tao-danh-muc-cap-3'}
          className='rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 md:text-sm lg:text-base'
        >
          Thêm danh mục
        </Link>
      </div>
      <div className='relative mb-5 overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='mx-3 mb-3 flex items-center justify-center gap-4 border-b border-gray-200 sm:mx-5 sm:mb-5 lg:justify-normal'>
          <span className='rounded-md text-sm md:my-3 md:py-2 lg:my-5 lg:px-4 lg:text-base'>
            {checked.length} lượt chọn
          </span>
          <button
            className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-gray-900 md:my-3'
            onClick={handleOpenModal}
          >
            Xóa
          </button>
        </div>
        <div className='max-h-[626px] w-full overflow-x-auto overflow-y-auto'>
          <table className='mb-4 min-w-full max-w-full whitespace-nowrap text-left text-sm text-textPrimaryColor'>
            <tbody>
              <tr className='border-b bg-white hover:bg-gray-50'>
                <th scope='col' className='p-5'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='h-4 w-4 cursor-pointer'
                      checked={
                        checkedAll.length ===
                          listCategoryApi.data?.message.length &&
                        checked.length === listCategoryApi.data?.message.length
                      }
                      onChange={handleCheckAll}
                    />
                  </div>
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Tên danh mục cấp 3
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Nội dung
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Trạng thái
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'></th>
              </tr>

              {listCategoryApi.data?.message.map((item, index) => (
                <tr className='border-b bg-white hover:bg-gray-50' key={index}>
                  <td className='w-4 p-5'>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        className='h-4 w-4 cursor-pointer'
                        id={`checkbox-table-${item.id}`}
                        checked={checked.includes(item.id)}
                        onChange={() => handleCheck(item.id)}
                      />
                    </div>
                  </td>
                  <th
                    scope='row'
                    className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
                  >
                    {item.name}
                  </th>
                  <td className='px-6 py-4'>
                    {
                      dataContentType.find(
                        (value) => value.name === item.contentType,
                      )?.content
                    }
                  </td>

                  <td className='px-6 py-4'>
                    <span
                      className={`font-medium ${
                        item.status ? 'text-green-500' : 'text-red-500'
                      } `}
                    >
                      {item.status ? 'Bật' : 'Tắt'}
                    </span>
                  </td>

                  <td className='w-4 p-5'>
                    <Link to={`/tao-danh-muc-cap-3/${item.id}`}>
                      <i className='ri-pencil-fill cursor-pointer rounded border border-red-500 p-3 text-red-500'></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalDelete && (
        <Modal
          title='Bạn muốn xóa danh mục này?'
          description='Danh mục bị xóa không thể khôi phục.'
          setModalDelete={setModalDelete}
          handleDelete={handleDeleteCategory}
          isLoading={deleteCategoryApi.isLoading}
        />
      )}
    </Fragment>
  )
}

export default TableCategory
