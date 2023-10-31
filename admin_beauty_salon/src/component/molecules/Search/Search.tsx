import { useRef, ChangeEvent } from 'react'

interface Props {
  title: string
  isAuth?: boolean
  searchTerm: string
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleClearChange: () => void
}

const Search = ({
  title,
  searchTerm,
  handleSearchChange,
  handleClearChange,
}: Props) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <div
      className={`order-3 mt-4 flex h-[35px] w-full basis-full items-center 
      justify-between overflow-hidden rounded bg-[#f1f2f3] md:w-[223px] lg:order-none lg:mt-0 lg:w-[400px] lg:basis-inherit`}
    >
      <input
        className='h-full flex-1 bg-transparent pl-3 text-sm text-textPrimaryColor outline-none'
        ref={inputRef}
        type='text'
        placeholder={`Tìm kiếm ${title}`}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className='flex items-center'>
        <i
          className={`ri-close-line cursor-pointer px-3 py-[5px] hover:text-secondColor ${
            searchTerm.length > 0 ? 'block' : 'hidden'
          }`}
          onClick={() => {
            handleClearChange()
            inputRef.current.focus()
          }}
        ></i>
        <span className='h-5 w-px bg-[#cecece]'></span>
        <i className='ri-search-line cursor-pointer px-3 py-[5px] hover:text-secondColor'></i>
      </div>
    </div>
  )
}

export default Search
