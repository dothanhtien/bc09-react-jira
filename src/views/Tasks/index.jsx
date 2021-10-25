import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import TaskListTitle from "../../components/Tasks/TaskListTitle";
import { createAction } from "../../store/actions";
import { actionType } from "../../store/actions/type";
import { fetchProjectDetail } from "../../store/actions/project";
import { createTask, updateTaskStatus } from "../../store/actions/task";
import TaskItem from "../../components/Tasks/TaskItem";

const Tasks = (props) => {
  const dispatch = useDispatch();
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const serverError = useSelector((state) => state.task.error);
  const [clonedProjectDetail, setClonedProjectDetail] = useState(null);
  const [showNewTaskTextarea, setShowNewTaskTextarea] = useState(false);
  const { projectId } = props.match.params;

  const formik = useFormik({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "1",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectId,
      typeId: 1,
      priorityId: 2,
    },
  });

  useEffect(() => {
    dispatch(fetchProjectDetail(projectId));

    return () => {
      dispatch(createAction(actionType.SET_PROJECT_DETAIL, null));
    };
  }, [dispatch, projectId]);

  useEffect(() => {
    setClonedProjectDetail({ ...projectDetail });
  }, [projectDetail]);

  useEffect(() => {
    if (serverError === "Task already exists!") {
      formik.setErrors({
        taskName: serverError,
        ...formik.errors,
      });
    }
    // eslint-disable-next-line
  }, [serverError]);

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

  const handleKeyDownOnNewTaskTextarea = (e) => {
    // keyCode = 27 <=> press ESC button
    if (e.keyCode === 27) {
      setShowNewTaskTextarea(false);
    }

    // keyCode = 13 <=> press ENTER button
    if (e.keyCode === 13) {
      e.preventDefault();

      if (!formik.values.taskName.trim().length) {
        return;
      }

      dispatch(
        createTask(formik.values, () => {
          formik.resetForm();
          dispatch(fetchProjectDetail(projectId));
        })
      );
    }
  };

  const handleBlurNewTaskTextarea = () => {
    setShowNewTaskTextarea(false);
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
                            <>
                              {!showNewTaskTextarea && (
                                <button
                                  onClick={() => setShowNewTaskTextarea(true)}
                                  className="h-8 hover:bg-gray-300 focus:bg-gray-300 w-full text-left font-medium mt-1 py-1 px-3 rounded duration-300"
                                >
                                  <PlusOutlined className="mr-1" />
                                  <span>Create</span>
                                </button>
                              )}
                              {showNewTaskTextarea && (
                                <>
                                  <textarea
                                    rows="2"
                                    maxLength="255"
                                    placeholder="What needs to be done?"
                                    className={`w-full p-2 mt-1 border-2 outline-none rounded resize-none${
                                      formik.errors.taskName
                                        ? " border-red-500 focus:border-red-500"
                                        : " border-blue-400 focus:border-blue-400"
                                    }`}
                                    onKeyDown={handleKeyDownOnNewTaskTextarea}
                                    autoFocus
                                    name="taskName"
                                    value={formik.values.taskName}
                                    onChange={formik.handleChange}
                                    onBlur={handleBlurNewTaskTextarea}
                                  ></textarea>
                                  {formik.errors.taskName && (
                                    <div
                                      className="text-red-500"
                                      style={{ marginTop: "-4px" }}
                                    >
                                      {formik.errors.taskName}
                                    </div>
                                  )}
                                </>
                              )}
                            </>
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
