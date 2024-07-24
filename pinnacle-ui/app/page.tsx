"use client";
import Navbar from "./lib/components/navigation/navbar";
import authRedirect from "./lib/hocs/authRedirect";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-5"></div>
    </>
  );
};

export default authRedirect(Home);
