import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  handleGetInfo,
  useDebounce,
  useDeleteAccount,
  useGetListUser,
} from '@/hooks/hooks'
import Search from '@/component/molecules/Search'
import images from '@/assets/images'
import Modal from '@/component/molecules/Modal'

const ListAccount = () => {
  const queryClient = useQueryClient()

  const listUserApi = useGetListUser()

  const deleteAccountApi = useDeleteAccount()

  const [checked, setChecked] = useState<string[]>([])
  const [checkedAll, setCheckedAll] = useState<string[]>([])
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (checked.length === listUserApi.data?.results.length) {
      setCheckedAll(checked)
    }
  }, [checked.length])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const handlePrefetchList = (slug: string) => {
    queryClient.prefetchQuery(['EditUserInfo', { slug: slug }], {
      queryFn: () => handleGetInfo(slug),
      staleTime: 10000,
    })
  }

  const handleCheck = (slug: string) => {
    const isChecked = checked.includes(slug)
    if (isChecked)
      setChecked((checked) => checked.filter((check) => check !== slug))
    else {
      setChecked((prev) => [...prev, slug])
    }
  }

  const handleCheckAll = () => {
    const newArr = listUserApi.data?.results.map(
      (item) => item.slug,
    ) as string[]
    if (
      (checkedAll.length && checked.length) === listUserApi.data?.results.length
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

  const handleDeleteAccount = () => {
    deleteAccountApi.mutate(checked.toString(), {
      onSuccess() {
        setModalDelete(false)
        setChecked([])
        queryClient.invalidateQueries({ queryKey: ['ListUser'] })
        toast.success('Xóa người dùng thành công!')
      },
      onError() {
        toast.error('Xóa thất bại, vui lòng kiểm tra lại!')
      },
    })
  }

  const filteredData = listUserApi.data?.results.filter((item) =>
    item.fullName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(
        debouncedSearchTerm
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      ),
  )

  return (
    <Fragment>
      <div className='mb-5 flex w-full flex-wrap items-center justify-between rounded-lg bg-white py-4 shadow lg:flex-nowrap'>
        <h1 className='ml-5 text-textHeadingColor md:text-base lg:text-xl'>
          Danh sách tài khoản
        </h1>
        <Search
          title='người dùng'
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleClearChange={handleClearChange}
        />
        <div className='ml-5 mr-5 mt-4 flex w-full flex-col items-center gap-3 lg:ml-0 lg:mt-0 lg:w-auto lg:flex-row'>
          <Link
            to={'/xac-thuc-uy-quyen'}
            className='w-full rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 md:text-sm lg:w-auto lg:text-base'
          >
            Thêm tài khoản
          </Link>
        </div>
      </div>
      <div className='relative mb-5 overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='mx-3 mb-3 flex items-center justify-center gap-4 border-b border-gray-200 sm:mx-5 sm:mb-5 lg:justify-normal'>
          <p className='rounded-md text-sm md:my-3 md:py-2 lg:my-5 lg:px-4 lg:text-base'>
            {checked.length} lượt chọn
          </p>
          <button
            className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-gray-900 md:my-3'
            onClick={handleOpenModal}
          >
            Xóa
          </button>
        </div>
        <div className='max-h-[625px] w-full overflow-x-auto overflow-y-auto'>
          <table className='mb-4 min-w-full max-w-full whitespace-nowrap text-left text-sm text-textPrimaryColor'>
            <tbody>
              <tr
                className={`border-b ${
                  listUserApi.isLoading
                    ? 'animate-pulse bg-gray-300'
                    : 'bg-white'
                }`}
              >
                <th scope='col' className='p-5'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='h-4 w-4 cursor-pointer'
                      disabled={listUserApi.isLoading ? true : false}
                      checked={
                        checkedAll.length ===
                          listUserApi.data?.results.length &&
                        checked.length === listUserApi.data?.results.length
                      }
                      onChange={handleCheckAll}
                    />
                  </div>
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Ảnh đại diện
                </th>

                <th scope='col' className='px-6 py-3 text-red-600'>
                  Họ và tên
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Vai trò
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Số điện thoại
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Trạng thái
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'></th>
              </tr>
              {!listUserApi.isLoading &&
                filteredData!.map((item, index: number) => (
                  <tr
                    className='border-b bg-white hover:bg-gray-50'
                    key={index}
                    onMouseEnter={() => handlePrefetchList(item.slug)}
                  >
                    <td className='w-4 p-5'>
                      <div className='flex items-center'>
                        <input
                          id={`checkUser-${item.slug}`}
                          checked={checked.includes(item.slug)}
                          onChange={() => handleCheck(item.slug)}
                          type='checkbox'
                          className='h-4 w-4 cursor-pointer'
                        />
                      </div>
                    </td>
                    <th scope='row' className='px-6 py-3'>
                      <figure className='flex h-[70px] w-[70px] items-center'>
                        <img
                          crossOrigin='anonymous'
                          src={item.avatar || images.avatar}
                          className='h-full w-full rounded-full '
                        />
                      </figure>
                    </th>
                    <th
                      scope='row'
                      className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
                    >
                      {item.fullName}
                    </th>
                    <td className='px-6 py-4'>{item.role}</td>
                    <td className='px-6 py-4'>{item.email}</td>
                    <td className='px-6 py-4'>{item.phone}</td>
                    <td className='px-6 py-4'>
                      <p
                        className={`font-medium ${
                          item.status ? 'text-green-500' : 'text-red-500'
                        } `}
                      >
                        {item.status ? 'Bật' : 'Tắt'}
                      </p>
                    </td>
                    <td className='w-4 p-5'>
                      <Link to={`/chinh-sua-tai-khoan/${item.slug}`}>
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
          title='Bạn muốn xóa tài khoản này?'
          description='Tài khoản bị xóa không thể khôi phục.'
          setModalDelete={setModalDelete}
          handleDelete={handleDeleteAccount}
          isLoading={deleteAccountApi.isLoading}
        />
      )}
    </Fragment>
  )
}

export default ListAccount
