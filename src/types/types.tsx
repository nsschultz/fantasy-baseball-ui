export interface NotificationType {
  readonly notificationKey: number;
  readonly message: string;
  readonly timestamp: number;
  readonly type: "success" | "error" | "info";
}
