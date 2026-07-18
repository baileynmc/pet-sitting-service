import { createHashRouter } from 'react-router';
import { LandingPage } from './pages/Landing/LandingPage';
import { BookingForm } from './pages/BookingForm/BookingForm';
import { AdminView } from './pages/Admin/AdminView';
import { MainLayout } from './MainLayout';

export const routes = createHashRouter(
  [
    {
      path: '/',
      Component: MainLayout,
      children: [
        { index: true, Component: LandingPage },
        { path: 'book', Component: BookingForm },
        {
          path: 'admin',
          Component: AdminView,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.DEV ? '/' : '/pet-sitting-service',
  },
);
