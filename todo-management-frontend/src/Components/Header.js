import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Typography, Button, Menu, MenuItem} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, getUsername, isUserLoggedIn, logout } from '../Services/TodoService';
export const Header = () => {
  const isAuth = isUserLoggedIn();
  const [name,setName] = useState(null);
  const [anchorEl,setAnchorEl] = useState(null);
  getUsername().then(response => setName(response.data));
  function handleMenuClick(e){
    setAnchorEl(e.currentTarget);
  }
  function handleMenuClose(){
    setAnchorEl(null);
  }
  function handleLogout(){
    logout();
  }
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static" >
        <Toolbar>
          <Typography  variant="h4" sx = {{marginLeft : "525px"}}component="div">
            Todo Management System
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!isAuth ?
          <>
            <Button onClick = {() => navigate('/login')} variant="text" sx={{color : "white",fontSize : "20px"}}>Login</Button>
            <Button onClick = {() => navigate('/register')} variant='text' sx={{color : "white",fontSize : "20px"}}>Register</Button>
          </>
          :
          <>
            <AccountBoxIcon sx={{fontSize : "40px"}}/>
            <Typography sx={{display:"flex",justifyContent:"center"}} onClick = {handleMenuClick} variant='h5'>{name}<ArrowDropDownIcon sx={{fontSize:"30px"}}/></Typography>
            <Menu
              open = {Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose = {handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
