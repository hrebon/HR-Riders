import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../App";
import  { Breakpoint, BreakpointProvider } from 'react-socks';


import './Header.css';

const Header = () => {

    const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    }
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
  return (
    <Breakpoint customQuery="(min-width: 500px) and (max-width: 1400px)">
    <div className="header">
      <div>
        <h4 style={{padding:'10px'}}>HR-Riders</h4>
      </div>
      <Breakpoint customQuery="(min-width: 500px) and (max-width: 1400px)">
      <div className="navbar">
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/destination">Destination</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>

        <Link  onClick={handleLogin} >{loggedInUser.name ? loggedInUser.name : <Button className="primary">Login</Button> }</Link>
        </nav>
      </div>
      </Breakpoint>
    </div>
    </Breakpoint>
  );
};

export default Header;
