export type BaseEntity = { id: React.Key } & Record<string, ValueType>;
export type EnumLookup = Record<string, string>;
export type ValueType = number | object | string;

export interface NotificationMessage {
  message: string;
  notificationKey: number;
  timestamp: number;
  type: "success" | "error" | "info";
}

export interface NotificationState {
  value: Array<NotificationMessage>;
}
