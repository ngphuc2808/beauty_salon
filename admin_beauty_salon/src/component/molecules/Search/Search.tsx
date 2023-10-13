import { useState, useRef } from "react";

import { dataNavigation } from "@/utils/data";

const Search = ({ category }: iCategory) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  return (
    <div
      className={`w-full md:w-[223px] lg:w-[400px] h-[35px] bg-[#f1f2f3] rounded flex 
      items-center justify-between overflow-hidden order-3 lg:order-none mt-4 lg:mt-0 mx-5 lg:mx-0 basis-full lg:basis-inherit ${
        category === "Cat6" || category === "Cat7" ? "hidden" : ""
      }`}
    >
      <input
        className="flex-1 h-full outline-none bg-transparent pl-3 text-textPrimaryColor text-sm"
        ref={inputRef}
        type="text"
        placeholder={`Tìm kiếm ${dataNavigation
          .find((item) => item.id === category)
          ?.name.toLowerCase()}`}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <div className="flex items-center">
        <i
          className={`ri-close-line py-[5px] px-3 hover:text-red-500 cursor-pointer ${
            searchValue.length > 0 ? "block" : "hidden"
          }`}
          onClick={handleClear}
        ></i>
        <i className="ri-loader-3-line py-[5px] px-3 animate-spin hidden"></i>
        <span className="w-px h-5 bg-[#cecece]"></span>
        <i className="ri-search-line py-[5px] px-3 hover:text-red-500 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default Search;
