import React, {useState, useEffect} from "react";
import logo from '../assets/mando1.png'
import './Navbar.css'

export function Menu(){
    return(
        <div className="Menu">
            <nav>
                <ul className="menu-left">
                    <li>
                        <a href="/offers">OFFFERS</a>
                    </li>
                    <li>
                        <a href="/games">GAMES</a>
                    </li>
                </ul>
                <div className="menu-center">
                    <a href="/"><img className="logo" src={logo} alt="" /></a>
                </div>
                <ul className="menu-right">
                    <li>
                        <a href="/sources">SOURCES</a>
                    </li>
                    <li>
                        <a href="/about">ABOUT</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}