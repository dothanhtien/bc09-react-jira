import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProjects } from "../../store/actions/project";

const Projects = (props) => {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.project.projectList);

  const dataSource = projectList.map((project) => {
    return { ...project, key: project.id };
  });

  useEffect(() => {
    dispatch(fetchAllProjects);
  }, [dispatch]);

  return (
    <>
      <div className="mt-6 mb-3 flex items-start">
        <Typography.Title level={3} className="flex-grow">
          Projects
        </Typography.Title>
        <Link
          to="/projects/new"
          className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white font-medium py-1.5 px-3 rounded cursor-pointer"
        >
          Create project
        </Link>
      </div>
      <Table dataSource={dataSource}>
        <Table.Column
          title="Id"
          dataIndex="id"
          key="id"
          sorter={(a, b) => a.id - b.id}
        />
        <Table.Column
          title="Project name"
          dataIndex="projectName"
          key="projectName"
          render={(projectName, record) => (
            <Link
              to={`/projects/${record.id}`}
              className="text-blue-700 hover:text-blue-700 focus:text-blue-700"
            >
              {projectName}
            </Link>
          )}
          sorter={(a, b) => a.projectName.localeCompare(b.projectName)}
        />
        <Table.Column
          title="Category name"
          dataIndex="categoryName"
          key="categoryName"
          sorter={(a, b) => a.categoryName.localeCompare(b.categoryName)}
        />
        <Table.Column
          title="Creator"
          key="creator"
          render={(record) => <>{record.creator.name}</>}
          sorter={(a, b) => a.creator.name.localeCompare(b.creator.name)}
        />
        <Table.Column
          title="Members"
          dataIndex="members"
          key="members"
          render={(members) => {
            return (
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              >
                {members.map((member) => (
                  <Tooltip title={member.name} key={member.userId}>
                    <Avatar src={member.avatar} />
                  </Tooltip>
                ))}
              </Avatar.Group>
            );
          }}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(record) => {
            const menu = (
              <Menu className="rounded">
                <Menu.Item key="projectSettings">
                  <button>Project settings</button>
                </Menu.Item>
                <Menu.Item key="moveToTrash">
                  <button>Move to trash</button>
                </Menu.Item>
              </Menu>
            );

            return (
              <Dropdown
                placement="bottomRight"
                overlay={menu}
                trigger={["click"]}
              >
                <Button className="flex justify-center items-center py-0 px-2 border-0 rounded shadow-none text-black hover:text-black focus:text-white bg-transparent hover:bg-gray-300 focus:bg-gray-700">
                  <EllipsisOutlined className="text-xl" />
                </Button>
              </Dropdown>
            );
          }}
        />
      </Table>
    </>
  );
};

export default Projects;
