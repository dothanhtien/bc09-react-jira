import React, { useState } from "react";
import { Comment, Avatar, Form, Typography, Button, Modal } from "antd";
import parse from "html-react-parser";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import TinyMCEEditor from "../../UI/Input/TinyMCEEditor";
import { ReactComponent as ExclamationIcon } from "../../../assets/images/icons/exclamation.svg";
import { deleteComment, updateComment } from "../../../store/actions/comment";
import { fetchTaskDetail } from "../../../store/actions/task";

const CommentItem = ({ taskId, comment }) => {
  const { avatar, commentContent: contentComment, id, name } = comment;
  const dispatch = useDispatch();
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      id,
      contentComment,
    },
  });

  const actions = [
    <Button
      type="link"
      key="edit-comment"
      className="px-0 font-medium hover mr-2"
      onClick={() => setShowEditCommentInput(true)}
    >
      <span className="hover:underline text-gray-500 hover:text-gray-400">
        Edit
      </span>
    </Button>,
    <Button
      type="link"
      key="delete-comment"
      className="px-0 font-medium hover"
      onClick={() => setShowDeleteCommentModal(true)}
    >
      <span className="hover:underline text-gray-500 hover:text-gray-400">
        Delete
      </span>
    </Button>,
  ];

  const handleCancelEditComment = () => {
    formik.resetForm();
    setShowEditCommentInput(false);
  };

  const handleUpdateComment = () => {
    // hide input field and prevent submiting form when there is no change
    if (!formik.dirty) {
      setShowEditCommentInput(false);
      return;
    }

    // prevent update comment with blank
    if (!formik.values.contentComment.length) return;

    dispatch(
      updateComment(formik.values, () => {
        dispatch(fetchTaskDetail(taskId, () => setShowEditCommentInput(false)));
      })
    );
  };

  const handleDeleteComment = () => {
    dispatch(
      deleteComment({ idComment: id }, () => dispatch(fetchTaskDetail(taskId)))
    );
  };

  return (
    <>
      <Comment
        actions={!showEditCommentInput && actions}
        author={<Typography.Text strong>{name}</Typography.Text>}
        avatar={<Avatar src={avatar} alt={name} />}
        content={
          <>
            {!showEditCommentInput && (
              <div className="custom-html-parser">{parse(contentComment)}</div>
            )}

            {showEditCommentInput && (
              <Form onFinish={handleUpdateComment}>
                <Form.Item style={{ minHeight: 200 }}>
                  <TinyMCEEditor
                    name="contentComment"
                    value={formik.values.contentComment}
                    onEditorChange={(newValue) =>
                      formik.setFieldValue("contentComment", newValue)
                    }
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button
                    htmlType="submit"
                    className="bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded mr-1"
                  >
                    Save
                  </Button>
                  <Button
                    className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
                    onClick={handleCancelEditComment}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            )}
          </>
        }
      />

      {/* onfirm delete comment modal */}
      <Modal
        visible={showDeleteCommentModal}
        onCancel={() => setShowDeleteCommentModal(false)}
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
            <span> Delete this comment?</span>
          </div>
        </Typography.Title>

        <Typography.Text>Once you delete, it's gone for good.</Typography.Text>

        <Form className="mt-4" onFinish={handleDeleteComment}>
          <Form.Item className="mb-0 text-right">
            <Button
              htmlType="submit"
              className="bg-red-600 hover:bg-red-500 focus:bg-red-600 text-white font-semibold hover:text-white focus:text-white border-red-600 hover:border-red-500 focus:border-red-600 rounded mr-1"
            >
              Delete
            </Button>
            <Button
              className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
              onClick={() => setShowDeleteCommentModal(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CommentItem;
