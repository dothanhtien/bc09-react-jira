import React, { useState, useEffect } from "react";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const AuthLayout = (props) => {
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
  }, []);

  return (
    <Layout>
      <Sider
        width={width / 2}
        style={{
          height,
          backgroundImage: `url(https://picsum.photos/${Math.round(
            width / 2
          )}/${height})`,
          backgroundSize: "100%",
          repeat: "noRepeat",
        }}
      />
      
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default AuthLayout;
