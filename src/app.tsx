import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

import GlobalStyles from "@mui/material/GlobalStyles";
import type { GlobalStylesProps } from "@mui/material/GlobalStyles";
import GlobalTheme from "./global-theme";
import Home from "./pages/home";
import ImportExportData from "./pages/import-export-data";
import Layout from "./components/layout/layout";
import NotFound from "./pages/not-found";
import Players from "./pages/players";
import type { ReactElement } from "react";

const routes: RouteObject[] = [
  {
    path: "app",
    element: <Layout isLoggedIn={true} />,
    children: [
      { path: "home", element: <Home /> },
      { path: "import-export-data", element: <ImportExportData /> },
      { path: "players", element: <Players /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
  {
    path: "/",
    element: <Layout isLoggedIn={false} />,
    children: [
      { path: "not-found", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/home" /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
const styles: GlobalStylesProps["styles"] = {
  "*": { boxSizing: "border-box", margin: 0, padding: 0 },
  "#root": { height: "100%", width: "100%" },
  a: { textDecoration: "none" },
  body: { height: "100%", width: "100%" },
  html: { MozOsxFontSmoothing: "grayscale", WebkitFontSmoothing: "antialiased", height: "100%", width: "100%" },
};

export default function App(): ReactElement {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyles styles={styles} />
      <ThemeProvider theme={GlobalTheme()}>{useRoutes(routes)}</ThemeProvider>
    </StyledEngineProvider>
  );
}
