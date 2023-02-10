import React from 'react'
import './Login_register.css';

export default function Login_register({ handleClick }) {
    return (
        <div id="nav">
            <a id="log" href='#' onClick={event => {
                document.getElementById("log").style.padding = "4px 5vw 1vh 5vw";
                document.getElementById("log").style.background = "dimgray";
                document.getElementById("regs").style.background = "goldenrod";
                handleClick(0);
            }}>Login</a>

            <a id="regs" href='#' onClick={event => {
                document.getElementById("regs").style.padding = "4px 5vw 1vh 5vw";
                document.getElementById("regs").style.background = "dimgray";
                document.getElementById("log").style.background = "goldenrod";
                handleClick(1)
            }}>Register</a>
        </div>
    )
}
