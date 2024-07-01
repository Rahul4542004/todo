import { TextField,Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { register } from '../Services/TodoService'
import { useNavigate } from 'react-router-dom';
export const Register = () => {
  const [name1,setName1] = useState('');
  const [username1,setUsername1] = useState('');
  const [email1,setEmail1] = useState('');
  const [password1,setPassword1] = useState('');
  const navigate = useNavigate('');
  function Register(e){
    e.preventDefault();
    const user = {name : name1,username : username1,email : email1,password : password1};
    register(user).then(response => {
      console.log(response);
      navigate('/todos');
    }).catch(err => console.error(err))
  }
  return (
    <form>
      <center>
      <div style={{marginTop : "30px",display : "flex",flexDirection : "column",alignItems : "center",border : "solid black 2px",
                    width : "500px",backgroundColor : "rgba(128,128,128,0.2)"
        }}>
        <Typography variant='h3' sx={{color : "rgba(255,0,0,0.8)",marginBottom : "-10px",marginTop : "10px"}}>Register</Typography>
        <TextField 
          required
          autoFocus
          sx = {{width : "300px",marginTop : "50px"}}
          placeholder='Enter your name'
          label = "name"
          type = "text"
          onChange={e => setName1(e.target.value)}
        />
        <TextField 
          required
          autoFocus
          sx = {{width : "300px",marginTop : "50px"}}
          placeholder='Enter your username'
          label = "username"
          type = "text"
          onChange={e => setUsername1(e.target.value)}
        />
        <TextField 
          required
          autoFocus
          sx = {{width : "300px",marginTop : "50px"}}
          placeholder='Enter your email'
          label = "email"
          type = "text"
          onChange = {e => setEmail1(e.target.value)}
        />
        <TextField 
          required
          autoFocus
          sx = {{width : "300px",marginTop : "50px"}}
          placeholder='Enter your password'
          label = "password"
          type = "password"
          onChange={e => setPassword1(e.target.value)}
        />
        <Button onClick={Register} type = "submit" variant='contained' sx={{width : "200px",marginTop : "50px",marginBottom :  '50px',backgroundColor : "orange",
            transitionProperty : "all", '&:hover' : {
                backgroundColor : "white",
                color : "orange"
            }
        }}>sign up</Button>
      </div>
      </center>
    </form>
  )
}
