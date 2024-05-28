import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { PrivateRoutes, PublicRoute } from "./hooks/use-protected-route";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <React.Suspense fallback={<p>Loading...</p>}>
                <HomePage />
              </React.Suspense>
            }
            path="/"
          />
        </Route>
        <Route element={<PublicRoute />}>
          <Route
            element={
              <React.Suspense fallback={<p>Loading...</p>}>
                <LoginPage />
              </React.Suspense>
            }
            path="/login"
          />
        </Route>
        <Route element={<PublicRoute />}>
          <Route
            element={
              <React.Suspense fallback={<p>Loading...</p>}>
                <RegisterPage />
              </React.Suspense>
            }
            path="/register"
          />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <React.Suspense fallback={<p>Loading...</p>}>
                <ProfilePage />
              </React.Suspense>
            }
            path="/profile"
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
