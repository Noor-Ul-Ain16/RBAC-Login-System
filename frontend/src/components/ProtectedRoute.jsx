import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  // Not logged in
  if (!token) {
    return <Navigate to="/" />;
  }


  // Role not allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role_name)
  ) {
    return <Navigate to={`/${user.role_name.toLowerCase()}`} />;
  }


  return children;
}


export default ProtectedRoute;