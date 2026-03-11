import { RouterProvider, Navigate } from "react-router";
import { createBrowserRouter } from "react-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GuestLanding } from "./pages/GuestLanding";
import { Dashboard } from "./pages/Dashboard";
import { Questions } from "./pages/Questions";
import { Settings } from "./pages/Settings";
import { ProblemDetail } from "./pages/ProblemDetail";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function DashboardWrapper() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function ProblemDetailWrapper() {
  return (
    <ProtectedRoute>
      <ProblemDetail />
    </ProtectedRoute>
  );
}

function QuestionsWrapper() {
  return (
    <ProtectedRoute>
      <Questions />
    </ProtectedRoute>
  );
}

function SettingsWrapper() {
  return (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  );
}

function GuestLandingWrapper() {
  return (
    <PublicRoute>
      <GuestLanding />
    </PublicRoute>
  );
}

function LoginWrapper() {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  );
}

function SignupWrapper() {
  return (
    <PublicRoute>
      <Signup />
    </PublicRoute>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: GuestLandingWrapper,
  },
  {
    path: "/login",
    Component: LoginWrapper,
  },
  {
    path: "/signup",
    Component: SignupWrapper,
  },
  {
    path: "/dashboard",
    Component: DashboardWrapper,
  },
  {
    path: "/questions",
    Component: QuestionsWrapper,
  },
  {
    path: "/settings",
    Component: SettingsWrapper,
  },
  {
    path: "/problem/:id",
    Component: ProblemDetailWrapper,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}