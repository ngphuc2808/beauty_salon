import { ReactNode } from "react";

import Auth from "@/component/organisms/Auth";
import AddAccount from "@/component/molecules/AddAccount";
import ListAccount from "@/component/molecules/ListAccount";
import EditMyAccount from "@/component/molecules/EditMyAccount";
import EditUserAccount from "@/component/molecules/EditUserAccount";

import Navigation from "@/component/organisms/Navigation";
import DetailCategory from "@/component/molecules/DetailCategory";
import CreatePost from "@/component/molecules/CreatePost";
import Table from "@/component/molecules/Table";
import TableCategory from "@/component/molecules/Table/TableCategory";
import TableCategoryLevel from "@/component/molecules/Table/TableCategoryLevel";
import TableComment from "@/component/molecules/Table/TableComment";
import TableList from "@/component/molecules/Table/TableList";
import TableSchedule from "@/component/molecules/Table/TableSchedule";

export const listComponent: { [key: string]: ReactNode } = {
  //Auth
  authComponent: <Auth />,
  listAccount: <ListAccount />,
  addAccount: <AddAccount />,
  editUserAccount: <EditUserAccount />,
  editMyAccount: <EditMyAccount />,

  //Navigation
  navigationComponent: <Navigation />,
  detailCategory: <DetailCategory />,
  createPost: <CreatePost />,
  table: <Table />,
  tableCategoryLevel1: <TableCategory />,
  tableCategoryLevel2: (
    <TableCategoryLevel
      title="Tên danh mục cấp 2"
      childTitle="Tên danh mục cấp 1"
    />
  ),
  tableCategoryLevel3: (
    <TableCategoryLevel
      title="Tên danh mục cấp 3"
      childTitle="Tên danh mục cấp 2"
    />
  ),
  listPosts: <TableList />,
  listProducts: <TableList />,
  appointmentSchedule: <TableSchedule />,
  comments: <TableComment />,
};
