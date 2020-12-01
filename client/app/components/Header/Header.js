import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header" style={{backgroundColor:"#ff726f"}}>
    <Link to="/" style={{fontSize:"1.2em"}}>Home</Link>
    <nav>
      <Link to="/about" style={{fontSize:"1.2em"}}>about</Link>
    </nav>

    <h1 style={{font:"Gill Sans, sans-serif"}, {textAlign:"center"}}>VEGAN PIZZA PRESS</h1>

    <hr />
  </header>
);

export default Header;
