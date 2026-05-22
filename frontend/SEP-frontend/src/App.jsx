import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import GenerateIdeaPage from "./pages/GenerateIdeaPage";
import BusinessPlanPage from "./pages/BusinessPlanPage";
import SavedIdeasPage from "./pages/SavedIdeasPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EditIdeaPage from "./pages/EditIdeaPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/generate-idea"
        element={
          <ProtectedRoute>
            <GenerateIdeaPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/business-plan"
        element={
          <ProtectedRoute>
            <BusinessPlanPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/business-plan/:ideaId"
        element={
          <ProtectedRoute>
            <BusinessPlanPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved-ideas"
        element={
          <ProtectedRoute>
            <SavedIdeasPage />
          </ProtectedRoute>
        }
      />

      <Route path="/edit-idea/:id" element={<EditIdeaPage />} />
    </Routes>
  );
}

export default App;
