import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  fetchTaskDetail,
  updateTimeTracking,
} from "../../../store/actions/task";
import TimeTrackingIndicator from "../TimeTrackingIndicator";

const TimeTrackingModal = (props) => {
  const {
    visible,
    onCancel,
    taskId,
    originalEstimate,
    timeTrackingSpent,
    timeTrackingRemaining,
  } = props;
  const dispatch = useDispatch();
  const timeTrackingSpentRef = useRef(timeTrackingSpent);
  const [isUpdating, setIsUpdating] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskId,
      timeTrackingSpent: 0,
      timeTrackingRemaining,
    },
  });

  useEffect(() => {
    timeTrackingSpentRef.current = timeTrackingSpent;
  }, [timeTrackingSpent]);

  const handleSubmitTimeTracking = () => {
    const data = {
      taskId,
      timeTrackingSpent:
        timeTrackingSpentRef.current + +formik.values.timeTrackingSpent,
      timeTrackingRemaining: formik.values.timeTrackingRemaining,
    };

    if (!formik.dirty) {
      onCancel();
      return;
    }

    setIsUpdating(true);

    dispatch(
      updateTimeTracking(data, () => {
        setTimeout(() => {
          dispatch(fetchTaskDetail(taskId));
          setIsUpdating(false);
          formik.resetForm();
          onCancel();
        }, 1000);
      })
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      maskStyle={{ zIndex: 1050 }}
      wrapClassName="z-modal"
      className="z-modal"
      footer={null}
      closable={false}
      destroyOnClose={true}
    >
      <Typography.Title level={4}>Time tracking</Typography.Title>

      <div className="mb-2">
        <TimeTrackingIndicator
          timeTrackingSpent={
            +timeTrackingSpentRef.current + +formik.values.timeTrackingSpent
          }
          timeTrackingRemaining={formik.values.timeTrackingRemaining}
          spentWidth={(
            ((+timeTrackingSpentRef.current +
              +formik.values.timeTrackingSpent) /
              originalEstimate) *
            100
          ).toFixed()}
          barHeight={8}
        />
      </div>

      <Typography.Text className="block mb-2">
        The original estimate for this issue was{" "}
        <span className="inline-block bg-gray-300 px-1 rounded mr-0.5">
          {originalEstimate}
        </span>
        m.
      </Typography.Text>

      <Form layout="vertical" onFinish={handleSubmitTimeTracking}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Time spent" colon={false}>
              <Input
                className="rounded"
                name="timeTrackingSpent"
                onChange={formik.handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Time remaining" colon={false}>
              <Input
                className="rounded"
                name="timeTrackingRemaining"
                value={formik.values.timeTrackingRemaining}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="mb-0 text-right">
          <Button
            htmlType="submit"
            className="bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded mr-1"
            disabled={isUpdating}
          >
            Save
          </Button>
          <Button
            className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TimeTrackingModal;
