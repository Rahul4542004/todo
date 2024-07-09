import { Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { logIn, saveLoggedInUser, setToken } from '../Services/TodoService';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const validate = () => {
        let valid = true;
        if (name.trim() === '') {
            setNameError(true);
            valid = false;
        } else {
            setNameError(false);
        }

        if (password.trim() === '') {
            setPasswordError(true);
            valid = false;
        } else {
            setPasswordError(false);
        }

        return valid;
    };

    async function login(e) {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        
        const user = { usernameOrEmail: name, password: password };
        await logIn(user).then(response => {
            console.log(response.data);

            // const token = 'Basic ' + window.btoa(name + ":" + password);
            const token = 'Bearer ' + response.data.accessToken;
            setToken(token);
            saveLoggedInUser(name,response.data.role);
            navigate('/todos');

            window.location.reload(false);
        }).catch(err => {
            setFlag(true);
            console.error(err);
        });
    }

    return (
        <form>
            <center>
                <div style={{ marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center", border: "solid black 2px",
                    width: "500px", backgroundColor: "rgba(0,0,255,0.1)"
                }}>
                    <Typography variant='h3' sx={{ width: "inherit", color: "rgba(255,255,255,1.0)",
                        paddingTop: "5px", paddingBottom: "5px", marginBottom: "-10px", backgroundColor: "rgba(0,0,255,0.7)" }}>Login</Typography>
                    <TextField
                        name="username"
                        id="username"
                        type="text"
                        label="Username or Email"
                        required
                        autoFocus
                        sx={{ width: "300px", marginTop: "50px" }}
                        placeholder='Enter your username or email'
                        onChange={e => setName(e.target.value)}
                        error={nameError}
                        helperText={nameError ? 'Username or email is required' : ''}
                    />
                    <TextField
                        name="password"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        sx={{ width: "300px", marginTop: "50px" }}
                        required
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? 'Password is required' : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button onClick={login} type="submit" variant='contained' sx={{
                        width: "200px", marginTop: "50px", marginBottom: !flag ? '50px' : "10px",
                        transitionProperty: "all", '&:hover': {
                            backgroundColor: "white",
                            color: "blue"
                        }
                    }}>Sign In</Button>
                    {flag && <p style={{ color: "red", marginBottom: "50px" }}>Incorrect username or password</p>}
                </div>
            </center>
        </form>
    );
};
