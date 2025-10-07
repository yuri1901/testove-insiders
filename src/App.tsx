import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/ContextAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import HomePage from "./pages/home/page";
import RoomPage from "./pages/room/page";
import BookingPage from "./pages/booking/page";
import AuthPage from "./pages/auth/page";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<HomePage />}
            />

            <Route
              path="/rooms"
              element={
                <ProtectedRoute>
                  <RoomPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/auth"
            element={<AuthPage />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
