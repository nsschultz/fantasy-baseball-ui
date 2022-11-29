import { Button, ThemeProvider } from "@mui/material";

import GlobalTheme from "../../../components/global-theme";
import { MemoryRouter } from "react-router-dom";
import NavigationItem from "../../../components/layout/navigation-item";
import { People } from "@mui/icons-material";
import React from "react";
import { mount } from "enzyme";

const mockLocation = { pathname: "/othersite", search: "", hash: "", state: null };

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useLocation: () => mockLocation,
  };
});

describe("Navigation Item Component", () => {
  it("should render with active link", () => {
    const wrapper = mount(
      <ThemeProvider theme={GlobalTheme()}>
        <MemoryRouter initialEntries={["/home"]}>
          <NavigationItem href="/othersite" title="Test Title" icon={People} />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(wrapper.find("span").at(0).text()).toEqual("Test Title");
    expect(wrapper.find(People)).toBeTruthy();
    expect(wrapper.find(Button).prop("to")).toEqual("/othersite");
  });

  it("should render with non-active link", () => {
    const wrapper = mount(
      <ThemeProvider theme={GlobalTheme()}>
        <MemoryRouter initialEntries={["/home"]}>
          <NavigationItem href="/home" title="Test Title" icon={People} />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(wrapper.find("span").at(0).text()).toEqual("Test Title");
    expect(wrapper.find(People)).toBeTruthy();
    expect(wrapper.find(Button).prop("to")).toEqual("/home");
  });
});
