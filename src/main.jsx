import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import Player from "./components/Player";
import { ToastContainer } from "react-toastify";

const Menu = lazy(() => import("./components/Menu"));
const Home = lazy(() => import("./routes/Home"));
const Sign = lazy(() => import("./routes/Sign"));
const Subscription = lazy(() => import("./routes/Subscription"));
const Checkout = lazy(() => import("./routes/Checkout"));
const Account = lazy(() => import("./routes/Account"));

const App = (props) => {
  return (
    <>
      <RecoilRoot>
        <Menu />
        <Suspense>
          <main id="mainContainer">
            <Outlet />
            <ToastContainer />
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
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
