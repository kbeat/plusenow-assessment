import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Protected({ children }: Props) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}
