import MainLayout from "@/component/layouts/MainLayout";
import { listComponent } from "@/helpers/listComponent";

type Props = {
  path: string;
};

const HomePage = ({ path }: Props) => {
  return <MainLayout>{listComponent[path]}</MainLayout>;
};

export default HomePage;
