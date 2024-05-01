import { Suspense, lazy } from "react";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import store from "./lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "./lib/shadcn/ui/toaster";
import Payment from "./root/pages/Payment";
import RestaurantCardShimmer from "./components/shimmers/RestaurantCardShimmer";
import RestaurantMenuShimmer from "./components/shimmers/RestaurantMenuShimmer";
import Loader from "./components/shared/Loader";
import HomeShimmer from "./components/shimmers/HomeShimmer";
import Home from "./root/pages/Home"
const Signin = lazy(() => import("./auth/forms/Signin"));
const Signup = lazy(() => import("./auth/forms/Signup"));
const Offers = lazy(() => import("./root/pages/Offers"));
const Support = lazy(() => import("./root/pages/Support"));
const NotFound = lazy(() => import("./root/pages/Not-Found"));
const Cart = lazy(() => import("./root/pages/Cart"));
const Search = lazy(() => import("./root/pages/Search"));
const RestaurantCollections = lazy(() => import("./root/pages/RestaurantCollections"));
const RestaurantMenu = lazy(() => import("./root/pages/RestaurantMenu"));

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <Suspense fallback={<Loader/>}><Signin /></Suspense>
      },
      {
        path: "/sign-up",
        element: <Suspense fallback={<Loader/>}><Signup /></Suspense>
      }
    ]
  },
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home fallback={ <HomeShimmer/> } />,
      },
      {
        path: "/collections/:collectionId",
        element: <Suspense fallback={ <RestaurantCardShimmer/> } ><RestaurantCollections /></Suspense>
      },
      {
        path: "/restaurant/:restaurantID",
        element: <Suspense fallback={ <RestaurantMenuShimmer/> }><RestaurantMenu /></Suspense>
      },
      {
        path: "/offers-near-me",
        element: <Suspense fallback={<Loader/>}><Offers /></Suspense>
      },
      {
        path: "/support",
        element: <Suspense fallback={<Loader/>}><Support /></Suspense>
      },
      {
        path: "/checkout",
        element: <Suspense fallback={<Loader/>}><Cart /></Suspense>
      },
      {
        path: "/search",
        element: <Suspense fallback={<Loader/>}><Search /></Suspense>
      },
    ]
  },
  {
    element: <Payment />,
    path: "/payments"
  }, 

  {
    path : "*",
    element : <NotFound />
  }
])

const App = () => {
  return (
    <main className="bg-black">
      <ReduxProvider store={store} >
        <RouterProvider router={router}>
        </RouterProvider>
      </ReduxProvider >
      <Toaster />
    </main>
  )
}

export default App