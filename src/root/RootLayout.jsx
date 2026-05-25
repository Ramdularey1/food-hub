import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components"

const RootLayout = () => {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return <Navigate to="/sign-up" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      
    </>
  )
}

export default RootLayout
