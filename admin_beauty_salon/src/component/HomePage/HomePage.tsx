import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    SetIsLoggedIn(true);
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to={"/login"} />;
  else return <div>Home Page!</div>;
};

export default HomePage;
