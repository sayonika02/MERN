import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header" style={{backgroundColor:"tomato",textAlign:'left'}}>
    <h3>&nbsp;</h3>
    <div style={{textAlign:"right"}}> 
    <button type="button" style={{height:"50px",width:"100px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
      <Link to="/" style={{fontSize:"1.2em"}}><b>Home</b></Link></button>&emsp;&emsp;
      <button type="button" style={{height:"50px",width:"100px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
    <Link to="/about" style={{fontSize:"1.2em"}}><b>About</b></Link></button>&emsp;&emsp;
    <button type="button" style={{height:"50px",width:"100px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
    <Link to="/FAQs" style={{fontSize:"1.2em"}}><b>FAQs</b></Link></button>&emsp;&emsp;
    <button type="button" style={{height:"50px",width:"105px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
    <Link to="/Franchise" style={{fontSize:"1.2em"}}><b>Franchise</b></Link></button>&emsp;&emsp; 
    </div>

    <h1 style={{font:"Gill Sans, sans-serif"}, {textAlign:"center"}}>VEGAN PIZZA PRESS</h1>
    <hr/>
  </header>
);

export default Header;
