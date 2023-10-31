import { Fragment } from 'react'

import Button from '@/component/atoms/Button'

type Props = {
  checked: string[]
  handleCheck: (check: string) => void
  isLoading: boolean
  currentItemsPost?: Pick<
    iPost,
    'title' | 'postId' | 'createdAt' | 'slug' | 'status' | 'thumbnail'
  >[]
  currentItemsProduct?: Pick<
    iProduct,
    'productId' | 'slug' | 'name' | 'thumbnail' | 'status' | 'createdAt'
  >[]
}

const Items = ({
  checked,
  handleCheck,
  isLoading,
  currentItemsPost,
  currentItemsProduct,
}: Props) => {
  return (
    <Fragment>
      {!isLoading &&
        currentItemsPost &&
        currentItemsPost?.map((item, index) => (
          <tr className='border-b bg-white hover:bg-gray-50' key={index}>
            <td className='w-4 p-5'>
              <div className='flex items-center'>
                <input
                  id='checkbox-table-search-1'
                  checked={checked.includes(item.postId)}
                  onChange={() => handleCheck(item.postId)}
                  type='checkbox'
                  className='h-4 w-4 cursor-pointer'
                />
              </div>
            </td>
            <th scope='row' className='px-6 py-3'>
              <figure className='flex h-[80px] w-[120px] items-center'>
                <img src={item.thumbnail} />
              </figure>
            </th>
            <th
              scope='row'
              className='whitespace-nowrap px-6 py-4 font-medium text-textHeadingColor'
            >
              {item.title}
            </th>
            <td className='px-6 py-4'>
              {
                new Date(item.createdAt)
                  .toLocaleDateString('en-GB')
                  .split('T')[0]
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
              <Button to={`/tao-trang-bai-viet/${item.postId}/${item.slug}`}>
                <i className='ri-pencil-fill cursor-pointer rounded border border-primaryColor p-3 text-primaryColor'></i>
              </Button>
            </td>
          </tr>
        ))}
      {!isLoading &&
        currentItemsProduct &&
        currentItemsProduct?.map((item, index) => (
          <tr className='border-b bg-white hover:bg-gray-50' key={index}>
            <td className='w-4 p-5'>
              <div className='flex items-center'>
                <input
                  id='checkbox-table-search-1'
                  checked={checked.includes(item.productId)}
                  onChange={() => handleCheck(item.productId)}
                  type='checkbox'
                  className='h-4 w-4 cursor-pointer'
                />
              </div>
            </td>
            <th scope='row' className='px-6 py-3'>
              <figure className='flex h-[80px] w-[120px] items-center'>
                <img src={item.thumbnail} />
              </figure>
            </th>
            <th
              scope='row'
              className='whitespace-nowrap px-6 py-4 font-medium text-textHeadingColor'
            >
              {item.name}
            </th>
            <td className='px-6 py-4'>
              {
                new Date(item.createdAt)
                  .toLocaleDateString('en-GB')
                  .split('T')[0]
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
              <Button to={`/tao-trang-san-pham/${item.productId}/${item.slug}`}>
                <i className='ri-pencil-fill cursor-pointer rounded border border-primaryColor p-3 text-primaryColor'></i>
              </Button>
            </td>
          </tr>
        ))}
    </Fragment>
  )
}

export default Items
