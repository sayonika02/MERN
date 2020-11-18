import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <Link to="/" style={{fontSize:"1.2em"}}>Home</Link>

    <nav>
      <Link to="/about" style={{fontSize:"1.2em"}}>about</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
