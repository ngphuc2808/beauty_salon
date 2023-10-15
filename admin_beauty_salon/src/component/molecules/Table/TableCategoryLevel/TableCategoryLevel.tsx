const TableCategoryLevel = ({ title, childTitle }: TitleCategoryType) => {
  return (
    <div className="w-full max-h-[626px] overflow-y-auto overflow-x-auto">
      <table className="mb-4 min-w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500">
        <tbody>
          <tr>
            <th scope="col" className="p-5">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-red-600">
              {title}
            </th>

            <th scope="col" className="px-6 py-3 text-red-600">
              {childTitle}
            </th>

            <th scope="col" className="px-6 py-3 text-red-600">
              Nội dung
            </th>
            <th scope="col" className="px-6 py-3 text-red-600">
              Trạng thái
            </th>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="w-4 p-5">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Render tên danh mục cấp 1</td>

            <td className="px-6 py-4">Trang Landing Page</td>
            <td className="px-6 py-4">
              <span className="font-medium text-green-500">Bật</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableCategoryLevel;
