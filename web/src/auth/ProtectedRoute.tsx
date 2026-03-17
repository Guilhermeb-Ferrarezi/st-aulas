import { Navigate } from "react-router-dom"
import { useEffect, useState, type ReactNode } from 'react';
import { IsLoggedIn } from "./auth";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await IsLoggedIn()
      setIsLogged(logged!)
      setLoading(false)
    }
    checkLogin()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!isLogged) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}