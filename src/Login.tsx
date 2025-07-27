import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Alert,
} from "@mui/material";

type TLoginProps = {
  onLogin: (token: string) => void;
};

type LoginRequest = {
  email: string;
  password: string;
};

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const Login = ({ onLogin }: TLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const payload: LoginRequest = { email, password };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
        return;
      }

        const data = await res.json();


      if (!res.ok) {
        throw new Error(`Login failed with status ${res.status}`);
      }
      onLogin(data.token);
      navigate("/news");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100vw" }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Container>
    </Stack>
  );
};

export default Login;
