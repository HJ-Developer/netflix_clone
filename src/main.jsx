import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import Player from "./components/Player";

const Menu = lazy(() => import("./components/Menu"));
const Home = lazy(() => import("./routes/Home"));
const Sign = lazy(() => import("./routes/Sign"));

const App = (props) => {
  return (
    <>
      <RecoilRoot>
        <Menu />
        <Suspense>
          <main id="mainContainer">
            <Outlet />
          </main>
          <Footer />
        </Suspense>
      </RecoilRoot>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HelmetProvider>
        <App />
      </HelmetProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign",
        element: <Sign />,
      },
      {
        path: "/movies",
        element: <Player />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
