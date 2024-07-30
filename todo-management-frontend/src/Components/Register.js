import { TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { register } from '../Services/TodoService';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [name1, setName1] = useState('');
    const [username1, setUsername1] = useState('');
    const [email1, setEmail1] = useState('');
    const [password1, setPassword1] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate('');

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Name validation
        if (!name1 || !/^[A-Za-z\s]+$/.test(name1)) {
            tempErrors.name = "Name should only contain letters and spaces.";
            isValid = false;
        }

        // Username validation
        if (!username1 || !/^[a-zA-Z0-9_-]{3,16}$/.test(username1)) {
            tempErrors.username = "Username should be alphanumeric, 3-16 characters long, and can include underscores or hyphens.";
            isValid = false;
        }

        // Email validation
        if (!email1 || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email1)) {
            tempErrors.email = "Email is not valid.";
            isValid = false;
        }

        // Password validation
        if (!password1 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password1)) {
            tempErrors.password = "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (validate()) {
            const user = { name: name1, username: username1, email: email1, password: password1 };
            register(user).then(response => {
                console.log(response);
                navigate('/todos');
            }).catch(err => console.error(err));
        }
    };

    return (
        <form>
            <center>
                <div style={{
                    marginTop: "30px", display: "flex", flexDirection: "column", alignItems: "center", border: "solid black 2px",
                    width: "500px", backgroundColor: "lightgoldenrodyellow"
                }}>
                    <Typography variant='h3' sx={{ width: "inherit", color: "rgba(255,255,255,1.0)", marginBottom: "-10px", backgroundColor: "rgba(255,0,0,0.6)" }}>Register</Typography>
                    <TextField
                        required
                        autoFocus
                        sx={{ width: "300px", marginTop: "50px" }}
                        placeholder='Enter your name'
                        label="name"
                        type="text"
                        onChange={e => setName1(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        required
                        autoFocus
                        sx={{ width: "300px", marginTop: "50px" }}
                        placeholder='Enter your username'
                        label="username"
                        type="text"
                        onChange={e => setUsername1(e.target.value)}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        required
                        autoFocus
                        sx={{ width: "300px", marginTop: "50px" }}
                        placeholder='Enter your email'
                        label="email"
                        type="text"
                        onChange={e => setEmail1(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        required
                        autoFocus
                        sx={{ width: "300px", marginTop: "50px" }}
                        placeholder='Enter your password'
                        label="password"
                        type="password"
                        onChange={e => setPassword1(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button onClick={handleRegister} type="submit" variant='contained' sx={{
                        width: "200px", marginTop: "50px", marginBottom: '50px', backgroundColor: "orange",
                        transitionProperty: "all", '&:hover': {
                            backgroundColor: "white",
                            color: "orange"
                        }
                    }}>Sign Up</Button>
                </div>
            </center>
        </form>
    )
}
