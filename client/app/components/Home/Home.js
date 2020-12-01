import { urlencoded } from 'body-parser';
import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage.js';

// const mystyle = {
//   float:"left",
//   padding:"20px",
//   backgroundColor:"ivory"
// };

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
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
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
    // Grab state
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
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <br/>
            <button onClick={this.onSignIn}>Sign In</button>
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
            <input type="text" placeholder="First Name" />
            <br/>
            <input type="text" placeholder="Last Name" />
            <br/>
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <br/>
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>

        </div>
      );
    }

    return (
      <div>
        <div style={
            {display:"flex", flexWrap:"wrap"}
          }>
      	  <div style={{height:"500px", width:"275px", backgroundColor:"coral"}}>
          <img src="https://static.onecms.io/wp-content/uploads/sites/19/2014/07/29/caprese-pizza-ck-x.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN CAPRESE PIZZA</strong></p>
          <p><i>super crispy topped with homemade <br/> cashew  mozzarella,basil and <br/> balsamic reduction.</i></p>
          <p><b>price : 210</b></p>
          </div>
      
          <div style={{height:"500px", width:"275px", backgroundColor:"tomato"}}>
          <img src="https://veganheaven.org/wp-content/uploads/2018/04/BBQ-Pizza-with-Crispy-Cauliflower-Vegan-1.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>BBQ PIZZA WITH CRISPY <br/> CAULIFLOWER</strong></p>
          <p><i>topped with crispy cauliflower and <br/> garlic sauce, perfect comfort food.</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orangered"}}>
          <img src="https://economictimes.indiatimes.com/thumb/msid-16583015,width-1200,height-900/industry/cons-products/food/Yum-Brands-opens-its-first-owned-Pizza-Hut-outlet-in-India-targets-1-bn-revenues.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>SOCCA PIZZA</strong></p>
          <p><i>if you're looking for a gluten-free <br/> pizza base, this is the one, the <br/> base is made of chickpea flour.</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"gold"}}>
          <img src="https://veganheaven.org/wp-content/uploads/2016/12/Hummus-Pizza-12-2.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>HUMMUS PIZZA WITH VEGGIES</strong></p>
          <p><i>if you like hummus, you will love <br/> this pizza with artichokes, spinach <br/> and olives.</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orange"}}>
          <img src="https://www.veganricha.com/wp-content/uploads/2012/11/gobipizza-mungsproutpizza-060.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN BROCCOLI CHEESE PIZZA</strong></p>
          <p><i>super filling and satisfying and comes <br/> with the goodness of broccoli.</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"darkorange"}}>
          <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Easy-Taco-Pizza_EXPS_FT20_11618_F_0506_1_HOME.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN TACO PIZZA</strong></p>
          <p><i>if you can't decide between tacos <br/> and pizza, then this recipe is for you.</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"peru"}}>
          <img src="https://www.contentednesscooking.com/wp-content/uploads/2015/09/Vegan_Pepperoni_Pizza_1-720x540.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>VEGAN PEPPERONI PIZZA</strong></p>
          <p><i>instead of pepperoni, we have used <br/> marinated and baked zucchini.</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orange"}}>
          <img src="https://pinchofyum.com/wp-content/uploads/Sweet-Potato-Pizza-Recipe.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>BBQ SWEET POTATO PIZZA</strong></p>
          <p><i>topped with sweet potato, corn and <br/> jalapenos-a simple yet satisfying pizza.</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"darksalmon"}}>
          <img src="https://pbs.twimg.com/media/EWDxRWyXQAE-Nmz.jpg" height="250px" width="250px" alt="error"/>
          <p><strong>SPINACH AND TOFU PIZZA</strong></p>
          <p><i>the ultimate comfort food which will <br/> remind you of palak paneer, but tofu <br/> is used here which is vegan version <br/> of paneer</i></p>
          </div>

          <div style={{height:"500px", width:"275px", backgroundColor:"orangered"}}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uGgj5mCFcoF553n_BVWLNla9z64qtTHLrw&usqp=CAU" height="250px" width="250px" alt="error"/>
          <p><strong>CHICPEA PIZZA WITH TAHINI <br/> GARLIC SAUCE</strong></p>
          <p><i>an Ethiopian recipe which has the <br/> combination Pizza as well as <br/> shawarma.</i></p>
          </div>
  
        </div>

        <div>
            <button onClick={this.logout}>Logout</button>
        </div>

      </div>
    );
  }
}

export default Home;