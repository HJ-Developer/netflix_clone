import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/pages.css";
import "./assets/components.css";
import "./assets/palette.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";

const Menu = lazy(() => import("./components/Menu"));
const Home = lazy(() => import("./routes/Home"));
const Sign = lazy(() => import("./routes/Sign"));

const App = (props) => {
  return (
    <>
      <Menu />
      <Suspense>
        <main id="mainContainer">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign",
        element: <Sign />,
      },
      // {
      //   path: "/signup",
      //   element: <Signup />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
