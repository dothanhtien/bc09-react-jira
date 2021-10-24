import React from "react";
import { Avatar, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import TaskItemPriorityBadge from "../TaskItemPriorityBadge";

const TaskItem = ({ listTaskDetailItem, index }) => {
  return (
    <Draggable draggableId={listTaskDetailItem.taskId.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full bg-white rounded py-3 px-2 mt-1 shadow"
          >
            <Row>
              <Col span={18}>
                {listTaskDetailItem.taskName && (
                  <div className="mb-1">{listTaskDetailItem.taskName}</div>
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
      }}
    </Draggable>
  );
};

export default TaskItem;
