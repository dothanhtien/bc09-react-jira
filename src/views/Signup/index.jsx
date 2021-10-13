import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "antd";
import { schema } from "../../services/authServices";
import swal from "sweetalert";
import { UserOutlined, LockOutlined, TwitterOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { registerService } from "../../services";

const Signup = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: schema,
    validationOnMount: true,
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    formik.setTouched({
      email: true,
      password: true,
    });
    
    if (!formik.isValid) {
      swal("Please check again!");
      return;
    }

    try {
      const res = await registerService.signUp(formik.values)
      console.log(res.data);

      swal("Successfully register!", "Please log in to continue!", "success");
      props.history.push("/login")
    } catch (err) {
      console.log({ ...err });
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          {" "}
          Register CyberBugs
        </h3>

        {/* name*/}
        <div className="mt-3">
          <Input
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="large"
            placeholder="name"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<UserOutlined />}
          />
        </div>
        {formik.touched.name && (
          <p className="text-red-500">{formik.errors.name}</p>
        )}

        {/* email*/}
        <div className="mt-3">
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="large"
            placeholder="email"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<MailOutlined />}
          />
        </div>
        {formik.touched.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}

        {/* phone */}
        <div className="mt-3">
          <Input
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="large"
            placeholder="phone number"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<PhoneOutlined />}
          />
        </div>
        {formik.touched.phoneNumber && (
          <p className="text-red-500">{formik.errors.phoneNumber}</p>
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
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<LockOutlined />}
          />
        </div>
        {<p className="text-red-500">{formik.errors.password}</p>}

        {/*  signup btn */}
        <Button
          htmlType="submit"
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
            borderRadius: 5,
          }}
          className="mt-5"
        >
          Register
        </Button>

        <p>
          Already have an account?
          <NavLink to="/login" className="text-blue-500">
            {" "}
            Login now
          </NavLink>
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

export default Signup;
