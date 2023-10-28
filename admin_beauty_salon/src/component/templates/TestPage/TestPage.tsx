import { useEffect } from "react";
import { PostApi } from "@/services/api/post";

const TestPage = () => {
  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    const result = await PostApi.getPost();
  };

  return <div></div>;
};

export default TestPage;
