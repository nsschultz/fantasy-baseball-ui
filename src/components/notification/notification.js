import { Badge, Box, ClickAwayListener, Divider, IconButton, List, Paper, Popper, Tooltip, Typography } from "@mui/material";
import { CloseOutlined, Notifications } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import NotificationItem from "./notification-item";
import React from "react";
import { clearNotifications } from "../../state/slice/notification-slice";

const paperSx = { boxShadow: 24, maxWidth: 350, minWidth: 250, width: "100%" };

/**
 * Creates a new instance notification display along with the button that is used to toggle the display.
 * @returns A new instance of Notification.
 */
const Notification = () => {
  const anchor = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.value);

  const handleClickAway = (event) => {
    if (anchor.current && anchor.current.contains(event.target)) return;
    setIsOpen(false);
  };
  const openPopper = () => setIsOpen(!isOpen);

  return (
    <>
      <IconButton color="inherit" data-testid="notifcation" onClick={openPopper} ref={anchor} sx={{ display: { xs: "none", lg: "inline-flex" }, padding: 1.5 }}>
        <Badge badgeContent={notifications.length} color="secondary" max={99}>
          <Notifications />
        </Badge>
      </IconButton>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper anchorEl={anchor.current} disablePortal open={isOpen} placement="bottom-end">
          <Paper sx={paperSx} variant="outlined">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Typography color="textPrimary" sx={{ paddingLeft: 1, paddingTop: 1 }} variant="h4">
                Notifications
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Clear All Notifications">
                <IconButton onClick={() => dispatch(clearNotifications())} size="small" sx={{ display: "inline-flex" }}>
                  <CloseOutlined fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
            {notifications.length > 0 ? (
              <List>
                {notifications
                  .slice()
                  .reverse()
                  .map((n) => (
                    <NotificationItem key={n.key} notification={n} />
                  ))}
              </List>
            ) : (
              <>
                <Divider />
                <Typography color="textSecondary" sx={{ padding: 1 }} variant="h6">
                  No notifications to display.
                </Typography>
              </>
            )}
          </Paper>
        </Popper>
      </ClickAwayListener>
    </>
  );
};
export default Notification;
