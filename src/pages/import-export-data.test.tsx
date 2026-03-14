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

const mockedAxios = axios as jest.Mocked<typeof axios>;
afterEach(() => jest.clearAllMocks());
afterEach(() => store.dispatch(clearNotifications()));
beforeEach(() => (deleteSpy = jest.spyOn(axios, "delete")));
beforeEach(() => (postSpy = jest.spyOn(axios, "post")));
beforeEach(
  () =>
    (getSpy = jest.spyOn(axios, "get").mockImplementation((url: string) => {
      if (url.includes("enumType=PlayerType")) return Promise.resolve({ data: { 0: "Batter", 2: "Pitcher" } });
      if (url.includes("enumType=StatsType")) return Promise.resolve({ data: { 0: "Season", 2: "Projection" } });
      return Promise.resolve({ data: {} });
    }))
);

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
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Upload" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Export" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Clear" })).toBeVisible();
  });
  describe("should handle", () => {
    test("a file download", async () => {
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Export" }));
      await waitFor(() => expect(getSpy).toHaveBeenCalledWith(expect.stringContaining("/api/v3/action/export"), expect.any(Object)));
    });
    test("errors on a file download", async () => {
      getSpy.mockImplementation((url: string) => {
        if (url.includes("/api/v3/action/export")) return Promise.reject(new Error("errorMessage"));
        return Promise.resolve({ data: {} });
      });
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Export" }));
      await waitFor(() => expect(getSpy).toHaveBeenCalledWith(expect.stringContaining("/api/v3/action/export"), expect.any(Object)));
    });
    test("a file upload", async () => {
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Upload" }));
      const input = await screen.findByLabelText("Upload player file");
      user.upload(input, new File(["file data"], "batters.csv", { type: "text/csv" }));
      await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(1));
      expect(postSpy).toHaveBeenCalledWith(expect.stringContaining("player=0&stats=0"), expect.any(FormData));
      expect(store.getState().notification.value).toHaveLength(2);
    });
    test("errors during a file upload error", async () => {
      mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Upload" }));
      const input = await screen.findByLabelText("Upload player file");
      user.upload(input, new File(["file data"], "pitchers.csv", { type: "text/csv" }));
      await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(1));
      expect(postSpy).toHaveBeenCalledWith(expect.stringContaining("player=0&stats=0"), expect.any(FormData));
      expect(store.getState().notification.value).toHaveLength(2);
    });
    test("upload dialog can be cancelled", async () => {
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Upload" }));
      await screen.findByLabelText("Upload player file");
      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
      await waitFor(() => expect(screen.queryByLabelText("Upload player file")).toBeNull());
      expect(postSpy).toHaveBeenCalledTimes(0);
    });
    test("upload uses selected player and stats types", async () => {
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Upload" }));

      fireEvent.mouseDown(screen.getByLabelText("Player Type"));
      fireEvent.click(await screen.findByRole("option", { name: "Pitcher" }));

      fireEvent.mouseDown(screen.getByLabelText("Stats Type"));
      fireEvent.click(await screen.findByRole("option", { name: "Projection" }));

      const input = await screen.findByLabelText("Upload player file");
      user.upload(input, new File(["file data"], "projection.csv", { type: "text/csv" }));

      await waitFor(() => expect(postSpy).toHaveBeenCalledTimes(1));
      expect(postSpy).toHaveBeenCalledWith(expect.stringContaining("player=2&stats=2"), expect.any(FormData));
    });
    test("a clear being cancelled", async () => {
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "No" }));
      await waitFor(() => expect(deleteSpy).toHaveBeenCalledTimes(0));
      expect(store.getState().notification.value).toHaveLength(0);
    });
    test("a clear being approved", async () => {
      mockedAxios.delete.mockImplementationOnce(() => Promise.resolve({}));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "Yes" }));
      await waitFor(() => expect(deleteSpy).toHaveBeenCalledTimes(1));
      expect(store.getState().notification.value).toHaveLength(2);
    });
    test("an error being thrown on clear", async () => {
      mockedAxios.delete.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(<TestWrapper />);
      fireEvent.click(screen.getByRole("button", { name: "Clear" }));
      fireEvent.click(screen.getByRole("button", { name: "Yes" }));
      await waitFor(() => expect(deleteSpy).toHaveBeenCalledTimes(1));
      expect(store.getState().notification.value).toHaveLength(2);
    });
  });
});
