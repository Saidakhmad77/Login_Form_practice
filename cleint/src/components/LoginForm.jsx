import { useState } from 'react';
import axios from "axios";
import "./LoginForm.css";

function Registration(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5001/register", {
                username,
                password,
                email,
            })
            console.log(response.status);
        } catch (error) {
            console.log(error)
        }
    };

    return(
        <>
        <div className='login-form-container'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input 
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <button type='submit' className='register-btn'>Register</button>

            </form>
        </div>
        </>
    )
};


export default Registration;
