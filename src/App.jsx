import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/HomePage";
import AppLayout from "./ui/AppLayout";
import Index from "./pages";
import Hotels from "./features/hotels/Hotels";
import HotelDetail, {
  loader as hotelLoader,
} from "./features/hotels/HotelDetail";
import Bookmarks from "./pages/Bookmarks";
import MyReservations from "./pages/MyReservations";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "hotels",
        element: <Hotels />,
      },
      {
        path: "hotels/:id",
        element: <HotelDetail />,
        loader: hotelLoader,
      },
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "reservations",
        element: <MyReservations />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
