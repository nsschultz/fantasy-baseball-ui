import GlobalTheme from "../../components/global-theme";
import Home from "../../pages/home";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { mount } from "enzyme";

describe("Home Page", () => {
  it("should render the header", () =>
    expect(
      mount(
        <ThemeProvider theme={GlobalTheme()}>
          <Home />
        </ThemeProvider>
      )
        .find("h2")
        .text()
    ).toEqual("Welcome to the Fantasy Baseball Analyzer"));
});
