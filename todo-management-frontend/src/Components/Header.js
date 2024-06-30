import React from 'react'
import {Box,AppBar,Toolbar,Typography, Button} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
export const Header = ({logIn,name}) => {
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static" >
        <Toolbar>
          <Typography  variant="h4" sx = {{marginLeft : "525px"}}component="div">
            Todo Management System
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!logIn ?
          <>
            <Button onClick = {() => navigate('/login')} variant="text" sx={{color : "white",fontSize : "20px"}}>Login</Button>
            <Button onClick = {() => navigate('/register')} variant='text' sx={{color : "white",fontSize : "20px"}}>Register</Button>
          </>
          :
          <>
            <AccountBoxIcon sx={{fontSize : "40px"}}/>
            <Typography variant='h5'>{name}</Typography>
          </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
