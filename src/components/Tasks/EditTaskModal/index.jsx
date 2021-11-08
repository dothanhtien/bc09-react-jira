import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import {
  Avatar,
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTaskTypes,
  fetchTaskDetail,
  removeTask,
  updateDescription,
  updateEstimate,
  updatePriority,
  updateTask,
  updateTaskStatus,
} from "../../../store/actions/task";
import { fetchProjectDetail } from "../../../store/actions/project";
import TinyMCEEditor from "../../UI/Input/TinyMCEEditor";
import { ReactComponent as HighPriorityIcon } from "../../../assets/images/icons/priorities/high.svg";
import { ReactComponent as MediumPriorityIcon } from "../../../assets/images/icons/priorities/medium.svg";
import { ReactComponent as LowPriorityIcon } from "../../../assets/images/icons/priorities/low.svg";
import { ReactComponent as LowestPriorityIcon } from "../../../assets/images/icons/priorities/lowest.svg";
import TimeTrackingModal from "../TimeTrackingModal";
import TimeTrackingIndicator from "../TimeTrackingIndicator";
import NewComment from "../../Comments/NewComment";
import CommentItem from "../../Comments/CommentItem";
import { ReactComponent as BugIcon } from "../../../assets/images/icons/bug.svg";
import { ReactComponent as NewTaskIcon } from "../../../assets/images/icons/new_task.svg";
import { ReactComponent as ExclamationIcon } from "../../../assets/images/icons/exclamation.svg";

