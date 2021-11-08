import React from "react";
import Header from "./Header";

const UserLayout = (props) => {
  return (
    <>
      <Header />
      <main className="container">{props.children}</main>
    </>
  );
};

export default UserLayout;
