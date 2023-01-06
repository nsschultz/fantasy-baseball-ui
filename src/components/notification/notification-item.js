import { CheckCircleOutlineOutlined, ErrorOutlineOutlined, InfoOutlined } from "@mui/icons-material";
import { Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import { format } from "timeago.js";
import { removeNotification } from "../../state/slice/notification-slice";
import { useDispatch } from "react-redux";

/**
 * The display for each notification. It's a wrapper over the ListItemButton.
 * @param {number}   notification.key       (Required) The unique id of the notification.
 * @param {string}   notification.message   (Required) The message to be displayed.
 * @param {number}   notification.timestamp (Required) The time (in milliseconds) when the notification was created.
 * @param {string}   notification.type      (Required) The type: success, info, or error.
 * @returns A new instance of the NotificationItem.
 */
const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Divider />
      <ListItemButton onClick={() => dispatch(removeNotification(notification))} sx={{ padding: 0 }}>
        <ListItemIcon sx={{ paddingLeft: 2 }}>
          {notification.type == "success" ? (
            <CheckCircleOutlineOutlined color="success" />
          ) : notification.type == "error" ? (
            <ErrorOutlineOutlined color="error" />
          ) : (
            <InfoOutlined color="info" />
          )}
        </ListItemIcon>
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
};
NotificationItem.propTypes = {
  notification: PropTypes.exact({
    key: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }),
};
export default NotificationItem;
