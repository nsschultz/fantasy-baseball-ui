export type BaseEntity = { id: React.Key } & Record<string, ValueType>;
export type ValueType = number | object | string;

export interface NotificationMessage {
  readonly message: string;
  readonly notificationKey: number;
  readonly timestamp: number;
  readonly type: "success" | "error" | "info";
}

export interface NotificationState {
  value: NotificationMessage[];
}
