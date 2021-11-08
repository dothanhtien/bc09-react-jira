import { notification } from "antd";

export const notifitying = (type, message, description="") =>{
    notification[type]({
        message,
        description,
      });
}

notification.config({
  placement: 'bottomLeft',
  bottom: 50,
  duration: 3,
  rtl: true,
});