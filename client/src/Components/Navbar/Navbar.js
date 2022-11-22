import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from 'jwt-decode'

import useStyles from './styles';
import memoriesText from '../../images/memories-Text.png'
import memoriesLogo from '../../images/memories-Logo.png'
import { useDispatch } from 'react-redux';


export const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/");
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="Memories txt Icon" height="40px" />
                <img className={classes.image} src={memoriesLogo} alt="Memories logo Icon" height="35px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) :
                    (
                        <Button component={Link} to="/auth" variant='contained' color="primary">Signin</Button>
                    )}
            </Toolbar>

        </AppBar>
    )
}
