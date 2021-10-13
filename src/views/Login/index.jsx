import React from "react";
import { Button, Input } from "antd";
import { LockOutlined, TwitterOutlined, MailOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/actions/auth";
import { schema } from "../../services/authServices";
import { NavLink } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    validationOnMount: true,
  });
  console.log(formik.values);

  //hàm submit login
  const handleSubmit = (e) => {
    e.preventDefault();
    //9.4
    formik.setTouched({
      email: true,
      password: true,
    });

    //prevents from logging in after successful registration
    // if (!formik.isValid) {
    //   swal("Please check again!");
    //   return;
    // }

    dispatch(
      logIn(formik.values, () => {
        props.history.push("/projects");
      })
    );
  };
  return (
    // <AuthLayout>
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          {" "}
          Login CyberBugs
        </h3>

        {/* email*/}
        <div className="mt-3">
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="large"
            placeholder="email"
            style={{ minWidth: 300, borderRadius:5  }}
            prefix={<MailOutlined />}
          />
        </div>
        {formik.touched.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}

        {/* password */}
        <div className="mt-3">
          <Input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            size="large"
            placeholder="password"
            style={{ minWidth: 300, borderRadius:5 }}
            prefix={<LockOutlined />}
            
          />
        </div>
        {<p className="text-red-500">{formik.errors.password}</p>}

        {/*  login btn */}
        <Button
          htmlType="submit"
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
            borderRadius:5 
          }}
          className="mt-5"
        >
          Login
        </Button>

        <p>
          Don't have an account yet?
          <NavLink to="/register" className="text-blue-500"> Register now</NavLink>
        </p>

        {/* fb btn*/}
        <div className="social mt-3 flex">
          <Button
            style={{
              backgroundColor: "rgb(59,89,152)",
              height: 42,
              width: 42,
              marginRight: 5,
            }}
            shape="circle"
          >
            <span
              className="font-bold flex justify-center"
              style={{ color: "#fff", fontSize: 20 }}
            >
              f
            </span>
          </Button>

          {/* twitter btn */}
          <Button
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            style={{ height: 41, width: 41 }}
          ></Button>
        </div>
      </div>
    </form>
    // </AuthLayout>
  );
};

export default Login;
