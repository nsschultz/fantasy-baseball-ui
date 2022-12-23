import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../components/global-theme";
import ImportExportData from "./import-export-data";
import { ThemeProvider } from "@mui/material";
import axios from "axios";
import user from "@testing-library/user-event";

let deleteSpy, getSpy, postSpy;
jest.mock("axios");
afterEach(() => jest.clearAllMocks());
beforeEach(() => (deleteSpy = jest.spyOn(axios, "delete")));
beforeEach(() => (postSpy = jest.spyOn(axios, "post")));
beforeEach(() => (getSpy = jest.spyOn(axios, "get")));

describe("ImportExportData", () => {
  xtest("should render the buttons", () => {
    render(
      <ThemeProvider theme={GlobalTheme()}>
        <ImportExportData />
      </ThemeProvider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(4);
    expect(screen.getAllByLabelText("Upload")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Export" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Clear" })).toBeVisible();
  });
  describe("should handle", () => {
    xtest("a file download", () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: "new data" }));
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByRole("button", { name: "Export" }));
      expect(getSpy).toBeCalled();
    });
    xtest("errors on file download", () => {
      axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByRole("button", { name: "Export" }));
      expect(getSpy).toBeCalled();
    });
    xtest("a file upload", () => {
      axios.post.mockImplementationOnce(() => Promise.resolve({}));
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      );
      const button = screen.getAllByRole("button", { name: "Upload" })[0];
      user.upload(button, new Blob(["file data"]));
      expect(postSpy).toBeCalled();
    });
    xtest("errors a file upload error", () => {
      axios.post.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      );
      const button = screen.getAllByRole("button", { name: "Upload" })[1];
      user.upload(button, new Blob(["file data"]));
      expect(postSpy).toBeCalled();
    });
    xtest("a clear being cancelled", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "No" }));
      expect(deleteSpy).toHaveBeenCalledTimes(0);
    });

    xtest("a clear being approved", () => {
      axios.delete.mockImplementationOnce(() => Promise.resolve({}));
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "Yes" }));
      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });

    xtest("an error being thrown on clear", () => {
      axios.delete.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ImportExportData />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "Yes" }));
      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });
  });
});
