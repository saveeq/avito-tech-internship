import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdsPage } from '@/pages/AdsPage';
import { AdDetailPage } from '@/pages/AdDetailPage';
import { AdEditPage } from '@/pages/AdEditPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/ads" replace />,
  },
  {
    path: '/ads',
    element: <AdsPage />,
  },
  {
    path: '/ads/:id',
    element: <AdDetailPage />,
  },
  {
    path: '/ads/:id/edit',
    element: <AdEditPage />,
  },
]);
