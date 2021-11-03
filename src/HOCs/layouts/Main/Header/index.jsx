import React from "react";
import {
  Avatar,
  Button,
  Menu,
  Dropdown,
  Divider,
  Tooltip,
  Typography,
} from "antd";
import { DownOutlined, PlusOutlined, SettingFilled } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as JiraLogo } from "../../../../assets/images/logos/jira_logo.svg";
import { ReactComponent as JiraTextLogo } from "../../../../assets/images/logos/jira_text_logo.svg";
import classes from "./header.module.css";
import { ACCESS_TOKEN } from "../../../../utils/constants/config";
import { useDispatch } from "react-redux";
import { createAction } from "../../../../store/actions";
import { actionType } from "../../../../store/actions/type";
import FormCreateTask from "../../../../components/Tasks/FormCreateTask";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    history.push("/login");
  };

  const projectsMenu = (
    <Menu className={classes.menu}>
      <Menu.Item key="project" className="h-10 py-2 px-5">
        <Link to="/projects">View all projects</Link>
      </Menu.Item>
      <Menu.Item key="newProject" className="h-10 py-2 px-5">
        <Link to="/projects/new">Create project</Link>
      </Menu.Item>
    </Menu>
  );

  const settingsMenu = (
    <Menu className={classes.menu}>
      <Menu.ItemGroup
        title={
          <span className="block mt-3 mb-2 px-2 font-bold text-xs text-gray-400 uppercase">
            Atlassian Admin
          </span>
        }
      >
        <Menu.Item
          key="personalSettings"
          className={`${classes["menu-item"]} h-10 py-2 px-5`}
        >
          <Link to="/users">User management</Link>
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup
        title={
          <span className="block mt-3 mb-2 px-2 font-bold text-xs text-gray-400 uppercase">
            Jira Settings
          </span>
        }
      >
        <Menu.Item
          key="profile"
          className={`${classes["menu-item"]} h-10 py-2 px-5`}
        >
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item
          key="accountSettings"
          className={`${classes["menu-item"]} h-10 py-2 px-5`}
        >
          <Link to="/projects">Issues</Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const profileMenu = (
    <Menu className={classes.menu}>
      <Menu.ItemGroup
        title={
          <span className="block mt-3 mb-2 px-2 font-bold text-xs text-gray-400 uppercase">
            Jira
          </span>
        }
      >
        <Menu.Item
          key="personalSettings"
          className={`${classes["menu-item"]} h-10 py-2 px-5`}
        >
          <Link to="/projects">Personal settings</Link>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup
        title={
          <span className="block mt-3 mb-2 px-2 font-bold text-xs text-gray-400 uppercase">
            Đỗ Thành Tiến
          </span>
        }
        className="Test"
      >
        <Menu.Item
          key="profile"
          className={`${classes["menu-item"]} h-10 py-2 px-5`}
        >
          <Link to="/projects">Profiles</Link>
        </Menu.Item>
        <Menu.Item
          key="accountSettings"
          className={`${classes["menu-item"]} h-10 py-2 px-5`}
        >
          <Link to="/projects">Account settings</Link>
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.Item key="divider" className="px-0">
        <Divider className="m-0" />
      </Menu.Item>

      <Menu.Item key="logout" className="h-10 py-2 px-5" onClick={logout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  const handleCreateTask = () => {
    let payload = {
      component: <FormCreateTask />,
      title: "Create Task",
    };
    dispatch(createAction(actionType.OPEN_FORM_IN_DRAWER_POPUP, payload));
  
  };

  return (
    <>
      <header className="h-14 bg-white shadow px-4 fixed left-0 top-0 w-full z-header">
        <div className="h-full flex justify-between items-center">
          <nav className="h-full flex items-center">
            <Link
              to="/projects"
              className="text-blue-700 font-medium py-1 px-2 hover:bg-blue-200 focus:bg-blue-200 rounded mr-1"
            >
              <JiraLogo
                className="h-6 block md:hidden"
                style={{ color: "#2684FF", fill: "#253858" }}
              />
              <JiraTextLogo
                className="h-6 hidden md:block"
                style={{ color: "#2684FF", fill: "#253858" }}
              />
            </Link>
            <div
              className={`h-full flex items-center mr-1${
                history.location.pathname.includes("/projects")
                  ? " " + classes.active
                  : ""
              }`}
            >
              <Dropdown overlay={projectsMenu} trigger={["click"]}>
                <button className="text-blue-700 h-8 font-medium py-1.5 px-2 hover:bg-blue-200 focus:bg-blue-200 rounded">
                  Projects <DownOutlined />
                </button>
              </Dropdown>
            </div>
            <Typography
              className="text-blue-700 h-8 font-medium py-1.5 px-2 hover:text-blue-400 focus:text-blue-400 cursor-pointer"
              onClick={handleCreateTask}
            >
              Create Task
            </Typography>
          </nav>
          <div className="flex items-center">
            <Dropdown
              overlay={settingsMenu}
              trigger={["click"]}
              className="mr-1"
            >
              <Tooltip title="Settings">
                <Button
                  className="border-0 shadow-none hover:bg-blue-200 focus:bg-blue-200 hover:text-blue-500 focus:text-blue-500"
                  shape="circle"
                  icon={<SettingFilled />}
                />
              </Tooltip>
            </Dropdown>
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <Tooltip
                placement="bottomRight"
                title="Your profile and settings"
              >
                <Button
                  shape="circle"
                  className="flex justify-center items-center border-0 shadow-none hover:bg-blue-200 focus:bg-blue-200 hover:text-blue-500 focus:text-blue-500"
                >
                  <Avatar
                    size={24}
                    src="https://ui-avatars.com/api/?name=Tien%20Do"
                  />
                </Button>
              </Tooltip>
            </Dropdown>
          </div>
        </div>
      </header>
      <div className="header-placehoder h-14"></div>
    </>
  );
};

export default Header;
