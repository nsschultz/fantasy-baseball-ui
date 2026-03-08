import { AppDispatch, RootState } from "../../state/store";
import { Badge, Box, ClickAwayListener, Divider, IconButton, List, Paper, Popper, Tooltip, Typography } from "@mui/material";
import { ClearAll, Notifications } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import NotificationItem from "./notification-item";
import { NotificationMessage } from "../../types/notification-types";
import React from "react";
import { clearNotifications } from "../../state/slice/notification-slice";

const paperSx = { boxShadow: 24, maxWidth: 350, minWidth: 250, width: "100%" };

export default function Notification() {
  const anchor = React.useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const notifications: NotificationMessage[] = useSelector((state: RootState) => state.notification.value);

  const dispatch = useDispatch<AppDispatch>();
  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node | null;
    if (anchor.current && target && anchor.current.contains(target)) return;
    setIsOpen(false);
  };
  const openPopper = () => setIsOpen(!isOpen);

  return (
    <>
      <IconButton
        color="inherit"
        data-testid="notification"
        onClick={openPopper}
        ref={anchor}
        sx={{ display: { xs: "none", lg: "inline-flex" }, padding: 1.5 }}
      >
        <Badge badgeContent={notifications.length} color="secondary" max={99}>
          <Notifications />
        </Badge>
      </IconButton>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper anchorEl={anchor.current as Element | null} disablePortal open={isOpen} placement="bottom-end">
          <Paper sx={paperSx} variant="outlined">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Typography color="textPrimary" sx={{ paddingLeft: 1, paddingTop: 1 }} variant="h4">
                Notifications
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Clear All Notifications">
                <IconButton onClick={() => dispatch(clearNotifications())} size="small" sx={{ display: "inline-flex" }}>
                  <ClearAll fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
            {notifications.length > 0 ? (
              <List>
                {notifications
                  .slice()
                  .reverse()
                  .map((n) => (
                    <NotificationItem key={n.notificationKey} {...n} />
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
}
