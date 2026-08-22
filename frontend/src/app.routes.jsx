import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Protected from "./features/auth/components/Protected";
import NotePage from "./features/notes/pages/NotePage";
import NoteEditor from "./features/notes/components/NoteEditor";
import LandingPage from "./features/landing/pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <NotePage />
      </Protected>
    ),
  },
  {
    path: "/notes/create",
    element: (
      <Protected>
        <NoteEditor />
      </Protected>
    ),
  },
  {
    path: "/notes/:id/edit",
    element: (
      <Protected>
        <NoteEditor />
      </Protected>
    ),
  },
]);
