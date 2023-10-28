import {
  ChangeEvent,
  Fragment,
  InvalidEvent,
  KeyboardEvent,
  useState,
} from 'react'
import { useQueryClient } from 'react-query'
import { useMatch, Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  useDebounce,
  useDeletePost,
  useDeleteProduct,
  useGetListPost,
  useGetListProduct,
} from '@/hooks/hooks'
import Search from '@/component/molecules/Search'
import ItemsPaginate from '@/component/molecules/ItemsPaginate'
import Modal from '@/component/molecules/Modal'

const TableListPost = () => {
  const isTableListPosts = Boolean(useMatch('/danh-sach-bai-viet'))

  const queryClient = useQueryClient()

  const listPostApi = useGetListPost()

  const listProductApi = useGetListProduct()

  const deletePostApi = useDeletePost()

  const deleteProductApi = useDeleteProduct()

  const [checked, setChecked] = useState<string[]>([])
  const [checkedAll, setCheckedAll] = useState<string[]>([])
  const [itemOffset, setItemOffset] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(4)
  const [itemsNumber, setItemsNumber] = useState<number>(0)
  const endOffset = itemOffset + itemsPerPage
  const listPostLength =
    (isTableListPosts
      ? listPostApi.data?.results.length
      : listProductApi.data?.results.length) || 0
  const pageCount = Math.ceil(listPostLength / itemsPerPage)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [modalDelete, setModalDelete] = useState<boolean>(false)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % listPostLength
    setItemOffset(newOffset)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setItemsPerPage(itemsNumber)
    }
  }

  const handleChangeNumberPage = (event: InvalidEvent<HTMLInputElement>) => {
    setItemsNumber(Number(event.target.value))
  }

  const handleCheck = (id: string) => {
    const isChecked = checked.includes(id)
    if (isChecked)
      setChecked((checked) => checked.filter((check) => check !== id))
    else {
      setChecked((prev) => [...prev, id])
    }
  }

  const handleCheckAll = () => {
    const newArr: string[] = isTableListPosts
      ? (listPostApi.data?.results.map((item) => item.postId) as string[])
      : (listProductApi.data?.results.map((item) => item.productId) as string[])

    if (
      (checkedAll.length && checked.length) ===
      (isTableListPosts
        ? listPostApi.data?.results.length
        : listProductApi.data?.results.length)
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

  const handleDelete = () => {
    isTableListPosts
      ? deletePostApi.mutate(checked.toString(), {
          onSuccess() {
            setModalDelete(false)
            setChecked([])
            queryClient.invalidateQueries({ queryKey: ['ListPost'] })
            toast.success('Xóa bài viết thành công!')
          },
          onError() {
            toast.error('Xóa thất bại, vui lòng kiểm tra lại!')
          },
        })
      : deleteProductApi.mutate(checked.toString(), {
          onSuccess() {
            setModalDelete(false)
            setChecked([])
            queryClient.invalidateQueries({ queryKey: ['ListProduct'] })
            toast.success('Xóa sản phẩm thành công!')
          },
          onError() {
            toast.error('Xóa thất bại, vui lòng kiểm tra lại!')
          },
        })
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredDataPost = listPostApi.data?.results
    .filter((item) =>
      item.title
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
    .slice(itemOffset, endOffset) || [
    {
      slug: '',
      createdAt: '',
      postId: '',
      title: '',
      thumbnail: '',
      status: '',
      comments: [''],
    },
  ]

  const filteredDataProduct = listProductApi.data?.results
    .filter((item) =>
      item.name
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
    .slice(itemOffset, endOffset) || [
    {
      slug: '',
      createdAt: '',
      productId: '',
      name: '',
      thumbnail: '',
      status: '',
    },
  ]

  return (
    <Fragment>
      <div className='mb-5 flex w-full flex-wrap items-center justify-between rounded-lg bg-white px-5 py-4 shadow lg:flex-nowrap'>
        <h1 className='text-textHeadingColor md:text-base lg:text-xl'>
          {isTableListPosts ? 'Danh sách bài viết' : 'Danh sách sản phẩm'}
        </h1>
        <Search
          title={isTableListPosts ? 'danh sách bài viết' : 'danh sách sản phẩm'}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleClearChange={handleClearChange}
        />
        <Link
          to={isTableListPosts ? '/tao-trang-bai-viet' : '/tao-trang-san-pham'}
          className='rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 md:text-sm lg:text-base'
        >
          {isTableListPosts ? 'Thêm bài viết' : 'Thêm sản phẩm'}
        </Link>
      </div>
      <div className='relative mb-5 overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='mx-3 mb-3 flex items-center justify-center gap-4 border-b border-gray-200 sm:mx-5 sm:mb-5 lg:justify-normal'>
          <span className='rounded-md text-sm md:my-3 md:py-2 lg:my-5 lg:px-4 lg:text-base'>
            0 lượt chọn
          </span>
          <button
            className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-gray-900 md:my-3'
            onClick={handleOpenModal}
          >
            Xóa
          </button>
        </div>
        <div className='w-full overflow-x-auto'>
          <table className='mb-4 min-w-full max-w-full whitespace-nowrap text-left text-sm text-textPrimaryColor'>
            <tbody>
              <tr
                className={`border-b ${
                  listPostApi.isLoading || listProductApi.isLoading
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
                      disabled={
                        (listPostApi && listPostApi.isLoading) ||
                        (listProductApi && listProductApi.isLoading)
                          ? true
                          : false
                      }
                      checked={
                        checkedAll.length ===
                          (isTableListPosts
                            ? listPostApi.data?.results.length
                            : listProductApi.data?.results.length) &&
                        checked.length ===
                          (isTableListPosts
                            ? listPostApi.data?.results.length
                            : listProductApi.data?.results.length)
                      }
                      onChange={handleCheckAll}
                    />
                  </div>
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Hình ảnh
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Tiêu đề
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Ngày đăng
                </th>
                <th scope='col' className='px-6 py-3 text-red-600'>
                  Trạng thái đăng
                </th>
                <th></th>
              </tr>
              {isTableListPosts ? (
                <ItemsPaginate
                  currentItemsPost={filteredDataPost}
                  checked={checked}
                  handleCheck={handleCheck}
                  isLoading={listPostApi.isLoading}
                />
              ) : (
                <ItemsPaginate
                  currentItemsProduct={filteredDataProduct}
                  checked={checked}
                  handleCheck={handleCheck}
                  isLoading={listProductApi.isLoading}
                />
              )}
            </tbody>
          </table>
        </div>
        <div className='items-center justify-between px-5 sm:flex'>
          <label
            htmlFor='idItemPerPage'
            className='sm: justify-none mt-6 flex items-center justify-center gap-2 sm:mt-0 sm:py-8'
          >
            Hiển thị
            <input
              type='number'
              id='idItemPerPage'
              className='w-[55px] appearance-none rounded border border-solid border-gray-300 p-2 outline-none'
              onChange={handleChangeNumberPage}
              onKeyDown={handleKeyDown}
            />
            bài trên trang
          </label>
          <ReactPaginate
            activeClassName='flex items-center justify-center w-10 h-10 text-sm text-textPrimaryColor border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center w-14 h-12 text-red-500 shadow-xl text-base'
            breakClassName='flex items-center justify-center w-10 h-10 text-sm text-textPrimaryColor border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center'
            breakLabel={'...'}
            containerClassName='flex items-center justify-center sm:min-h-[112px] py-6 sm:py-8 list-none'
            disabledClassName='text-[#808e9b]'
            marginPagesDisplayed={2}
            nextClassName='flex items-center justify-center w-10 h-10 text-sm text-red-500 ml-2 text-3xl rounded-full hover:bg-red-50'
            nextLabel={<i className='ri-arrow-drop-right-line text-2xl'></i>}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageClassName='flex items-center justify-center w-10 h-10 text-sm text-textPrimaryColor border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center font-medium'
            pageRangeDisplayed={2}
            previousClassName='flex items-center justify-center w-10 h-10 text-sm text-red-500 mr-2 text-3xl rounded-full hover:bg-red-50'
            previousLabel={<i className='ri-arrow-drop-left-line text-2xl'></i>}
          />
        </div>
      </div>
      {modalDelete && (
        <Modal
          title={
            isTableListPosts
              ? 'Bạn muốn xóa bài viết này?'
              : 'Bạn muốn xóa sản phẩm này?'
          }
          description={
            isTableListPosts
              ? 'Bài viết bị xóa không thể khôi phục.'
              : 'Sản phẩm bị xóa không thể khôi phục.'
          }
          setModalDelete={setModalDelete}
          handleDelete={handleDelete}
          isLoading={deletePostApi.isLoading}
        />
      )}
    </Fragment>
  )
}

export default TableListPost
