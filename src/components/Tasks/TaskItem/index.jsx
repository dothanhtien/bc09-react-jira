import React from "react";
import { Avatar, Col, Row, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import TaskItemPriorityBadge from "../TaskItemPriorityBadge";
import { ReactComponent as NewTaskIcon } from "../../../assets/images/icons/new_task.svg";
import { ReactComponent as BugIcon } from "../../../assets/images/icons/bug.svg";

const TaskItem = ({ listTaskDetailItem, index, onClick }) => {
  return (
    <Draggable draggableId={listTaskDetailItem.taskId.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full bg-white rounded py-3 px-2 mt-1 shadow"
            onClick={onClick}
          >
            <Row>
              <Col span={18}>
                {listTaskDetailItem.taskName && (
                  <div className="mb-2">{listTaskDetailItem.taskName}</div>
                )}
                {!listTaskDetailItem.taskName && (
                  <div className="mb-2 text-gray-400">Unnamed</div>
                )}

                <div className="flex justify-start items-center">
                  <Tooltip
                    title={
                      listTaskDetailItem.taskTypeDetail.taskType
                        .charAt(0)
                        .toUpperCase() +
                      listTaskDetailItem.taskTypeDetail.taskType.slice(1)
                    }
                    placement="bottom"
                  >
                    {listTaskDetailItem.taskTypeDetail.id === 1 && (
                      <BugIcon className="mr-1" />
                    )}
                    {listTaskDetailItem.taskTypeDetail.id === 2 && (
                      <NewTaskIcon className="mr-1" />
                    )}
                  </Tooltip>

                  <TaskItemPriorityBadge
                    priorityTask={listTaskDetailItem.priorityTask}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="h-full w-full flex justify-end items-end">
                  {!listTaskDetailItem.assigness.length && (
                    <Tooltip title="Unassigned" placement="top">
                      <Avatar size="small" icon={<UserOutlined />} />
                    </Tooltip>
                  )}
                  {listTaskDetailItem.assigness && (
                    <Avatar.Group size="small" maxCount={2}>
                      {listTaskDetailItem.assigness.map((assignee) => {
                        return (
                          <Tooltip
                            key={assignee.id}
                            title={assignee.name}
                            placement="top"
                          >
                            <Avatar src={assignee.avatar} />
                          </Tooltip>
                        );
                      })}
                    </Avatar.Group>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskItem;
