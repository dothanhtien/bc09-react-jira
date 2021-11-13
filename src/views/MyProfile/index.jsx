import React from "react";
import { Avatar, Button, Col, Form, Input, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { editUserSchema } from "../../services/user";
import { updateUser } from "../../store/actions/user";
import { fetchMe } from "../../store/actions/auth";

const MyProfile = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: me?.id,
      email: me?.email,
      name: me?.name,
      phoneNumber: me?.phoneNumber,
      password: "",
      passwordConfirmation: "",
    },
    validateOnMount: true,
    validationSchema: editUserSchema,
  });

  const handleSubmit = () => {
    formik.setTouched({
      email: true,
      name: true,
      phoneNumber: true,
      password: true,
      passwordConfirmation: true,
    });

    if (!formik.dirty) return;

    if (!formik.isValid) return;

    dispatch(
      updateUser(formik.values, () => {
        setTimeout(() => {
          dispatch(fetchMe);
          Swal.fire({
            title: "User updated successfully",
            icon: "success",
            showConfirmButton: false,
          });
          formik.resetForm();
        }, 400);
      })
    );
  };

  return (
    <div style={{ maxWidth: 980 }} className="mx-auto">
      <Row>
        <Col
          xs={{ span: 24 }}
          md={{ span: 8 }}
          className="mb-6 text-center md:text-left"
        >
          <Avatar
            size={{ xs: 200, sm: 200, md: 200, lg: 200, xl: 240, xxl: 260 }}
            src={me?.avatar}
            alt={me?.name}
          />
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <div className="mb-4">
            <Typography.Title level={3}>{me?.name}</Typography.Title>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label={
                <Typography.Text strong>
                  Id <span className="text-red-700">*</span>
                </Typography.Text>
              }
            >
              <Input name="id" value={formik.values.id} disabled />
            </Form.Item>

            <Form.Item
              label={
                <Typography.Text strong>
                  Email <span className="text-red-700">*</span>
                </Typography.Text>
              }
              help={formik.touched.email && formik.errors.email}
              validateStatus={
                formik.touched.email && !!formik.errors.email ? "error" : ""
              }
            >
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item
              label={
                <Typography.Text strong>
                  Name <span className="text-red-700">*</span>
                </Typography.Text>
              }
              help={formik.touched.name && formik.errors.name}
              validateStatus={
                formik.touched.name && !!formik.errors.name ? "error" : ""
              }
            >
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item
              label={<Typography.Text strong>Phone number</Typography.Text>}
              help={formik.touched.phoneNumber && formik.errors.phoneNumber}
              validateStatus={
                formik.touched.phoneNumber && !!formik.errors.phoneNumber
                  ? "error"
                  : ""
              }
            >
              <Input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item
              label={
                <Typography.Text strong>
                  Password <span className="text-red-700">*</span>
                </Typography.Text>
              }
              help={formik.touched.password && formik.errors.password}
              validateStatus={
                formik.touched.password && !!formik.errors.password
                  ? "error"
                  : ""
              }
            >
              <Input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item
              label={
                <Typography.Text strong>
                  Password confirmation <span className="text-red-700">*</span>
                </Typography.Text>
              }
              help={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
              validateStatus={
                formik.touched.passwordConfirmation &&
                !!formik.errors.passwordConfirmation
                  ? "error"
                  : ""
              }
            >
              <Input
                type="password"
                name="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Button
                htmlType="submit"
                className="bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded mr-1"
              >
                Update
              </Button>
              <Button
                onClick={() => formik.resetForm()}
                className="hover:bg-gray-200 focus:bg-gray-200 text-gray-700 hover:text-gray-700 focus:text-gray-700 font-semibold border-transparent hover:border-gray-200 focus:border-gray-200 rounded shadow-none"
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default MyProfile;
