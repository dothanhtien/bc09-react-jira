import React, { useEffect, useState } from "react";
import { Avatar, Breadcrumb, Col, Row, Typography } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import TaskListTitle from "../../components/Tasks/TaskListTitle";
import TaskItemPriorityBadge from "../../components/Tasks/TaskItemPriorityBadge";
import { createAction } from "../../store/actions";
import { actionType } from "../../store/actions/type";
import { fetchProjectDetail } from "../../store/actions/project";
import { updateTaskStatus } from "../../store/actions/task";

const Tasks = (props) => {
  const dispatch = useDispatch();
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const [clonedProjectDetail, setClonedProjectDetail] = useState(null);
  const { projectId } = props.match.params;

  useEffect(() => {
    dispatch(fetchProjectDetail(projectId));

    return () => {
      dispatch(createAction(actionType.SET_PROJECT_DETAIL, null));
    };
  }, [dispatch, projectId]);

  useEffect(() => {
    setClonedProjectDetail({ ...projectDetail });
  }, [projectDetail]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const clonedProject = { ...projectDetail };

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const draggedItem = {
      ...clonedProject.lstTask[source.droppableId - 1].lstTaskDeTail[
        source.index
      ],
    };

    clonedProject.lstTask[source.droppableId - 1].lstTaskDeTail.splice(
      source.index,
      1
    );

    clonedProject.lstTask[destination.droppableId - 1].lstTaskDeTail.splice(
      destination.index,
      0,
      draggedItem
    );

    setClonedProjectDetail(clonedProject);

    dispatch(
      updateTaskStatus(
        {
          taskId: draggableId,
          statusId: destination.droppableId,
        },
        () => dispatch(fetchProjectDetail(projectId))
      )
    );
  };

  return (
    <>
      <Breadcrumb className="mt-6">
        <Breadcrumb.Item>
          <Link to="/projects">Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{clonedProjectDetail?.projectName}</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={3}>Board</Typography.Title>

      <Row gutter={16}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {clonedProjectDetail?.lstTask?.map((listTaskItem) => {
            return (
              <Col span={6} key={listTaskItem.statusId}>
                <div className="bg-gray-100 w-full h-full p-2 rounded flex flex-col">
                  <TaskListTitle title={listTaskItem.statusName} />

                  <Droppable droppableId={listTaskItem.statusId}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex-grow"
                        >
                          {listTaskItem.lstTaskDeTail.map(
                            (listTaskDetailItem, index) => {
                              return (
                                <Draggable
                                  draggableId={listTaskDetailItem.taskId.toString()}
                                  key={listTaskDetailItem.taskId}
                                  index={index}
                                >
                                  {(provided) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="w-full bg-white rounded py-3 px-2 mb-1 shadow"
                                      >
                                        <Row>
                                          <Col span={18}>
                                            {listTaskDetailItem.taskName && (
                                              <div className="mb-1">
                                                {listTaskDetailItem.taskName}
                                              </div>
                                            )}
                                            {!listTaskDetailItem.taskName && (
                                              <div className="mb-1 text-gray-400">
                                                Unnamed
                                              </div>
                                            )}

                                            <TaskItemPriorityBadge
                                              priorityTask={
                                                listTaskDetailItem.priorityTask
                                              }
                                            />
                                          </Col>
                                          <Col span={6}>
                                            <div className="h-full w-full flex justify-end items-end">
                                              <Avatar
                                                size="small"
                                                icon={<UserOutlined />}
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            }
                          )}

                          {provided.placeholder}

                          {listTaskItem.statusName === "BACKLOG" && (
                            <button className="h-8 hover:bg-gray-300 focus:bg-gray-300 w-full text-left font-medium py-1 px-3 rounded duration-300">
                              <PlusOutlined className="mr-1" />
                              <span>Create</span>
                            </button>
                          )}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </Col>
            );
          })}
        </DragDropContext>
      </Row>
    </>
  );
};

export default Tasks;
