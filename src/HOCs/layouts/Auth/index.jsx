import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ReactComponent as LoginPic } from "../../../assets/images/login/panel.svg";

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
          backgroundSize: "100%",
          repeat: "noRepeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginPic
          style={{
            height,
            width: `${Math.round(width / 3)}`,
          }}
        />
      </Sider>

      <Content style={{
            height,
            width: `${Math.round(width / 3)}`,
          }} >{props.children}</Content>
    </Layout>
  );
};

export default AuthLayout;
