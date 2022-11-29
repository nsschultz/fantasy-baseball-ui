import CustomInputBase from "../../../components/input/custom-input-base";
import GlobalTheme from "../../../components/global-theme";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { mount } from "enzyme";

describe("Custom Input Base", () => {
  it("should render the input base", () => {
    const wrapper = mount(
      <ThemeProvider theme={GlobalTheme()}>
        <CustomInputBase />
      </ThemeProvider>
    );
    const input = wrapper.find("input");
    input.instance().value = "Text Change";
    expect(input.instance().value).toEqual("Text Change");
  });
});
