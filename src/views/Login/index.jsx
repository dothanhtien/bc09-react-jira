import React, { useCallback } from "react";
import { Button, Tooltip, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { signin } from "../../store/actions/auth";

const Login = () => {
  const dispatch = useDispatch();

  const handleSignIn = useCallback(() => {
    dispatch(signin({ email: "dothanhtien@gmail.com", passWord: "11111111" }));
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <h1 className="text-indigo-500 text-2xl font-bold text-center my-4">
        Tailwindcss works!
      </h1>

      <Typography.Title level={3}>Antd works!</Typography.Title>
      <Button type="primary" className="mr-2" onClick={handleSignIn}>
        Test log in
      </Button>
      <Tooltip title="search" className="mr-2">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button type="primary" shape="circle" className="mr-2">
        A
      </Button>
      <Button type="primary" icon={<SearchOutlined />} className="mr-2">
        Search
      </Button>
      <Tooltip title="search" className="mr-2">
        <Button shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button icon={<SearchOutlined />} className="mr-2">
        Search
      </Button>
      <Tooltip title="search" className="mr-2">
        <Button shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button icon={<SearchOutlined />} className="mr-2">
        Search
      </Button>
      <Tooltip title="search" className="mr-2">
        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button type="dashed" icon={<SearchOutlined />}>
        Search
      </Button>
    </div>
  );
};

export default Login;
