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

type TRegisterProps = {
  onRegister: (token: string) => void;
};

type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const API_BASE = import.meta.env.REGISTER_API_URL ?? "http://localhost:8080";

console.log(API_BASE)

const Register = ({ onRegister }: TRegisterProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");

  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    const payload: RegisterRequest = {
      firstName,
      lastName,
      email,
      password,
    };

    console.log(payload);

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Registration failed with status ${res.status}`);
      }
        const data = await res.json();
      onRegister(data.token);
        navigate("/news");
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
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
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            margin="normal"
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
          disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Container>
    </Stack>
  );
};

export default Register;
