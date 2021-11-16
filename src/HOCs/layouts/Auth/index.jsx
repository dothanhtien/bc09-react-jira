import React from "react";
import { Col, Row } from "antd";
import { ReactComponent as LoginPic } from "../../../assets/images/login/panel.svg";

const AuthLayout = (props) => {
  return (
    <>
      <Row>
        <Col xs={0} md={12} lg={14} style={{ backgroundColor: "#001529" }}>
          <LoginPic className="mx-auto w-8/12 h-full" />
        </Col>
        <Col xs={24} md={12} lg={10}>
          {props.children}
        </Col>
      </Row>
    </>
  );
};

export default AuthLayout;
