export interface NotificationMessage {
  readonly message: string;
  readonly notificationKey: number;
  readonly timestamp: number;
  readonly type: "success" | "error" | "info";
}

export interface NotificationState {
  value: NotificationMessage[];
}
