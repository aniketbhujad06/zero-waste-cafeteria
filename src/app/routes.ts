import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MessOwner from "./pages/MessOwner";
import Admin from "./pages/Admin";
import NGO from "./pages/NGO";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        {
          index: true,
          Component: Landing,
        },
        {
          path: "login",
          Component: Login,
        },
        {
          path: "admin/dashboard",
          Component: Admin,
        },
        {
          path: "mess-owner/dashboard",
          Component: MessOwner,
        },
        {
          path: "ngo/dashboard",
          Component: NGO,
        },
        {
          path: "*",
          Component: NotFound,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);