import React, { useEffect } from "react";
import { Breadcrumb, Button, Form, Input, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjectCategories } from "../../../store/actions/project";

const NewProject = () => {
  const dispatch = useDispatch();
  const projectCategories = useSelector(
    (state) => state.project.projectCategories
  );

  useEffect(() => {
    dispatch(fetchAllProjectCategories);
  }, [dispatch]);

  return (
    <>
      <Breadcrumb className="mt-6">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>New project</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={3}>New project</Typography.Title>

      <Form layout="vertical">
        <Form.Item
          label={
            <>
              Project name <span className="text-red-700">*</span>
            </>
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <>
              Alias <span className="text-red-700">*</span>
            </>
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={
            <>
              Project category <span className="text-red-700">*</span>
            </>
          }
        >
          <Select className="w-full">
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
          label={
            <>
              Description <span className="text-red-700">*</span>
            </>
          }
        >
          <Input.TextArea />
        </Form.Item>

        <div className="flex">
          <Link
            to="/projects"
            className="flex justify-center items-center h-8 bg-gray-300 hover:bg-gray-400 focus:bg-blue-300 text-gray-700 hover:text-gray-700 focus:text-blue-700 border-0 mr-1 font-medium py-1.5 px-3 rounded"
          >
            Cancel
          </Link>

          <Button className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0">
            Create project
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NewProject;
