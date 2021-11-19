import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAllProjects, deleteProject } from "../../store/actions/project";

const Projects = (props) => {
  const dispatch = useDispatch();
  const tableIsBreak = useMediaQuery({ maxWidth: 624 });
  const debounceSearchRef = useRef(null);
  const projectList = useSelector((state) => state.project.projectList);

  const dataSource = projectList.map((project) => {
    return { ...project, key: project.id };
  });

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleSearch = (e) => {
    let params = {};

    if (e.target.value.length > 0) {
      params = { keyword: e.target.value };
    }

    if (debounceSearchRef.current) {
      clearTimeout(debounceSearchRef.current);
    }

    debounceSearchRef.current = setTimeout(() => {
      dispatch(fetchAllProjects(params));
    }, 400);
  };

  const showConfirmDeleteProjectModal = ({ projectName, id: projectId }) => {
    return () => {
      Modal.confirm({
        title: `Are you sure to delete\n${projectName}?`,
        okText: "Delete",
        okButtonProps: {
          className:
            "bg-red-600 hover:bg-red-500 focus:bg-red-500 text-white font-semibold hover:text-white focus:text-white border-red-600 hover:border-red-500 focus:border-red-500 rounded",
        },
        cancelButtonProps: {
          className:
            "bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded",
        },
        zIndex: 1050,
        centered: true,
        onOk: () => {
          handleDeleteProject(projectId);
        },
      });
    };
  };

  const handleDeleteProject = (projectId) => {
    dispatch(
      deleteProject(projectId, () => {
        showProjectDeletedSuccessfullyModal();
      })
    );
  };

  const showProjectDeletedSuccessfullyModal = () => {
    dispatch(fetchAllProjects());
    Swal.fire({
      title: "Project deleted successfully",
      icon: "success",
      showConfirmButton: false,
    });
  };

  return (
    <>
      <div className="mb-3 flex items-start">
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

      <div>
        <Input
          allowClear
          suffix={<SearchOutlined />}
          className="mb-6 w-48 rounded"
          onChange={handleSearch}
        />
      </div>

      {!tableIsBreak && (
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
                to={`/projects/${record.id}/board`}
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
                    <Link to={`/projects/${record.id}/edit`}>
                      Project settings
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="moveToTrash">
                    <button onClick={showConfirmDeleteProjectModal(record)}>
                      Move to trash
                    </button>
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
      )}

      {tableIsBreak && (
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={dataSource}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item className="block">
              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Project name</Typography.Text>
                </Col>
                <Col span={14}>
                  <Link
                    to={`/projects/${item.id}/board`}
                    className="text-blue-700 hover:text-blue-700 focus:text-blue-700"
                  >
                    {item.projectName}
                  </Link>
                </Col>
              </Row>

              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Category name</Typography.Text>
                </Col>
                <Col span={14}>{item.categoryName}</Col>
              </Row>

              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Creator</Typography.Text>
                </Col>
                <Col span={14}>{item.creator.name}</Col>
              </Row>

              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Members</Typography.Text>
                </Col>
                <Col span={14}>
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {item.members.map((member) => (
                      <Tooltip title={member.name} key={member.userId}>
                        <Avatar src={member.avatar} />
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </Col>
              </Row>
              <Row className="mb-1" gutter={16}>
                <Col span={10}>
                  <Typography.Text strong>Actions</Typography.Text>
                </Col>
                <Col span={14}>
                  <Link
                    to={`/projects/${item.id}/edit`}
                    className="inline-flex h-8 w-8 justify-center items-center text-base text-blue-700 hover:text-blue-600 focus:text-blue-600 mr-2"
                  >
                    <EditOutlined />
                  </Link>
                  <Button
                    className="bg-transparent hover:bg-transparent focus:bg-transparent text-red-600 hover:text-red-500 focus:text-red-500 border-0 shadow-none"
                    icon={<DeleteOutlined />}
                    onClick={showConfirmDeleteProjectModal(item)}
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default Projects;
