import MainPage from '@/component/pages/MainPage'
import { listComponent } from '@/helpers/listComponent'

type Props = {
  path: string
}

const HomePage = ({ path }: Props) => {
  return <MainPage>{listComponent[path]}</MainPage>
}

export default HomePage
