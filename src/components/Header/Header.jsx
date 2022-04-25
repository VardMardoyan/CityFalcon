import React from 'react';
import './Header.css'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/cityfalcon_logo.png';
import user from "../../assets/user.webp";


function Header() {
    return (
        <React.Fragment>
            <Box className='header-container' sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <img className="logo" src={logo} alt="logo" />          
                        </Typography>
                        <Button color="inherit">
                        <img className="user" src={user} alt="user" />          
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    )
}

export default Header