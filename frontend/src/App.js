import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NutritionPlan from './pages/NutritionPlan';
import CreateNutritionPlan from './pages/CreateNutritionPlan';
import WorkoutPlan from './pages/WorkoutPlan';
import CreateWorkoutPlan from './pages/CreateWorkoutPlan';
import Progress from './pages/Progress';
import Community from './pages/Community';
import GroupDetail from './pages/GroupDetail';
import CreateGroup from './pages/CreateGroup';
import AiAssistant from './pages/AiAssistant';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <>
      <Routes>
        {/* Ana Sayfa */}
        <Route path="/" element={<Home />} />
      
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nutrition" element={<NutritionPlan />} />
          <Route path="/nutrition/create" element={<CreateNutritionPlan />} />
          <Route path="/workout" element={<WorkoutPlan />} />
          <Route path="/workout/create" element={<CreateWorkoutPlan />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/groups/:id" element={<GroupDetail />} />
          <Route path="/community/create-group" element={<CreateGroup />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;