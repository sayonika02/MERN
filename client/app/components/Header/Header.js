import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header" style={{backgroundColor:"#ff726f",textAlign:'right'}}>
    <Link to="/" style={{fontSize:"1.2em"}}>Home</Link><b>&emsp;&emsp;<br/></b>
    <nav>
      <Link to="/about" style={{fontSize:"1.2em"}}>About</Link><b>&emsp;&emsp;<br/></b>
    </nav>
    <nav>
      <Link to="/cart" style={{fontSize:"1.2em"}}>Cart</Link><b>&emsp;&emsp;</b>
    </nav>

    <h1 style={{font:"Gill Sans, sans-serif"}, {textAlign:"center"}}>VEGAN PIZZA PRESS</h1>
    <hr/>
  </header>
);

export default Header;
