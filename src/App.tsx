import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import HomePage from "./pages/home/page";
import RoomPage from "./pages/room/page";
import BookingPage from "./pages/booking/page";
import AuthPage from "./pages/auth/page";

const App = () => {
  return (
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
            element={<RoomPage />}
          />
          <Route
            path="/bookings"
            element={<BookingPage />}
          />
        </Route>
        <Route
          path="/auth"
          element={<AuthPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
