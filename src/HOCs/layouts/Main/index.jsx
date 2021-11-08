import React from "react";
import Header from "./Header";

const MainLayout = (props) => {
  return (
    <>
      <Header />
      <main className="container pt-6">{props.children}</main>
    </>
  );
};

export default MainLayout;
