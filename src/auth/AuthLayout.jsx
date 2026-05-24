import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet/>
    </>
  )
}

export default AuthLayout;