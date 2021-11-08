import React from "react";
import { Drawer, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../store/actions";
import { actionType } from "../../store/actions/type";

const DrawerModalPopup = (props) => {
  const dispatch = useDispatch();
  const { visible, CompContentDrawer, callBackSubmit, title } = useSelector(
    (state) => state.drawerModal
  );

  const onClose = () => {
    dispatch(createAction(actionType.HIDE_DRAWER));
  };

  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      visible={visible}
      zIndex={1050}
      footer={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={callBackSubmit} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      {CompContentDrawer}
    </Drawer>
  );
};

export default DrawerModalPopup;
