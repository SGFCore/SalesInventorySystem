import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/navbar/Navbar";
import { AppSidebar } from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      {/* Navbar nằm trên cùng */}
      <Navbar />

      {/* Flex row: Sidebar + Main content */}
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-0">{children}</main>
      </div>
    </div>
  );
};
