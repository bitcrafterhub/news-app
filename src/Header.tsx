import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { memo, useCallback, type JSX } from "react";
import logoutimage from "./assets/logout.png"
import { useNavigate } from "react-router-dom";

type Tprops = {
    onLogout: () => void;
}
const Header = memo((props: Tprops): JSX.Element => {
    const {onLogout} = props;
    const navigate = useNavigate();

    const handleLogoutButtonClick  = useCallback(()=>{
        onLogout;
        navigate("/firstPage");

    },[])

    return  (
        <AppBar color="secondary">
            <Stack direction="row" justifyContent="space-between">
                <Toolbar>
                    <Typography variant="h6">News Reader</Typography>
                </Toolbar>
                <Button onClick={handleLogoutButtonClick}>
                    <img 
                        src={logoutimage}
                        style={{ width: "1.7vw", height: "3vh" }}
                    />
                </Button>
                
            </Stack>
           
        </AppBar>
    )
});

export default Header