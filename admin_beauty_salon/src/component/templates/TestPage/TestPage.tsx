import { useEffect } from "react";
import { PostApi } from "@/services/api/post";

const TestPage = () => {
  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    const result = await PostApi.getPost();
    console.log(JSON.parse(result.results._doc.content));
  };

  return <div></div>;
};

export default TestPage;
