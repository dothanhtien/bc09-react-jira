import React from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { fetchAllUsers, updateUser } from "../../../store/actions/user";
import { editUserSchema } from "../../../services/user";

const EditUserModal = ({ visible, onCancel, user }) => {
  const { userId: id, email, name, phoneNumber } = user;
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      email,
      name,
      phoneNumber,
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
        // BE store data hơi lâu nên phải setTimeout
        setTimeout(() => {
          dispatch(fetchAllUsers());
          Swal.fire({
            title: "User updated successfully",
            icon: "success",
            showConfirmButton: false,
          });
          formik.resetForm();
          onCancel();
        }, 400);
      })
    );
  };

  const handleCancel = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal
      title={<Typography.Title level={5}>Edit User</Typography.Title>}
      visible={visible}
      onCancel={onCancel}
      maskStyle={{ zIndex: 1050 }}
      maskClosable={false}
      wrapClassName="z-modal"
      className="z-modal"
      footer={null}
      centered
      destroyOnClose={true}
    >
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
            formik.touched.password && !!formik.errors.password ? "error" : ""
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
            className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
