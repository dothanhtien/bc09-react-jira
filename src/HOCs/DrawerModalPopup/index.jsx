
import React from "react";
import {
  Drawer,
  Button,
  Space,
} from "antd";
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
    <div className="mt-10">
      <Drawer
      style={{marginTop:50}}
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space style={{marginBottom:50}}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={callBackSubmit}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        
        {CompContentDrawer}
      </Drawer>
    </div>
  );
};

export default DrawerModalPopup;
