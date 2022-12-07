import { Button, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";

import GlobalTheme from "../../../components/global-theme";
import IntegrationCard from "../../../components/card/integration-card";

test("should render the integration card", () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <IntegrationCard title="Card Title" description="Card Description" integrationButton={<Button>Button Text</Button>} />
    </ThemeProvider>
  );
  expect(screen.getByText("Card Title")).toBeTruthy();
  expect(screen.getByText("Card Description")).toBeTruthy();
  expect(screen.getByText("Button Text")).toBeTruthy();
});
