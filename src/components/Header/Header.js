import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link, useNavigate} from "react-router-dom";
import {useGlobalState} from "../../StateAuth";
import {Logout} from "../../Services/Auth/Auth-services";

const ResponsiveAppBar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [isAuthenticated] = useGlobalState("isAuth")

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            <MenuItem>
                                <Typography textAlign="center">
                                    <Link style={{textDecoration: "none", color: "black"}} to="/">
                                        Employee
                                    </Link>
                                </Typography>
                            </MenuItem>


                            <MenuItem>
                                <Typography textAlign="center">
                                    <Link style={{textDecoration: "none", color: "black"}} to="/users">
                                        Users
                                    </Link>
                                </Typography>
                            </MenuItem>

                            <MenuItem>
                                <Typography textAlign="center">
                                    <Link style={{textDecoration: "none", color: "black"}} to="/vastused" >
                                        Vastused.ee
                                    </Link>
                                </Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Employee
                    </Typography>
                    {isAuthenticated ? (
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link style={{textDecoration: "none", color: "white"}} to="/">
                                    Employee
                                </Link>
                            </Button>

                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link style={{textDecoration: "none", color: "white"}} to="/users">
                                    Users
                                </Link>
                            </Button>

                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link style={{textDecoration: "none", color: "white"}} to="/vastused">
                                    Content
                                </Link>
                            </Button>


                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => Logout(navigate)}>
                                Logout
                            </Button>
                        </Box>
                    ):(
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link style={{textDecoration: "none", color: "white"}} to="/login">
                                    Sign in
                                </Link>
                            </Button>

                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link style={{textDecoration: "none", color: "white"}} to="/registration">
                                    Sign up
                                </Link>
                            </Button>

                        </Box>



                    )}




                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
