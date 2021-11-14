import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link
          to="/projects"
          className="inline-block h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white font-medium py-1.5 px-3 rounded duration-300 cursor-pointer"
        >
          Back to Home
        </Link>
      }
    />
  );
};

export default PageNotFound;
