import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Protected>Home Page</Protected>,
  },
]);
