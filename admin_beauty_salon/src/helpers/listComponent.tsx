import { ReactNode } from 'react'

import AddAccount from '@/component/organisms/AddAccount'
import ListAccount from '@/component/organisms/ListAccount'
import EditMyAccount from '@/component/organisms/EditMyAccount'
import EditUserAccount from '@/component/organisms/EditUserAccount'

import CreateCategory from '@/component/organisms/CreateCategory'
import CreatePost from '@/component/organisms/CreatePost'

import ListComment from '@/component/organisms/ListComment'
import ListPostAndProduct from '@/component/organisms/ListPostAndProduct'
import ListCategory from '@/component/organisms/ListCategory'
import ListSchedule from '@/component/organisms/ListSchedule'

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
  listCategory: <ListCategory />,
  listPostAndProduct: <ListPostAndProduct />,
  listSchedule: <ListSchedule />,
  listComment: <ListComment />,
}
