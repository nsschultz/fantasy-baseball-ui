import { CheckCircleOutlineOutlined, ErrorOutlineOutlined, InfoOutlined } from "@mui/icons-material";
import { Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

import { NotificationType } from "../../types/types";
import { format } from "timeago.js";
import { removeNotification } from "../../state/slice/notification-slice";
import { useDispatch } from "react-redux";

const getNotificationIcon = (type: NotificationType["type"]) => {
  if (type === "success") return <CheckCircleOutlineOutlined color="success" data-testid="CheckCircleOutlineOutlinedIcon" />;
  if (type === "error") return <ErrorOutlineOutlined color="error" data-testid="ErrorOutlineOutlinedIcon" />;
  return <InfoOutlined color="info" data-testid="InfoOutlinedIcon" />;
};

export default function NotificationItem(notification: Readonly<NotificationType>) {
  const dispatch = useDispatch();

  console.log(notification);
  return (
    <>
      <Divider />
      <ListItemButton onClick={() => dispatch(removeNotification(notification))} sx={{ padding: 0 }}>
        <ListItemIcon sx={{ paddingLeft: 2 }}>{getNotificationIcon(notification.type)}</ListItemIcon>
        <ListItemText
          primary={
            <Typography color="textPrimary" sx={{ paddingRight: 2 }} variant="h6">
              {notification.message}
            </Typography>
          }
          secondary={format(notification.timestamp)}
        />
      </ListItemButton>
    </>
  );
}
