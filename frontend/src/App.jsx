import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import AddArticle from "./components/AddArticle";
import Home from "./components/Home";
import './index.css'
import AdminDashboard from "./components/AdminDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import ArticleDetail from "./components/ArticleDetail";
import ArticleCard from "./components/ArticleCard";
import { useAuthStore } from "./services/authService";
import { useEffect } from "react";

// Layout component that includes Header and auth refresh
function Layout() {
  const refresh = useAuthStore((state) => state.refresh);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "add-article",
        element: <AddArticle />
      },
      {
        path: "AdminDashboard",
        element: <AdminDashboard />
      },
      {
        path: "author-dashboard",
        element: <AuthorDashboard />
      },
      {
        path: "article/:id",
        element: <ArticleDetail />
      },
      {
        path: "article-card/:id",
        element: <ArticleCard />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;