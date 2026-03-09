import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import ImportExportData from "./import-export-data";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import axios from "axios";
import { clearNotifications } from "../state/slice/notification-slice";
import store from "../state/store";
import user from "@testing-library/user-event";

let deleteSpy, getSpy, postSpy;

jest.mock("axios");
afterEach(() => jest.clearAllMocks());
afterEach(() => store.dispatch(clearNotifications()));
beforeEach(() => (deleteSpy = jest.spyOn(axios, "delete")));
beforeEach(() => (postSpy = jest.spyOn(axios, "post")));
beforeEach(() => (getSpy = jest.spyOn(axios, "get")));

const TestWrapper = () => (
  <Provider store={store}>
    <ThemeProvider theme={GlobalTheme()}>
      <ImportExportData />
    </ThemeProvider>
  </Provider>
);

describe("ImportExportData", () => {
  test("should render the buttons", () => {
    render(<TestWrapper />);
    expect(screen.getAllByRole("button")).toHaveLength(4);
    expect(screen.getAllByLabelText("Upload")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Export" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Clear" })).toBeVisible();
  });
  describe("should handle", () => {
    test("a file download", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: "new data" }));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Export" }));
      await waitFor(() => expect(getSpy).toHaveBeenCalledTimes(1));
    });
    test("errors on a file download", async () => {
      axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Export" }));
      await waitFor(() => expect(getSpy).toHaveBeenCalledTimes(1));
    });
    test("a file upload", async () => {
      axios.post.mockImplementationOnce(() => Promise.resolve({}));
      render(<TestWrapper />);
      const button = screen.getAllByRole("button", { name: "Upload" })[0];
      user.upload(button, new Blob(["file data"]));
      await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(1));
      expect(store.getState().notification.value).toHaveLength(2);
    });
    test("errors during a file upload error", async () => {
      axios.post.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(<TestWrapper />);
      const button = screen.getAllByRole("button", { name: "Upload" })[1];
      user.upload(button, new Blob(["file data"]));
      await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(1));
      expect(store.getState().notification.value).toHaveLength(2);
    });
    test("a clear being cancelled", async () => {
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "No" }));
      await waitFor(() => expect(deleteSpy).toHaveBeenCalledTimes(0));
      expect(store.getState().notification.value).toHaveLength(0);
    });
    test("a clear being approved", async () => {
      axios.delete.mockImplementationOnce(() => Promise.resolve({}));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "Yes" }));
      await waitFor(() => expect(deleteSpy).toHaveBeenCalledTimes(1));
      expect(store.getState().notification.value).toHaveLength(2);
    });
    test("an error being thrown on clear", async () => {
      axios.delete.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "Yes" }));
      await waitFor(() => expect(deleteSpy).toHaveBeenCalledTimes(1));
      expect(store.getState().notification.value).toHaveLength(2);
    });
  });
});
