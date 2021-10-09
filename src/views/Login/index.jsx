import React from "react";
import { Button, Tooltip, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Login = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-indigo-500 text-2xl font-bold text-center my-4">
        Tailwindcss works!
      </h1>

      <Typography.Title level={3}>Antd works!</Typography.Title>
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
