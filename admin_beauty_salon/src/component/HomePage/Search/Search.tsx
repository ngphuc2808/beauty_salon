import { useState, useRef } from "react";

import styles from "./Search.module.css";

const Search = ({ category }: iCategory) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  return (
    <div
      className={`${styles.searchArea} ${
        category === "Cat6" || category === "Cat7" ? "hidden" : ""
      }`}
    >
      <input
        className={`${styles.inputSearch}`}
        ref={inputRef}
        type="text"
        placeholder={
          category === "Cat1"
            ? "Tìm kiếm danh mục cấp 1"
            : category === "Cat2"
            ? "Tìm kiếm danh mục cấp 2"
            : category === "Cat3"
            ? "Tìm kiếm danh mục cấp 3"
            : category === "Cat4"
            ? "Tìm kiếm bài viết"
            : category === "Cat5"
            ? "Tìm kiếm sản phẩm"
            : ""
        }
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <div className="flex items-center">
        <i
          className={`ri-close-line ${styles.customIconClear} ${
            searchValue.length > 0 ? "block" : "hidden"
          }`}
          onClick={handleClear}
        ></i>
        <i
          className={`ri-loader-3-line ${styles.customIconLoading} hidden`}
        ></i>
        <span className={`${styles.separate}`}></span>
        <i className={`ri-search-line ${styles.customIconSearch}`}></i>
      </div>
    </div>
  );
};

export default Search;
