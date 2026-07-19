import { createBrowserRouter, RouterProvider } from "react-router";
import {
  About,
  Authentication,
  Cart,
  Contact,
  Error,
  ForgotPassword,
  Home,
  ManageAccount,
  PaymentOptions,
  ProductDetails,
  Products,
  Security,
  Verification,
  VerifyEmail,
  Wishlist,
} from "@Routers/index";
import { AccountLayout, Layout } from "@Layouts/index";
import {
  AuthProvider,
  RouteTransitionProvider,
  UserProvider,
} from "@Contexts/index";
import ProtectedRoute from "@Authentication/ProtectedRoute";
import { ProductsProvider } from "@Contexts/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "auth",
        element: <Authentication />,
      },
      {
        path: "product/:id/*",
        element: <ProductDetails />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ManageAccount />,
          },
          {
            path: "verification",
            element: <Verification />,
          },
          {
            path: "payments",
            element: <PaymentOptions />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "returns",
            element: <h1>My Returns</h1>,
          },
          {
            path: "cancellations",
            element: <h1>My Cancellations</h1>,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <ProductsProvider>
      <UserProvider>
        <AuthProvider>
          <RouteTransitionProvider>
            <RouterProvider router={router} />
          </RouteTransitionProvider>
        </AuthProvider>
      </UserProvider>
    </ProductsProvider>
  );
}

export default App;
