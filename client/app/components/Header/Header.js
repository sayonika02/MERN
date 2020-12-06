import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header" style={{backgroundColor:"#ff726f",textAlign:'left',display:"flex"}}>
    <h3>&nbsp;</h3>
    <Link to="/">
    <img src="https://i.pinimg.com/originals/18/21/03/1821037f32099913de86be3298894d92.jpg" style={{height:"100px",width:"125px",borderRadius:"50%"}}></img></Link>
    <h1 style={{fontFamily:"cursive",textAlign:"center",marginLeft:"375px"}}>VEGAN PIZZA PRESS</h1>
    <div style={{textAlign:"center",marginLeft:"10%"}}> 
    <button type="button" style={{height:"50px",width:"100px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
      <Link to="/" style={{fontSize:"1.2em", textDecoration:"none"}}><b>Home</b></Link></button>&emsp;&emsp;
      <button type="button" style={{height:"50px",width:"100px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
    <Link to="/about" style={{fontSize:"1.2em", textDecoration:"none"}}><b>About</b></Link></button>&emsp;&emsp;
    <button type="button" style={{height:"50px",width:"100px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
    <Link to="/FAQs" style={{fontSize:"1.2em", textDecoration:"none"}}><b>FAQs</b></Link></button>&emsp;&emsp;
    <button type="button" style={{height:"50px",width:"105px",backgroundColor:"darkorange",borderRadius:"12.5px"}}>
    <Link to="/Franchise" style={{fontSize:"1.2em", textDecoration:"none"}}><b>Franchise</b></Link></button>&emsp;&emsp; 
    </div>

    
    <hr/>
  </header>
);

export default Header;
