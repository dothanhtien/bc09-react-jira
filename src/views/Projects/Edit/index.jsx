import React, { useEffect, useState } from "react";
import { Breadcrumb, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjectCategories } from "../../../store/actions/project";
import { Form, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { createProjectSchema } from "../../../services/project";
import { createAction } from "../../../store/actions";
import { actionType } from "../../../store/actions/type";
import AddMembersModal from "../../../components/Projects/AddMembersModal";

const EditProject = () => {

  const dispatch = useDispatch();

  const projectInfo = useSelector((state) => state.project.projectEditInfo);
  
  const projectCategories = useSelector(
    (state) => state.project.projectCategories
  );
  const serverError = useSelector((state) => state.project.error);
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const [showAddMembersModal, setShowAddMembersModal] = useState(true);

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      id: 0,
      creator:0,
      categoryId: ""
    },
    validationSchema: createProjectSchema,
    validateOnMount: true,
    // sau khi dung formik.resetForm(), tao project lan nua ma khong nhap gi thi formik.isValid van la true
    // dung initialErrors de xu ly van de nay
    initialErrors: {
      projectName: "",
      description: "",
      id: 0,
      creator:0,
      categoryId: ""
    },
  });

  useEffect(() => {
    dispatch(fetchAllProjectCategories);

    { projectInfo && formik.setValues(projectInfo)}

  }, [dispatch]);

  useEffect(() => {
    if (serverError === "Project name already exists") {
      formik.setErrors({
        projectName: serverError,
        ...formik.errors,
      });
    }
    // eslint-disable-next-line
  }, [serverError]);

  const handleEditorChange = (newValue, editor) => {
    formik.setFieldValue("description", newValue);
  };

  const handleSubmit = () => {
    formik.setTouched({
      projectName: true,
      categoryId: true,
    });

    if (!formik.isValid) return;

    dispatch(
      // createProjectAuthorize(formik.values, () => {
        // formik.resetForm();
        // setShowAddMembersModal(true);
      // })
    );
  };

  const handleCancel = () => {
    dispatch(createAction(actionType.SET_PROJECT_DETAIL, null));
    setShowAddMembersModal(false);
  };

  return (
    <div style={{ maxWidth: 980 }} className="mx-auto">
      <Breadcrumb className="mt-6">
        <Breadcrumb.Item>
          <Link to="/projects">Projects/</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={3}>Update project</Typography.Title>

      <Form layout="vertical">
        {/* <Form layout="vertical" onFinish={handleSubmit}> */}
        <Form.Item
          label={
            <>
              Project ID <span className="text-red-700">*</span>
            </>
          }
        >
          <Input disabled value={formik.values.id}/>
        </Form.Item>
        <Form.Item
          label={
            <>
              Project name <span className="text-red-700">*</span>
            </>
          }
          // help={formik.touched.projectName && formik.errors.projectName}
          // validateStatus={
          //   formik.touched.projectName && !!formik.errors.projectName
          //     ? "error"
          //     : ""
          // }
        >
          <Input
          // name="projectName"
          value={formik.values.projectName}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <>
              Project category <span className="text-red-700">*</span>
            </>
          }
          // help={formik.touched.categoryId && formik.errors.categoryId}
          validateStatus={
            formik.touched.categoryId && !!formik.errors.categoryId
              ? "error"
              : ""
          }
        >
          <Select
            className="w-full"
            placeholder="Select a project category"
            name="categoryId"
            defaultValue={formik.values.categoryId}
            value={formik.values.categoryId}
            // onChange={(value) => formik.setFieldValue("categoryId", value)}
          >
          {projectCategories.map(({id, projectCategoryName}, i) => {
            return (
              <Select.Option key={i} value={id}>
                {projectCategoryName}
              </Select.Option>
            );
          })}
          </Select>
        </Form.Item>

        <Form.Item label="Description">
          <Editor
            apiKey="gof6u0hypfiazxgjtu3s1sr4rzde9h8k4ooeqc7q2h3t7dpn"
            init={{
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "formatselect | " +
                "bold italic underline forecolor strikethrough superscript subscript | alignleft aligncenter | " +
                "link | " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'; font-size:14px }",
            }}
            name="description"
            value={formik.values.description}
            // onEditorChange={(newValue, editor) =>
            //   handleEditorChange(newValue, editor)
            // }
          />
        </Form.Item>

        <div className="flex">
          <Link
            to="/projects"
            className="flex justify-center items-center h-8 bg-gray-300 hover:bg-gray-400 focus:bg-blue-300 text-gray-700 hover:text-gray-700 focus:text-blue-700 border-0 mr-1 font-medium py-1.5 px-3 rounded"
          >
            Cancel
          </Link>

          <Button
            htmlType="submit"
            className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
          >
            Update
          </Button>
        </div>
      </Form>
      {projectDetail && (
        <AddMembersModal
          visible={showAddMembersModal}
          onCancel={handleCancel}
          project={projectDetail}
        />
      )}
    </div>
  );
};

export default EditProject;
