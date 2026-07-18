import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/Landing/LandingPage";
import { BookingForm } from "./pages/BookingForm/BookingForm";
import { AdminView } from "./pages/Admin/AdminView";
import { MainLayout } from "./MainLayout";

export const routes = createBrowserRouter([
    {
      path: "/",
      Component: MainLayout,
      children: [
        { index: true, Component: LandingPage },
        { path: "booking-form", Component: BookingForm },
        {
          path: "admin",
          Component: AdminView,
        //   children: [
        //     { path: "login", Component: Login },
        //     { path: "register", Component: Register },
        //   ],
        },
      ],
    },
  ]);