import { ChangeEvent, Fragment, useState } from 'react'
import { useLocation, useMatch } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Search from '@/component/molecules/Search'
import { useDeleteCategory, useGetListCategory } from '@/hooks/hooks'
import { dataContentType } from '@/utils/data'
import Modal from '@/component/molecules/Modal'
import Button from '@/component/atoms/Button'

const ListCategoryWithLevel = () => {
  const queryClient = useQueryClient()

  const { pathname } = useLocation()

  const isCategoryLevel2 = Boolean(useMatch('/danh-muc-cap-2'))

  const listCategoryApi = useGetListCategory(
    pathname.substring(pathname.length - 1),
  )

  const deleteCategoryApi = useDeleteCategory()

  const [checked, setChecked] = useState<string[]>([])
  const [checkedAll, setCheckedAll] = useState<string[]>([])
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

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
          {isCategoryLevel2 ? 'Danh mục cấp 2' : 'Danh mục cấp 1'}
        </h1>
        <Search
          title={isCategoryLevel2 ? 'danh mục cấp 2' : 'danh mục cấp 1'}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleClearChange={handleClearChange}
        />
        <Button
          to={isCategoryLevel2 ? '/tao-danh-muc-cap-2' : '/tao-danh-muc-cap-1'}
          className='rounded-md bg-primaryColor px-3 py-2 text-white hover:bg-secondColor md:text-sm lg:text-base'
        >
          Thêm danh mục
        </Button>
      </div>
      <div className='relative mb-5 overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='mx-3 mb-3 flex items-center justify-center gap-4 border-b border-gray-200 sm:mx-5 sm:mb-5 lg:justify-normal'>
          <span className='rounded-md text-sm md:my-3 md:py-2 lg:my-5 lg:px-4 lg:text-base'>
            0 lượt chọn
          </span>
          <Button
            className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-textHeadingColor md:my-3'
            onClick={handleOpenModal}
          >
            Xóa
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
                      checked={
                        checkedAll.length ===
                          listCategoryApi.data?.message.length &&
                        checked.length ===
                          listCategoryApi.data?.message.length &&
                        checked.length !== 0
                      }
                      onChange={handleCheckAll}
                    />
                  </div>
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  {isCategoryLevel2
                    ? 'Tên danh mục cấp 2'
                    : 'Tên danh mục cấp 1'}
                </th>

                <th scope='col' className='px-6 py-3 text-secondColor'>
                  {isCategoryLevel2
                    ? 'Tên danh mục cấp 3'
                    : 'Tên danh mục cấp 2'}
                </th>

                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Nội dung
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Trạng thái
                </th>
                <th></th>
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
                    className='whitespace-nowrap px-6 py-4 font-medium text-textHeadingColor'
                  >
                    {item.name}
                  </th>
                  <td className='px-6 py-4'>{item.name}</td>

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
                        item.status ? 'text-green-500' : 'text-primaryColor'
                      } `}
                    >
                      {item.status ? 'Bật' : 'Tắt'}
                    </span>
                  </td>
                  <td className='w-4 p-5'>
                    <Button
                      to={`${
                        !isCategoryLevel2
                          ? '/tao-danh-muc-cap-1'
                          : '/tao-danh-muc-cap-2'
                      }/${item.id}`}
                    >
                      <i className='ri-pencil-fill cursor-pointer rounded border border-primaryColor p-3 text-primaryColor'></i>
                    </Button>
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

export default ListCategoryWithLevel
