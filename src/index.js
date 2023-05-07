import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";

const router = createHashRouter();

router.addRoutes([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/app",
    element: <App />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);


/*const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);*/