// import "./app.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import CoffeeShop from "./pages/CoffeeShop/CoffeeShop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/coffeeshops", element: <Search />},
      { path: "/coffeeshops/:coffeeName", element: <CoffeeShop />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
