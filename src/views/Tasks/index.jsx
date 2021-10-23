import React, { useEffect } from "react";
import { Avatar, Breadcrumb, Col, Row, Typography } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectDetail } from "../../store/actions/project";
import TaskListTitle from "../../components/Tasks/TaskListTitle";
import TaskItemPriorityBadge from "../../components/Tasks/TaskItemPriorityBadge";

const Tasks = (props) => {
  const dispatch = useDispatch();
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const { projectId } = props.match.params;

  useEffect(() => {
    dispatch(fetchProjectDetail(projectId));
  }, [dispatch, projectId]);

  return (
    <>
      <Breadcrumb className="mt-6">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{projectDetail?.projectName}</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={3}>Board</Typography.Title>

      <Row gutter={16}>
        {projectDetail?.lstTask.map((listTaskItem) => {
          return (
            <Col span={6} key={listTaskItem.statusId}>
              <div className="bg-gray-100 w-full h-full p-2 rounded">
                <TaskListTitle title={listTaskItem.statusName} />

                {listTaskItem.lstTaskDeTail &&
                  listTaskItem.lstTaskDeTail.map((listTaskDetailItem) => {
                    return (
                      <div
                        key={listTaskDetailItem.taskId}
                        className="w-full bg-white rounded p-2 mb-1 shadow"
                      >
                        <Row>
                          <Col span={18}>
                            {listTaskDetailItem.taskName && (
                              <div className="mb-1">
                                {listTaskDetailItem.taskName}
                              </div>
                            )}
                            {!listTaskDetailItem.taskName && (
                              <div className="mb-1 text-gray-400">Unnamed</div>
                            )}

                            <TaskItemPriorityBadge
                              priorityTask={listTaskDetailItem.priorityTask}
                            />
                          </Col>
                          <Col span={6}>
                            <div className="h-full w-full flex justify-end items-end">
                              <Avatar size="small" icon={<UserOutlined />} />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}

                {listTaskItem.statusName === "BACKLOG" && (
                  <button className="h-8 hover:bg-gray-300 focus:bg-gray-300 w-full text-left font-medium py-1 px-3 rounded duration-300">
                    <PlusOutlined className="mr-1" />
                    <span>Create</span>
                  </button>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Tasks;
