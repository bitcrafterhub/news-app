import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useCallback } from "react";


const FirstPage = () => {
    const navigate = useNavigate();

    const handleLoginButtonClick  = useCallback(() => {
         navigate("/login");

    } ,[])

    const handleRegisterButtonClick  = useCallback(() => {
         navigate("/register");

    } ,[])

   

    return (
        <Stack 
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: "100vw"
            }}
        >

            <Box sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to News Recommendation 
                </Typography>
                <Button
                    onClick={handleRegisterButtonClick}
                >
                    Create an Account
                </Button>
                <Button
                    onClick={handleLoginButtonClick}
                >
                   Login
                </Button>
            </Box>
        </Stack>
    );
};

export default FirstPage;
