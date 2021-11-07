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
  Typography,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskDetail,
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

const EditTaskModal = (props) => {
  const dispatch = useDispatch();
  const taskNameInputRef = useRef(null);
  const estimateInputRef = useRef(null);
  const prevValues = useRef(null);
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const taskDetail = useSelector((state) => state.task.taskDetail);
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
    dispatch(fetchTaskDetail(props.task.taskId));
  }, [dispatch, props.task.taskId]);

  useEffect(() => {
    formik.setValues({
      ...taskDetail,
      listUserAsign: taskDetail
        ? [...taskDetail.assigness.map((assignee) => assignee.id)]
        : [],
    });
    // eslint-disable-next-line
  }, [taskDetail]);

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

  // const handleBlurTaskNameInput = () => {
  //   setShowTaskNameInput(false);
  // };

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
      taskId: formik.values.taskId,
      description: formik.values.description,
    };

    dispatch(
      updateDescription(data, () => {
        dispatch(fetchTaskDetail(props.task.taskId));
        setShowDescription(false);
      })
    );
  };

  const handleChangePriorityId = (value) => {
    const data = {
      taskId: formik.values.taskId,
      priorityId: value,
    };

    dispatch(
      updatePriority(data, () => {
        dispatch(fetchTaskDetail(props.task.taskId));
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
        dispatch(fetchTaskDetail(props.task.taskId));

        // update Manage tasks page
        dispatch(fetchProjectDetail(props.task.projectId));
      })
    );
  };

  const handleChangeStatus = (value) => {
    // reflect selected item in UI
    formik.setFieldValue("statusId", value.toString());

    const data = {
      taskId: props.task.taskId,
      statusId: value.toString(),
    };

    dispatch(
      updateTaskStatus(data, () => {
        // update Edit task modal
        dispatch(fetchTaskDetail(props.task.taskId));

        // update Manage tasks page
        dispatch(fetchProjectDetail(props.task.projectId));
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
      taskId: props.task.taskId,
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
        title={
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            Edit task
          </Typography.Title>
        }
        visible={props.visible}
        onCancel={props.onCancel}
        maskStyle={{ zIndex: 1050 }}
        wrapClassName="z-modal"
        className="z-modal"
        width={980}
        maskClosable={false}
        footer={null}
        keyboard={false}
      >
        <Row gutter={32}>
          <Col span={14}>
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
                    // onBlur={handleBlurTaskNameInput}
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

            <div className="description-container">
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
                    <div className="h-1 flex bg-gray-300 rounded overflow-hidden cursor-pointer">
                      <div
                        className="h1 bg-blue-600"
                        style={{
                          width: `
                          ${(
                            (taskDetail?.timeTrackingSpent /
                              taskDetail?.originalEstimate) *
                            100
                          ).toFixed()}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <div>{taskDetail?.timeTrackingSpent}m logged</div>
                      <div className="text-right">
                        {taskDetail?.timeTrackingRemaining}m remaining
                      </div>
                    </div>
                  </Col>
                </Row>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
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
