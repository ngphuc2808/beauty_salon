import { useState, useRef } from "react";

import styles from "./Search.module.css";
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
      className={`${styles.searchArea} ${
        category === "Cat6" || category === "Cat7" ? "hidden" : ""
      }`}
    >
      <input
        className={`${styles.inputSearch}`}
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
