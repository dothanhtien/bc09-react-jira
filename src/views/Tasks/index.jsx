import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import TaskListTitle from "../../components/Tasks/TaskListTitle";
import { createAction } from "../../store/actions";
import { actionType } from "../../store/actions/type";
import { fetchProjectDetail } from "../../store/actions/project";
import { updateTaskStatus } from "../../store/actions/task";
import TaskItem from "../../components/Tasks/TaskItem";

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
                                <TaskItem
                                  key={listTaskDetailItem.taskId}
                                  listTaskDetailItem={listTaskDetailItem}
                                  index={index}
                                />
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
