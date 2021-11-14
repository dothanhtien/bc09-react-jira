import React, { useEffect } from "react";
import { Breadcrumb, Button, Form, Input, Select, Typography } from "antd";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import TinyMCEEditor from "../../../components/UI/Input/TinyMCEEditor";
import {
  fetchAllProjectCategories,
  fetchProjectDetail,
  updateProject,
} from "../../../store/actions/project";
import { createProjectSchema } from "../../../services/project";
import PageNotFound from "../../PageNotFound";

const EditProject = (props) => {
  const projectId = props.match.params.id;
  const dispatch = useDispatch();
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const projectCategories = useSelector(
    (state) => state.project.projectCategories
  );
  const projectError = useSelector((state) => state.project.error);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      id: 0,
      creator: 0,
      categoryId: "",
    },
    validationSchema: createProjectSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    dispatch(fetchAllProjectCategories);
    dispatch(fetchProjectDetail(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    formik.setValues({
      ...projectDetail,
      creator: projectDetail?.creator.id,
      categoryId: projectDetail?.projectCategory.id,
    });
    // eslint-disable-next-line
  }, [projectDetail]);

  const handleUpdateProject = () => {
    formik.setTouched({
      projectName: true,
      categoryId: true,
    });

    if (!formik.dirty) return;

    if (!formik.isValid) return;

    dispatch(
      updateProject(formik.values, () => {
        dispatch(fetchProjectDetail(projectId));
        Swal.fire({
          title: "Project updated successfully",
          icon: "success",
          showConfirmButton: false,
        });
      })
    );
  };

  // check if the project no longers exist
  if (projectError && projectError === "Project is not found") {
    return <PageNotFound />;
  }

  return (
    <div style={{ maxWidth: 980 }} className="mx-auto">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/projects/${projectId}/board`}>
            {projectDetail?.projectName}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Project settings</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        <Typography.Title level={3}>Update project</Typography.Title>
      </div>

      <Form layout="vertical" onFinish={handleUpdateProject}>
        <Form.Item
          label={
            <Typography.Text strong>
              Project ID <span className="text-red-700">*</span>
            </Typography.Text>
          }
        >
          <Input disabled value={formik.values?.id} />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text strong>
              Project name <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.projectName && formik.errors.projectName}
          validateStatus={
            formik.touched.projectName && !!formik.errors.projectName
              ? "error"
              : ""
          }
        >
          <Input
            name="projectName"
            value={formik.values?.projectName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text strong>
              Project category <span className="text-red-700">*</span>
            </Typography.Text>
          }
          help={formik.touched.categoryId && formik.errors.categoryId}
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
            value={formik.values?.categoryId}
            onChange={(value) => formik.setFieldValue("categoryId", value)}
          >
            {projectCategories.map(({ id, projectCategoryName }) => {
              return (
                <Select.Option key={id} value={id}>
                  {projectCategoryName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label={<Typography.Text strong>Description</Typography.Text>}
          style={{ minHeight: 230 }}
        >
          <TinyMCEEditor
            name="description"
            value={formik.values?.description}
            onEditorChange={(value) =>
              formik.setFieldValue("description", value)
            }
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
    </div>
  );
};

export default EditProject;
