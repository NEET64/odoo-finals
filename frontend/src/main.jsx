import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/HomePage.jsx";
import LoginForm from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Toaster
      gap="8"
      offset="20px"
      position="top-center"
      theme={"light"}
      richColors
    />
    <RouterProvider router={router} />
  </RecoilRoot>
);
