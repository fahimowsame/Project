import { Header } from "../Components";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Layout() {
  return (
    <div className="h-screen max-w-screen-lg mx-auto px-4 flex flex-col">
      <div className="navbar">
        <Header />
      </div>
      <div className="content flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className=" max-w-screen-lg mx-auto px-4 flex flex-col">
        {/* <div className="navbar">
          <Header />
        </div> */}
        <div className="content flex-1">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
