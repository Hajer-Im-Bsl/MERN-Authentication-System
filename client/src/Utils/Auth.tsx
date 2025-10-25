import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
type Props = {};

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const { exp } = jwtDecode(token);
  if (exp! * 1000 > Date.now())
    return true; //! added only to satisfy typescript
  else {
    localStorage.clear();
    return false;
  }
};

function Auth({}: Props) {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
}

export default Auth;
