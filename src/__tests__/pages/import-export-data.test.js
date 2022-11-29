import { Button, Dialog } from "@material-ui/core";

import GlobalTheme from "../../components/global-theme";
import ImportExportData from "../../pages/import-export-data";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { mount } from "enzyme";

describe("Import Export Data Page", () => {
  let wrapper, deleteSpy, getSpy, postSpy, clearButton, exportButton, mergeButton, uploadBatterButton, uploadPitcherButton;

  jest.mock("axios");

  afterEach(() => jest.clearAllMocks());
  beforeEach(
    () =>
      (wrapper = mount(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      ))
  );
  beforeEach(() => (uploadBatterButton = wrapper.find("label").at(0)));
  beforeEach(() => (uploadPitcherButton = wrapper.find("label").at(1)));
  beforeEach(() => (mergeButton = wrapper.find("button").at(0)));
  beforeEach(() => (exportButton = wrapper.find("button").at(1)));
  beforeEach(() => (clearButton = wrapper.find("button").at(2)));
  beforeEach(() => (deleteSpy = jest.spyOn(axios, "delete")));
  beforeEach(() => (postSpy = jest.spyOn(axios, "post")));
  beforeEach(() => (getSpy = jest.spyOn(axios, "get")));

  it("should render the buttons", () => {
    expect(uploadBatterButton.text()).toEqual("Upload");
    expect(uploadPitcherButton.text()).toEqual("Upload");
    expect(mergeButton.text()).toEqual("Merge");
    expect(exportButton.text()).toEqual("Export");
    expect(clearButton.text()).toEqual("Clear");
  });

  it("should call post on merge click", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}));
    mergeButton.simulate("click");
    await expect(postSpy).toBeCalled();
  });

  it("should handle errors on merge click", async () => {
    axios.post.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    mergeButton.simulate("click");
    await expect(postSpy).toBeCalled();
  });

  it("should handle a file download", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: "new data" }));
    exportButton.simulate("click");
    await expect(getSpy).toBeCalled();
  });

  it("should handle errors on file download", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    exportButton.simulate("click");
    await expect(getSpy).toBeCalled();
  });

  it("should handle a file upload", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}));
    uploadBatterButton.find("input").simulate("change", { target: { files: [new Blob(["file data"])] } });
    await expect(postSpy).toBeCalled();
  });

  it("should handle a file upload error", async () => {
    axios.post.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    uploadPitcherButton.find("input").simulate("change", { target: { files: [new Blob(["file data"])] } });
    await expect(postSpy).toBeCalled();
  });

  it("should handle a clear being cancelled", async () => {
    clearButton.simulate("click");
    wrapper.find(Dialog).find(Button).at(0).simulate("click");
    await expect(deleteSpy).toHaveBeenCalledTimes(0);
  });

  it("should handle a clear being approved", async () => {
    axios.delete.mockImplementationOnce(() => Promise.resolve({}));
    clearButton.simulate("click");
    wrapper.find(Dialog).find(Button).at(1).simulate("click");
    await expect(deleteSpy).toBeCalled();
  });

  it("should handle an error being thrown on clear", async () => {
    axios.delete.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
    clearButton.simulate("click");
    wrapper.find(Dialog).find(Button).at(1).simulate("click");
    await expect(deleteSpy).toBeCalled();
  });
});
