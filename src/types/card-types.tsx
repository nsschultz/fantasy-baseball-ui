import { ReactNode } from "react";

export interface CustomCardProps {
  readonly additionalContent?: ReactNode;
  readonly content: ReactNode;
  readonly title: string;
}

export interface IntegrationCardProps {
  readonly description: string;
  readonly integrationButton: ReactNode;
  readonly title: string;
}
