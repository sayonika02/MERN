import { urlencoded } from 'body-parser';
import React, { Component } from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';

import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage.js';


class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      pizzaname: '',
      fullname: '',
      mnumber: '',
      address: '',
      pizzanamefilled:false,
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.pizzaNameChange = this.pizzaNameChange.bind(this);
    this.fullnameChange = this.fullnameChange.bind(this);
    this.mnumberChange = this.mnumberChange.bind(this);
    this.addressChange = this.addressChange.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  pizzaNameChange(e) {
    this.setState(
      {[e.target.name]:e.target.value}
    )
  }

  fullnameChange(e) {
    this.setState(
      {[e.target.name]:e.target.value}
    )
  }

  mnumberChange(e) {
    this.setState(
      {[e.target.name]:e.target.value}
    )
  }

  addressChange(e) {
    this.setState(
      {[e.target.name]:e.target.value}
    )
  }

  checkout(e) {
    if(this.state.pizzaname !== "") {
      this.setState({
        pizzanamefilled:true
      })
    }
    // Post request to backend
    fetch('/api/account/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pizza: this.state.pizzaname,
        fullname: this.state.fullname,
        mnumber: this.state.mnumber,
        address: this.state.address,
      })
    })
    .then(res => res.json())
    .then(json => console.log(json));
  }


  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',       //if successful clear the textareas
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Get state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    //get state
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token 
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div className="home" style={{marginLeft: "40%"}}>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              style={{
                height:"30px", width:"300px",
                border:"2px solid #FFB6C1",
              }}
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              style={{
                height:"30px", width:"300px",
                border:"2px solid #FFB6C1",
              }}
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <br/>
            <button style={{height:"40px",width:"150px",backgroundColor:"#ff726f",borderRadius:"5px"}} onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input 
              style={{
                height:"30px", width:"300px",
                border:"2px solid #FFB6C1",
              }}
            type="text" placeholder="First Name" />
            <br/>
            <input 
              style={{
                height:"30px", width:"300px",
                border:"2px solid #FFB6C1",
              }}
            type="text" placeholder="Last Name" />
            <br/>
            <input
              style={{
                height:"30px", width:"300px",
                border:"2px solid #FFB6C1",
              }}
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              style={{
                height:"30px", width:"300px",
                border:"2px solid #FFB6C1",
              }}
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <br/>
            <button style={{height:"40px",width:"150px",backgroundColor:"#ff726f",borderRadius:"5px"}} onClick={this.onSignUp}>Sign Up</button>
          </div>

        </div>
      );   
       
    }

    return (
      <div style={{backgroundColor:"lavender"}}>

        <div style={
            {display:"flex", flexWrap:"wrap", marginLeft:"1.5%"}
          }>
      	  <div style={{height:"500px", width:"275px", backgroundColor:"coral"}}>
          <img src="https://static.onecms.io/wp-content/uploads/sites/19/2014/07/29/caprese-pizza-ck-x.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN CAPRESE PIZZA</strong></p>
          <p><i>Super crispy topped with homemade <br/> cashew  mozzarella,basil and <br/> balsamic reduction.</i></p>
          <p><div>
          <span><b><i><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹225 </i></b></span>  
          </div></p>

          </div>

      
          <div style={{height:"500px", width:"275px", backgroundColor:"tomato"}}>
          <img src="https://veganheaven.org/wp-content/uploads/2018/04/BBQ-Pizza-with-Crispy-Cauliflower-Vegan-1.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>BBQ PIZZA WITH CRISPY <br/> CAULIFLOWER</strong></p>
          <p><i>Topped with crispy cauliflower and <br/> garlic sauce, perfect comfort food.</i></p>
          <p><div>
          <span><b><i><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹250 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orangered"}}>
          <img src="https://economictimes.indiatimes.com/thumb/msid-16583015,width-1200,height-900/industry/cons-products/food/Yum-Brands-opens-its-first-owned-Pizza-Hut-outlet-in-India-targets-1-bn-revenues.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>SOCCA PIZZA</strong></p>
          <p><i>If you're looking for a gluten-free <br/> pizza base, this is the one, the <br/> base is made of chickpea flour.</i></p>
          <p><div>
          <span><b><i><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹275 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"gold"}}>
          <img src="https://veganheaven.org/wp-content/uploads/2016/12/Hummus-Pizza-12-2.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>HUMMUS PIZZA WITH VEGGIES</strong></p>
          <p><i>If you like hummus, you will love <br/> this pizza with artichokes, spinach <br/> and olives.</i></p>
          <p><div>
          <span><b><i><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹275 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orange"}}>
          <img src="https://www.veganricha.com/wp-content/uploads/2012/11/gobipizza-mungsproutpizza-060.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN BROCCOLI CHEESE PIZZA</strong></p>
          <p><i>Super filling and satisfying and comes <br/> with the goodness of broccoli.</i></p>
          <p><div>
          <span><b><i><br/><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹299 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"darkorange"}}>
          <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Easy-Taco-Pizza_EXPS_FT20_11618_F_0506_1_HOME.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN TACO PIZZA</strong></p>
          <p><i>If you can't decide between tacos <br/> and pizza, then this recipe is for you.</i></p>
          <p><div>
          <span><b><i><br/><br/><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹299 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"peru"}}>
          <img src="https://www.contentednesscooking.com/wp-content/uploads/2015/09/Vegan_Pepperoni_Pizza_1-720x540.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN PEPPERONI PIZZA</strong></p>
          <p><i>Instead of pepperoni, we have used <br/> marinated and baked zucchini.</i></p>
          <p><div>
          <span><b><i><br/><br/><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹319 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orange"}}>
          <img src="https://pinchofyum.com/wp-content/uploads/Sweet-Potato-Pizza-Recipe.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>BBQ SWEET POTATO PIZZA</strong></p>  
          <p><i>Topped with sweet potato, corn and <br/> jalapenos-a simple yet satisfying.</i></p>
          <p><div>
          <span><b><i><br/><br/><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹325 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"darksalmon"}}>
          <img src="https://pbs.twimg.com/media/EWDxRWyXQAE-Nmz.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>SPINACH AND TOFU PIZZA</strong></p>
          <p><i>The ultimate comfort food which will <br/> remind you of palak paneer, but tofu <br/> is used here which is vegan version <br/> of paneer</i></p>
          <p><div>
          <span><b><i><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹350 </i></b></span>  
          </div></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orangered"}}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uGgj5mCFcoF553n_BVWLNla9z64qtTHLrw&usqp=CAU" height="250px" width="250px" alt="error"/>
          <p><strong>CHICPEA PIZZA WITH TAHINI <br/> GARLIC SAUCE</strong></p>
          <p><i>An Ethiopian recipe which has the <br/> combination Pizza as well as <br/> shawarma.</i></p>
          <p><div>
          <span><b><i><br/>&emsp;&emsp;&emsp;&emsp;&emsp;Price:₹375 </i></b></span>  
          </div></p>
          </div>
        </div>
        <br/>
       
        <div style={{backgroundColor:"coral", height:"450px", width:"1000px", marginLeft:"17%"}}>
          <h3 style={{marginLeft:"20%", padding:"5px"}}>liked our unique selection? fill in the details below to place an order!</h3>
          <div style={{marginLeft:"26%", display:"flex", flexWrap:"wrap"}}>
            <p style={{padding:"10px"}}><strong>Enter the pizza selected <i>(enter a valid pizza only) *</i></strong></p>
            <input type="text" name="pizzaname" onChange={this.pizzaNameChange}/>
          </div>
          <div style={{marginLeft:"49.4%", display:"flex", flexWrap:"wrap"}}>
            <p style={{padding:"7px"}}><strong>enter your full name</strong></p>
            <input type="text" name="fullname" onChange={this.fullnameChange}/>
          </div>
          <div style={{marginLeft:"44.2%", display:"flex", flexWrap:"wrap"}}>
            <p style={{padding:"7px"}}><strong>enter your phone number *</strong></p>
            <input type="text" name="mnumber" onChange={this.mnumberChange}/>
          </div>
          <div style={{marginLeft:"41.75%", display:"flex", flexWrap:"wrap"}}>
            <p style={{padding:"7px"}}><strong>enter address (with pincode) *</strong></p>
            <input type="text" name="address" onChange={this.addressChange}/>
          </div>
          <div style={{display:"flex", flexWrap:"wrap"}}>
            <h5 style={{paddingRight:"40%", paddingLeft:"5px"}}>* indicates required field</h5>
            <h5>(order wont be considered if any of the required fields are unfilled)</h5>
          </div>
          <Link to="/Order">
          <button type="button" class="btn btn-primary" style={
            {height:"50px", width:"200px", backgroundColor:"Darkorange", borderRadius:"5px", marginLeft:"40%"}} onClick={this.checkout}>
              ORDER NOW!
          </button></Link>
        </div>
            <br/>
        <div>
           <button onClick={this.logout} style={{height:"40px",width:"150px",backgroundColor:"Darkorange",borderRadius:"5px", marginLeft:"85%"}}>Logout</button>
        </div>

      </div>
    
    );
  }
}


export default Home;