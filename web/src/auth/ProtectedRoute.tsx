import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { IsLoggedIn, getUserRole, type role as UserRole } from "./auth";

interface PrivateRouteProps {
  children: ReactNode;
  role?: UserRole;
}

export default function PrivateRoute({
  children,
  role,
}: PrivateRouteProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      const logged = Boolean(await IsLoggedIn());
      const authorized = logged && (role === undefined || getUserRole() === role);

      if (!isMounted) {
        return;
      }

      setIsLogged(logged);
      setIsAuthorized(authorized);
      setLoading(false);
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [role]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
