import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskDetail,
  updateDescription,
} from "../../../store/actions/task";
import TinyMCEEditor from "../../UI/Input/TinyMCEEditor";

const EditTaskModal = (props) => {
  const dispatch = useDispatch();
  const taskNameInputRef = useRef(null);
  const prevValues = useRef(null);
  const taskDetail = useSelector((state) => state.task.taskDetail);
  const [showTaskNameInput, setShowTaskNameInput] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const formik = useFormik({
    initialValues: {
      taskName: "",
    },
  });

  useEffect(() => {
    dispatch(fetchTaskDetail(props.task.taskId));
  }, [dispatch, props.task.taskId]);

  useEffect(() => {
    formik.setValues({
      ...taskDetail,
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

  return (
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
                {formik.values.description && parse(formik.values.description)}
              </div>
            )}

            {showDescription && (
              <Form className="pl-1">
                <Form.Item>
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
            <Form.Item className="mb-2">
              <Select defaultValue={1}>
                <Select.Option value={1}>BACKLOG</Select.Option>
                <Select.Option value={2}>
                  SELECTED FOR DEVELOPMENT
                </Select.Option>
                <Select.Option value={3}>IN PROGRESS</Select.Option>
                <Select.Option value={4}>DONE</Select.Option>
              </Select>
            </Form.Item>
          </Form>

          <Space direction="vertical">
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel
                header={<Typography.Text strong>Details</Typography.Text>}
                showArrow={false}
                key="1"
              >
                <Typography.Text>
                  A dog is a type of domesticated animal. Known for its loyalty
                  and faithfulness, it can be found as a welcome guest in many
                  households across the world.
                </Typography.Text>
              </Collapse.Panel>
            </Collapse>
            <Collapse>
              <Collapse.Panel
                header={<Typography.Text strong>More fields</Typography.Text>}
                showArrow={false}
                key="2"
              >
                <Typography.Text>
                  A dog is a type of domesticated animal. Known for its loyalty
                  and faithfulness, it can be found as a welcome guest in many
                  households across the world.
                </Typography.Text>
              </Collapse.Panel>
            </Collapse>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default EditTaskModal;