const EditTaskModal = (props) => {
  const { projectId, taskId } = props.task;
  const dispatch = useDispatch();
  const taskTypes = useSelector((state) => state.task.taskTypes);
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const taskDetail = useSelector((state) => state.task.taskDetail);
  const prevValues = useRef(null);
  const taskNameInputRef = useRef(null);
  const estimateInputRef = useRef(null);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showTaskNameInput, setShowTaskNameInput] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showEstimateInput, setShowEstimateInput] = useState(false);
  const [showTimeTrackingModal, setShowTimeTrackingModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      taskName: "",
      listUserAsign: [],
      originalEstimate: 0,
    },
  });

  useEffect(() => {
    dispatch(fetchAllTaskTypes);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTaskDetail(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    formik.setValues({
      ...taskDetail,
      listUserAsign: taskDetail
        ? [...taskDetail.assigness.map((assignee) => assignee.id)]
        : [],
    });
    // eslint-disable-next-line
  }, [taskDetail]);

  const handleChangeType = (value) => {
    formik.setFieldValue("typeId", value);

    const data = {
      ...formik.values,
      typeId: value,
    };

    dispatch(
      updateTask(data, () => {
        // update Edit task modal
        dispatch(fetchTaskDetail(taskId));

        // update Manage tasks page
        dispatch(fetchProjectDetail(projectId));
      })
    );
  };

  const handleDeleteTask = () => {
    dispatch(
      removeTask({ taskId }, () =>
        dispatch(
          fetchProjectDetail(projectId, () => {
            setShowDeleteTaskModal(false);
            props.onCancel();
          })
        )
      )
    );
  };

  const handleClickTaskNameLabel = async () => {
    prevValues.current = { ...formik.values };

    // use async / await to show input field before focusing
    await setShowTaskNameInput(true);
    await taskNameInputRef.current.focus();
  };

  const handleKeyDownTaskNameInput = (e) => {
    // ESC button
    if (e.keyCode === 27) {
      handleCancelEditTaskName();
      setShowTaskNameInput(false);
    }

    // Enter button
    if (e.keyCode === 13) {
      // prevent breakline
      e.preventDefault();
      handleSubmitTaskName();
    }
  };

  const handleCancelEditTaskName = () => {
    formik.setFieldValue("taskName", prevValues.current.taskName);
    setShowTaskNameInput(false);
  };

  const handleSubmitTaskName = () => {
    setShowTaskNameInput(false);

    // check if taskName no changed
    if (formik.values.taskName === prevValues.current.taskName) {
      return;
    }

    // call api here
    // replacement for api calling action (lỗi backend: không update được taskName)
    Modal.warning({
      title: "Opps! This feature is under construction",
      content: "We're sorry for this inconvenience",
      okText: "OK",
      okButtonProps: {
        className:
          "bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded",
      },
      zIndex: 1050,
      onOk: () => {
        formik.setFieldValue("taskName", prevValues.current.taskName);
      },
    });
  };

  const handleClickDescriptionLabel = () => {
    prevValues.current = { ...formik.values };
    setShowDescription(true);
  };

  const handleCancelEditDescription = () => {
    formik.setFieldValue("description", prevValues.current.description);
    setShowDescription(false);
  };

  const handleSubmitDescription = async () => {
    // check if description no changed
    if (formik.values.description === prevValues.current.description) {
      return;
    }

    const data = {
      taskId,
      description: formik.values.description,
    };

    dispatch(
      updateDescription(data, () => {
        dispatch(fetchTaskDetail(taskId));
        setShowDescription(false);
      })
    );
  };

  const handleChangePriorityId = (value) => {
    const data = {
      taskId,
      priorityId: value,
    };

    dispatch(
      updatePriority(data, () => {
        // update Edit task modal
        dispatch(fetchTaskDetail(taskId));

        // update Manage tasks page
        dispatch(fetchProjectDetail(projectId));
      })
    );
  };

  const handleChangeAssignees = (value) => {
    formik.setFieldValue("listUserAsign", value);

    const data = {
      ...formik.values,
      listUserAsign: value,
    };

    dispatch(
      updateTask(data, () => {
        // update Edit task modal
        dispatch(fetchTaskDetail(taskId));

        // update Manage tasks page
        dispatch(fetchProjectDetail(projectId));
      })
    );
  };

  const handleChangeStatus = (value) => {
    // reflect selected item in UI
    formik.setFieldValue("statusId", value.toString());

    const data = {
      taskId,
      statusId: value.toString(),
    };

    dispatch(
      updateTaskStatus(data, () => {
        // update Edit task modal
        dispatch(fetchTaskDetail(taskId));

        // update Manage tasks page
        dispatch(fetchProjectDetail(projectId));
      })
    );
  };

  const handleClickEstimateValue = async () => {
    prevValues.current = { ...formik.values };
    await setShowEstimateInput(true);
    await estimateInputRef.current.focus();
  };

  const handleCancelEditEstimate = () => {
    formik.setFieldValue(
      "originalEstimate",
      prevValues.current.originalEstimate
    );
    setShowEstimateInput(false);
  };

  const handleKeyDownEstimateValue = (e) => {
    // ESC button
    if (e.keyCode === 27) {
      handleCancelEditEstimate();
    }
  };

  const handleSubmitEstimate = () => {
    const data = {
      taskId,
      originalEstimate: formik.values.originalEstimate,
    };

    dispatch(
      updateEstimate(data, () => {
        setShowEstimateInput(false);
      })
    );
  };

  const handleCancelEditTimeTracking = () => {
    setShowTimeTrackingModal(false);
  };

  return (
    <>
      <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        maskStyle={{ zIndex: 1050 }}
        wrapClassName="z-modal"
        className="z-modal"
        width={980}
        maskClosable={false}
        closable={false}
        footer={null}
        keyboard={false}
      >
        <div className="flex justify-between items-center">
          <div>
            <Select
              name="typeId"
              value={formik.values.typeId}
              onChange={handleChangeType}
              bordered={false}
              showArrow={false}
              className="mb-1 hover:bg-gray-100 rounded hover:shadow"
              optionLabelProp="label"
              dropdownMatchSelectWidth={false}
              style={{ marginLeft: "-8px" }}
            >
              {taskTypes.map((type) => {
                return (
                  <Select.Option
                    key={type.id}
                    value={type.id}
                    label={
                      <div className="h-full flex items-center">
                        <Tooltip
                          title={
                            type.taskType.charAt(0).toUpperCase() +
                            type.taskType.slice(1)
                          }
                          placement="bottom"
                        >
                          {type.id === 1 && <BugIcon />}
                          {type.id === 2 && <NewTaskIcon />}
                        </Tooltip>
                      </div>
                    }
                  >
                    <div className="flex justify-start items-center">
                      {type.id === 1 && <BugIcon className="mr-1" />}
                      {type.id === 2 && <NewTaskIcon className="mr-1" />}
                      <span>
                        {type.taskType.charAt(0).toUpperCase() +
                          type.taskType.slice(1)}
                      </span>
                    </div>
                  </Select.Option>
                );
              })}
            </Select>
          </div>

          <div>
            <Button
              htmlType="button"
              icon={<DeleteOutlined />}
              className="w-8 h-8 hover:bg-gray-100 hover:text-black focus:text-black border-0 p-0 shadow-none hover:shadow rounded mr-1"
              onClick={() => setShowDeleteTaskModal(true)}
            />
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              className="w-8 h-8 hover:bg-gray-100 hover:text-black focus:text-black border-0 p-0 shadow-none hover:shadow rounded"
              onClick={props.onCancel}
            />
          </div>
        </div>

        <Row gutter={32}>
          <Col
            span={14}
            className="overflow-x-hidden overscroll-y-auto"
            style={{ maxHeight: "60vh" }}
          >
            <div className="task-name-container relative">
              <Typography.Title
                level={4}
                className={`p-1 rounded hover:bg-gray-200 duration-300 border border-transparent hover:border-gray-200${
                  !showTaskNameInput ? " block" : " hidden"
                }`}
                onClick={handleClickTaskNameLabel}
              >
                {formik.values.taskName}
              </Typography.Title>
              <Form
                className={showTaskNameInput ? "block" : "hidden"}
                onFinish={handleSubmitTaskName}
              >
                <Form.Item>
                  <Input.TextArea
                    ref={taskNameInputRef}
                    name="taskName"
                    value={formik.values.taskName}
                    onChange={formik.handleChange}
                    onKeyDown={handleKeyDownTaskNameInput}
                    className="text-xl font-semibold p-1 rounded resize-none"
                    style={{ lineHeight: 1.4 }}
                  />
                </Form.Item>

                <div
                  className={`absolute bottom-0 right-0 pt-1${
                    showTaskNameInput ? " block" : " hidden"
                  }`}
                  style={{ transform: "translateY(100%)" }}
                >
                  <Button
                    htmlType="submit"
                    icon={<CheckOutlined className="text-xs" />}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 hover:text-black focus:text-black border-0 shadow mr-1 p-0"
                  />
                  <Button
                    htmlType="button"
                    icon={<CloseOutlined className="text-xs" />}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 hover:text-black focus:text-black border-0 shadow p-0"
                    onClick={handleCancelEditTaskName}
                  />
                </div>
              </Form>
            </div>

            <div className="description-container mb-2">
              <Typography.Text strong className="pl-1">
                Description
              </Typography.Text>

              {!showDescription && (
                <div
                  className="p-1 hover:bg-gray-200 duration-300 rounded custom-html-parser"
                  onClick={handleClickDescriptionLabel}
                >
                  {formik.values.description === "" && (
                    <Typography.Text type="secondary">
                      Add a description...
                    </Typography.Text>
                  )}
                  {formik.values.description &&
                    parse(formik.values.description)}
                </div>
              )}

              {showDescription && (
                <Form className="pl-1">
                  <Form.Item style={{ minHeight: 200 }}>
                    <TinyMCEEditor
                      name="description"
                      value={formik.values.description}
                      onEditorChange={(newValue) =>
                        formik.setFieldValue("description", newValue)
                      }
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded mr-1"
                      onClick={handleSubmitDescription}
                    >
                      Save
                    </Button>
                    <Button
                      className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
                      onClick={handleCancelEditDescription}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>

            <div className="activities ml-1">
              <Typography.Text strong>Comments</Typography.Text>

              <NewComment taskId={taskId} />

              <div className="comment-list">
                {taskDetail?.lstComment
                  .map((comment) => {
                    return (
                      <CommentItem
                        key={comment.id}
                        taskId={taskId}
                        comment={comment}
                      />
                    );
                  })
                  .reverse()}
              </div>
            </div>
          </Col>

          <Col span={10}>
            <Form>
              <Form.Item className="mb-2 w-min">
                <Select
                  value={formik.values.statusId}
                  dropdownMatchSelectWidth={false}
                  bordered={false}
                  optionLabelProp="label"
                  onChange={handleChangeStatus}
                  className="bg-gray-200 hover:bg-gray-300 rounded"
                >
                  <Select.Option value="1" label="Back Log">
                    BACKLOG
                  </Select.Option>
                  <Select.Option value="2" label="Selected For Development">
                    SELECTED FOR DEVELOPMENT
                  </Select.Option>
                  <Select.Option value="3" label="In Progress">
                    IN PROGRESS
                  </Select.Option>
                  <Select.Option value="4" label="Done">
                    DONE
                  </Select.Option>
                </Select>
              </Form.Item>
            </Form>

            <Collapse
              defaultActiveKey={["1"]}
              expandIconPosition="right"
              className="mb-2"
            >
              <Collapse.Panel
                header={<Typography.Text strong>Details</Typography.Text>}
                key="1"
              >
                <Form layout="horizontal">
                  <Form.Item
                    label={<Typography.Text strong>Assignees</Typography.Text>}
                    colon={false}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Choose assignees..."
                      value={formik.values.listUserAsign}
                      onChange={handleChangeAssignees}
                      bordered={false}
                      className="hover:bg-gray-200 rounded"
                      tagRender={(props) => {
                        const onPreventMouseDown = (event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        };

                        return (
                          <Tag
                            closable
                            onMouseDown={onPreventMouseDown}
                            onClose={props.onClose}
                            className="flex items-center py-1 my-0.5 rounded"
                          >
                            {props.label}
                          </Tag>
                        );
                      }}
                    >
                      {projectDetail.members.map((member) => {
                        return (
                          <Select.Option
                            key={member.userId}
                            value={member.userId}
                          >
                            <div className="flex justify-start items-center">
                              <Avatar
                                size="small"
                                className="mr-1"
                                src={member.avatar}
                              />
                              <Typography.Text>{member.name}</Typography.Text>
                            </div>
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Form>
                <Form layout="horizontal">
                  <Form.Item
                    label={<Typography.Text strong>Priority</Typography.Text>}
                    colon={false}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select
                      name="priorityId"
                      value={formik.values.priorityId}
                      onChange={handleChangePriorityId}
                      showArrow={false}
                      bordered={false}
                      className="hover:bg-gray-200 rounded"
                    >
                      <Select.Option value={1}>
                        <div className="flex justify-start items-center">
                          <HighPriorityIcon className="mr-2" />
                          <span>High</span>
                        </div>
                      </Select.Option>
                      <Select.Option value={2}>
                        <div className="flex justify-start items-center">
                          <MediumPriorityIcon className="mr-2" />
                          <span>Medium</span>
                        </div>
                      </Select.Option>
                      <Select.Option value={3}>
                        <div className="flex justify-start items-center">
                          <LowPriorityIcon className="mr-2" />
                          <span>Low</span>
                        </div>
                      </Select.Option>
                      <Select.Option value={4}>
                        <div className="flex justify-start items-center">
                          <LowestPriorityIcon className="mr-2" />
                          <span>Lowest</span>
                        </div>
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Form>

                <Form layout="horizontal" onFinish={handleSubmitEstimate}>
                  <Form.Item
                    label={<Typography.Text strong>Estimate</Typography.Text>}
                    colon={false}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    className="relative"
                  >
                    <div
                      className={`${
                        !showEstimateInput ? "block" : "hidden"
                      } p-1 rounded hover:bg-gray-200 duration-300 border border-transparent hover:border-gray-200`}
                      onClick={handleClickEstimateValue}
                    >
                      <Typography.Text className="bg-gray-300 px-1 rounded">
                        {formik.values.originalEstimate}
                      </Typography.Text>
                    </div>
                    <Input
                      name="originalEstimate"
                      value={formik.values.originalEstimate}
                      onChange={formik.handleChange}
                      onKeyDown={handleKeyDownEstimateValue}
                      className={`${
                        showEstimateInput ? "block" : "hidden"
                      } rounded px-2`}
                      ref={estimateInputRef}
                    />
                    <div
                      className={`absolute bottom-0 right-0 pt-1${
                        showEstimateInput ? " block" : " hidden"
                      }`}
                      style={{ transform: "translateY(100%)", zIndex: 1 }}
                    >
                      <Button
                        htmlType="submit"
                        icon={<CheckOutlined className="text-xs" />}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 hover:text-black focus:text-black border-0 shadow mr-1 p-0"
                      />
                      <Button
                        htmlType="button"
                        icon={<CloseOutlined className="text-xs" />}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 hover:text-black focus:text-black border-0 shadow p-0"
                        onClick={handleCancelEditEstimate}
                      />
                    </div>
                  </Form.Item>
                </Form>

                <Row>
                  <Col span={8}>
                    <Typography.Text strong>Time tracking</Typography.Text>
                  </Col>
                  <Col
                    span={16}
                    className="p-1 rounded hover:bg-gray-200 duration-300 border border-transparent hover:border-gray-200"
                    onClick={() => setShowTimeTrackingModal(true)}
                  >
                    <TimeTrackingIndicator
                      timeTrackingSpent={taskDetail?.timeTrackingSpent}
                      timeTrackingRemaining={taskDetail?.timeTrackingRemaining}
                      spentWidth={(
                        (taskDetail?.timeTrackingSpent /
                          taskDetail?.originalEstimate) *
                        100
                      ).toFixed()}
                    />
                  </Col>
                </Row>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Modal>

      <Modal
        visible={showDeleteTaskModal}
        onCancel={() => setShowDeleteTaskModal(false)}
        maskStyle={{ zIndex: 1050 }}
        wrapClassName="z-modal"
        className="z-modal"
        footer={null}
        closable={false}
        width={400}
      >
        <Typography.Title level={4}>
          <div className="flex items-center">
            <ExclamationIcon
              style={{ color: "#de350b", fill: "#ffffff" }}
              className="mr-1"
            />
            <span> Delete this task?</span>
          </div>
        </Typography.Title>

        <Typography.Text>
          You're about to permanently delete this issue, its comments and
          attachments, and all of its data.
        </Typography.Text>
        <Typography.Text>
          If you're not sure, you can resolve or close this issue instead.
        </Typography.Text>

        <Form className="mt-4" onFinish={handleDeleteTask}>
          <Form.Item className="mb-0 text-right">
            <Button
              htmlType="submit"
              className="bg-red-600 hover:bg-red-500 focus:bg-red-600 text-white font-semibold hover:text-white focus:text-white border-red-600 hover:border-red-500 focus:border-red-600 rounded mr-1"
            >
              Delete
            </Button>
            <Button
              className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
              onClick={() => setShowDeleteTaskModal(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {taskDetail && (
        <TimeTrackingModal
          visible={showTimeTrackingModal}
          onCancel={handleCancelEditTimeTracking}
          taskId={taskDetail.taskId}
          originalEstimate={taskDetail.originalEstimate}
          timeTrackingSpent={taskDetail.timeTrackingSpent}
          timeTrackingRemaining={taskDetail.timeTrackingRemaining}
        />
      )}
    </>
  );
};

export default EditTaskModal;
