import {
  ChangeEvent,
  Fragment,
  InvalidEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react'
import { useQueryClient } from 'react-query'
import { useMatch } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Search from '@/component/molecules/Search'
import ItemsPaginate from '@/component/molecules/ItemsPaginate'
import Modal from '@/component/molecules/Modal'
import Button from '@/component/atoms/Button'

import {
  useDebounce,
  useDeletePost,
  useDeleteProduct,
  useGetListPost,
  useGetListProduct,
} from '@/hooks/hooks'

const ListPostAndProduct = () => {
  const isTableListPosts = Boolean(useMatch('/danh-sach-bai-viet'))

  const queryClient = useQueryClient()

  const listPostApi = useGetListPost({
    enabled: isTableListPosts,
  })

  const listProductApi = useGetListProduct({
    enabled: !isTableListPosts,
  })

  const deletePostApi = useDeletePost()

  const deleteProductApi = useDeleteProduct()

  const [checkedPost, setCheckedPost] = useState<string[]>([])
  const [checkedAllPost, setCheckedAllPost] = useState<string[]>([])

  const [checkedProduct, setCheckedProduct] = useState<string[]>([])
  const [checkedAllProduct, setCheckedAllProduct] = useState<string[]>([])

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

  useEffect(() => {
    if (checkedPost.length === listPostApi.data?.results.length) {
      setCheckedAllPost(checkedPost)
    }
  }, [checkedPost.length])

  useEffect(() => {
    if (checkedProduct.length === listProductApi.data?.results.length) {
      setCheckedAllProduct(checkedProduct)
    }
  }, [checkedProduct.length])

  const handleCheckPost = (id: string) => {
    const isCheckedPost = checkedPost.includes(id)
    if (isCheckedPost)
      setCheckedPost((checked) => checked.filter((check) => check !== id))
    else {
      setCheckedPost((prev) => [...prev, id])
    }
  }

  const handleCheckProduct = (id: string) => {
    const isCheckedProduct = checkedProduct.includes(id)
    if (isCheckedProduct)
      setCheckedProduct((checked) => checked.filter((check) => check !== id))
    else {
      setCheckedProduct((prev) => [...prev, id])
    }
  }

  const handleCheckAllPost = () => {
    const newArr = listPostApi.data?.results.map(
      (item) => item.postId,
    ) as string[]
    if (
      (checkedAllPost.length && checkedPost.length) ===
      listPostApi.data?.results.length
    ) {
      setCheckedAllPost([])
      setCheckedPost([])
    } else {
      setCheckedAllPost(newArr)
      setCheckedPost(newArr)
    }
  }

  const handleCheckAllProduct = () => {
    const newArr = listProductApi.data?.results.map(
      (item) => item.productId,
    ) as string[]
    if (
      (checkedAllProduct.length && checkedProduct.length) ===
      listProductApi.data?.results.length
    ) {
      setCheckedAllProduct([])
      setCheckedProduct([])
    } else {
      setCheckedAllProduct(newArr)
      setCheckedProduct(newArr)
    }
  }

  const handleOpenModal = () => {
    if (isTableListPosts ? checkedPost.length > 0 : checkedProduct.length > 0) {
      setModalDelete(true)
      return
    }
  }

  const handleDelete = () => {
    isTableListPosts
      ? deletePostApi.mutate(checkedPost.toString(), {
          onSuccess() {
            setModalDelete(false)
            setCheckedPost([])
            queryClient.invalidateQueries({ queryKey: ['ListPost'] })
            toast.success('Xóa bài viết thành công!')
          },
          onError() {
            toast.error('Xóa thất bại, vui lòng kiểm tra lại!')
          },
        })
      : deleteProductApi.mutate(checkedProduct.toString(), {
          onSuccess() {
            setModalDelete(false)
            setCheckedProduct([])
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
        <Button
          to={isTableListPosts ? '/tao-trang-bai-viet' : '/tao-trang-san-pham'}
          className='rounded-md bg-primaryColor px-3 py-2 text-white hover:bg-secondColor md:text-sm lg:text-base'
        >
          {isTableListPosts ? 'Thêm bài viết' : 'Thêm sản phẩm'}
        </Button>
      </div>
      <div className='relative mb-5 overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='mx-3 mb-3 flex items-center justify-center gap-4 border-b border-gray-200 sm:mx-5 sm:mb-5 lg:justify-normal'>
          <span className='rounded-md text-sm md:my-3 md:py-2 lg:my-5 lg:px-4 lg:text-base'>
            {isTableListPosts
              ? `${checkedPost.length} lượt chọn`
              : `${checkedProduct.length} lượt chọn`}
          </span>
          <Button
            className='my-2 h-10 min-w-[70px] rounded-md border-2 border-solid px-1 py-1 text-sm text-textHeadingColor md:my-3'
            onClick={handleOpenModal}
          >
            Xóa
          </Button>
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
                        isTableListPosts
                          ? checkedAllPost.length ===
                              listPostApi.data?.results.length &&
                            checkedPost.length ===
                              listPostApi.data?.results.length &&
                            checkedPost.length !== 0
                          : checkedAllProduct.length ===
                              listProductApi.data?.results.length &&
                            checkedProduct.length ===
                              listProductApi.data?.results.length &&
                            checkedProduct.length !== 0
                      }
                      onChange={
                        isTableListPosts
                          ? handleCheckAllPost
                          : handleCheckAllProduct
                      }
                    />
                  </div>
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Hình ảnh
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Tiêu đề
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Ngày đăng
                </th>
                <th scope='col' className='px-6 py-3 text-secondColor'>
                  Trạng thái đăng
                </th>
                <th></th>
              </tr>
              {isTableListPosts ? (
                <ItemsPaginate
                  currentItemsPost={filteredDataPost}
                  checked={checkedPost}
                  handleCheck={handleCheckPost}
                  isLoading={listPostApi.isLoading}
                />
              ) : (
                <ItemsPaginate
                  currentItemsProduct={filteredDataProduct}
                  checked={checkedProduct}
                  handleCheck={handleCheckProduct}
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
            activeClassName='flex items-center justify-center w-10 h-10 text-sm text-textPrimaryColor border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center w-14 h-12 text-primaryColor shadow-xl text-base'
            breakClassName='flex items-center justify-center w-10 h-10 text-sm text-textPrimaryColor border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center'
            breakLabel={'...'}
            containerClassName='flex items-center justify-center sm:min-h-[112px] py-6 sm:py-8 list-none'
            disabledClassName='text-[#808e9b]'
            marginPagesDisplayed={2}
            nextClassName='flex items-center justify-center w-10 h-10 text-sm text-primaryColor ml-2 text-3xl rounded-full hover:bg-red-50'
            nextLabel={<i className='ri-arrow-drop-right-line text-2xl'></i>}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageClassName='flex items-center justify-center w-10 h-10 text-sm text-textPrimaryColor border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center font-medium'
            pageRangeDisplayed={2}
            previousClassName='flex items-center justify-center w-10 h-10 text-sm text-primaryColor mr-2 text-3xl rounded-full hover:bg-red-50'
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

export default ListPostAndProduct
