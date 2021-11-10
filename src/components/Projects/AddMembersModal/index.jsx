import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Row,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  assignUserToProject,
  fetchUsersByProject,
  removeUserFromProject,
} from "../../../store/actions/project";
import { fetchAllUsers } from "../../../store/actions/user";

const AddMembersModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projectMembers = useSelector((state) => state.project.projectMembers);
  const userList = useSelector((state) => state.user.userList);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUsersByProject(props.project.id));
    dispatch(fetchAllUsers());
  }, [dispatch, props.project.id]);

  useEffect(() => {
    const clonedUsers = [...userList];

    // remove members from user list
    for (const member of projectMembers) {
      const index = clonedUsers.findIndex((item) => {
        return item.userId === member.userId;
      });

      clonedUsers.splice(index, 1);
    }

    usersRef.current = [...clonedUsers];

    if (!searchRef.current) {
      setFilteredUsers([...clonedUsers]);
    } else {
      handleSearchUsers();
    }
  }, [projectMembers, userList]);

  const addMemberToProject = (userId) => () => {
    const data = { projectId: props.project.id, userId };
    dispatch(
      assignUserToProject(data, () => {
        dispatch(fetchUsersByProject(props.project.id));
      })
    );
  };

  const removeMemberFromProject = (userId) => () => {
    const data = { projectId: props.project.id, userId };
    dispatch(
      removeUserFromProject(data, () => {
        dispatch(fetchUsersByProject(props.project.id));
      })
    );
  };

  const handleGoToProjectsButtonClick = () => {
    props.onCancel();
    history.push("/projects");
  };

  const handleSearchUsers = (e) => {
    const value = searchRef.current.input.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const clonedUsers = [...usersRef.current];

    let foundUsers = [];

    for (const i in clonedUsers) {
      if (
        clonedUsers[i].name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(value)
      ) {
        foundUsers.push(clonedUsers[i]);
      }
    }

    setFilteredUsers([...foundUsers]);
  };

  return (
    <Modal
      title={
        <Typography.Title level={4} className="mb-0">
          Add members to project{" "}
          <span className="text-blue-700">{props.project.projectName}</span>
        </Typography.Title>
      }
      visible={props.visible}
      maskStyle={{ zIndex: 1050 }}
      wrapClassName="z-modal"
      className="z-modal"
      centered
      width={980}
      onCancel={props.onCancel}
      maskClosable={false}
      footer={[
        <Button
          key="projects"
          onClick={handleGoToProjectsButtonClick}
          className="h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
        >
          Go to projects
        </Button>,
        <Button
          key="newProject"
          onClick={props.onCancel}
          className="h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
        >
          Create new project
        </Button>,
      ]}
    >
      <Row gutter={36}>
        <Col span={24}>
          <Form className="mt-6">
            <Form.Item
              label="Search users"
              colon={false}
              className="pl-6 pr-6"
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Input
                allowClear
                suffix={<SearchOutlined />}
                className="w-48 rounded"
                onChange={handleSearchUsers}
                ref={searchRef}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Typography.Title level={5} className="pl-6">
            Not yet added
          </Typography.Title>
          <List
            style={{
              height: 350,
              overflow: "auto",
              padding: "8px 24px",
            }}
            itemLayout="horizontal"
            dataSource={filteredUsers}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={
                    <div className="text-xs">User ID: {item.userId}</div>
                  }
                />
                <div>
                  <Button
                    onClick={addMemberToProject(item.userId)}
                    className="flex justify-center items-center h-8 bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                  >
                    Add
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={5} className="pl-6">
            Already in project
          </Typography.Title>
          <List
            style={{
              height: 350,
              overflow: "auto",
              padding: "8px 24px",
            }}
            itemLayout="horizontal"
            dataSource={projectMembers}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={
                    <div className="text-xs">User ID: {item.userId}</div>
                  }
                />
                <div>
                  <Button
                    onClick={removeMemberFromProject(item.userId)}
                    className="flex justify-center items-center h-8 bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white hover:text-white focus:text-white font-medium py-1.5 px-3 rounded border-0"
                  >
                    Remove
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddMembersModal;
