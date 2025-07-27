import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import NewsReader from "./NewsReader";
import FirstPage from "./FirstPage";
import Register from "./Register";

function App() {
  // Initialize login state based on localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("authToken"));

  // Update login state when token changes
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  // Handle login success
  const handleLogin = (token: string) => {
    localStorage.setItem("authToken", token); // store token
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/firstPage" replace />} />
        <Route path="/firstPage" element={<FirstPage />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/news"
          element={isLoggedIn ? <NewsReader onLogout ={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/firstPage" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
