import { IconButton } from "@mui/material";
import React from "react";
import Titlebar from "../../../components/layout/titlebar";
import { shallow } from "enzyme";

describe("Titlebar Component", () => {
  it("should render when logged in", () => {
    const wrapper = shallow(<Titlebar isLoggedIn={true} />);
    expect(wrapper.find(IconButton)).toHaveLength(3);
  });

  it("should render when not logged in", () => {
    const wrapper = shallow(<Titlebar isLoggedIn={false} />);
    expect(wrapper.find(IconButton)).toHaveLength(1);
  });
});
