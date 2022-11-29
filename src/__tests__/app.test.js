import App from "../app";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { mount } from "enzyme";

describe("App", () => {
  it("should render", () =>
    expect(
      mount(
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      )
    ).toBeTruthy());
});
