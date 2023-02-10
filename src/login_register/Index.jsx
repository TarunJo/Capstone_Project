import React, { useState } from 'react';
import Login_register from './Login_register';
import './Index.css';
import axios, * as others from 'axios';


export default function Index({ handleLogin }) {
    // Conditional rendering states
    var [state, setState] = useState(0);
    const handleClick = (e) => {
        setState(e);
    }

    // Login creds
    const [email, loginEmail] = useState("");
    const [Pswd, loginPswd] = useState("");

    const checkLogin = async (email, pswd) => {
        console.log("Debug");
        try {
            const newPost = {
                email: email,
                password: pswd
            };
            const result = await axios.post("https://capstone-project-1e610-default-rtdb.firebaseio.com/weather_hub.json/logIn", newPost);
            handleLogin(email,true);

        } catch (error) {
            alert("Wrong Id or Password!");
            console.log(error);
        }
    }


    //register creds
    var [ID, regId] = useState("");
    var [NAME, regName] = useState("");
    var [PSWD1, regPswd1] = useState("");

    const createPost = async (name, email, pswd) => {
        try {
            const newPost = {
                name: name,
                email: email,
                password: pswd
            };
            await axios.post("https://capstone-project-1e610-default-rtdb.firebaseio.com/weather_hub.json/registerUser", newPost)
            alert("Regestered!");
        } catch (error) {
            alert("User id already exists!");
            console.log(error);
        }
    }

    function Register(e) {
        e.preventDefault();

        createPost(NAME, ID, PSWD1);

        setState(0);
    }

    if (state === 0) {
        return (
            <div id="body">
                <div id="top"><a id="toptxt" href='#'>Welcome to Weather Hub</a></div>
                <div id="container">
                    <Login_register handleClick={handleClick}></Login_register>
                    <form onSubmit={(e) => { e.preventDefault(); checkLogin(email, Pswd); }}><br />
                        User Id: <br /><input className='fields' type="text" name="loginid" placeholder="User Id" onChange={(e) => { loginEmail(e.target.value) }} required></input><br /><br /><br />

                        Password: <br /><input className='fields' type="password" name="loginpswd" placeholder="Password" onChange={(e) => { loginPswd(e.target.value) }} required></input><br /><br />
                        <br />

                        <input id="button" type="submit" value="Log-In"></input>
                    </form>
                </div>
            </div>
        )
    }
    else {
        return (
            <div id="body">
                <div id="top"><a id="toptxt" href='#'>Welcome to Weather Hub</a></div>
                <div id="container">
                    <Login_register handleClick={handleClick}></Login_register>
                    <form onSubmit={Register}>
                        Full Name: <br /><input className='fields' type="text" name="regname" placeholder="Full Name" onChange={(e) => { regName(e.target.value) }} required></input><br /><br />

                        User Id: <br /><input className='fields' type="text" name="regid" placeholder="User Id" onChange={(e) => { regId(e.target.value) }} required></input><br /><br />

                        Password: <br /><input className='fields' type="password" name="regpswd1" placeholder="Password" onChange={(e) => { regPswd1(e.target.value) }} required></input><br /><br />

                        <input id="button" type="submit" value="Register"></input>
                    </form>
                </div>
            </div>
        )
    }
}
