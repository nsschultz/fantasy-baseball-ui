import { Button, ThemeProvider } from "@mui/material";

import GlobalTheme from "../../../components/global-theme";
import IntegrationCard from "../../../components/card/integration-card";
import React from "react";
import { mount } from "enzyme";

describe("Integration Card Component", () => {
  it("should render the integration card", () => {
    const wrapper = mount(
      <ThemeProvider theme={GlobalTheme()}>
        <IntegrationCard title="Card Title" description="Card Description" integrationButton={<Button>Button Text</Button>} />
      </ThemeProvider>
    );
    expect(wrapper.find("span").at(0).text()).toEqual("Card Title");
    expect(wrapper.find("p").text()).toEqual("Card Description");
    expect(wrapper.find("button").text()).toEqual("Button Text");
  });
});
