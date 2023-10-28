import { ReactNode } from "react";

import AddAccount from "@/component/organisms/AddAccount";
import ListAccount from "@/component/organisms/ListAccount";
import EditMyAccount from "@/component/organisms/EditMyAccount";
import EditUserAccount from "@/component/organisms/EditUserAccount";

import CreateCategory from "@/component/organisms/CreateCategory";
import CreatePost from "@/component/organisms/CreatePost";

import TableCategoryWithLevel from "@/component/organisms/TableCategoryWithLevel";
import TableComments from "@/component/organisms/TableComments";
import TableListPost from "@/component/organisms/TableListPost";
import TableCategory from "@/component/organisms/TableCategory";
import TableSchedule from "@/component/organisms/TableSchedule";

export const listComponent: { [key: string]: ReactNode } = {
  //Auth
  listAccount: <ListAccount />,
  addAccount: <AddAccount />,

  //Edit
  editUserAccount: <EditUserAccount />,
  editMyAccount: <EditMyAccount />,

  //Navigation
  createCategory: <CreateCategory />,
  createPost: <CreatePost />,
  tableCategory: <TableCategory />,
  tableCategoryWithLevel: <TableCategoryWithLevel />,
  tableListPost: <TableListPost />,
  tableSchedule: <TableSchedule />,
  tableComments: <TableComments />,
};
