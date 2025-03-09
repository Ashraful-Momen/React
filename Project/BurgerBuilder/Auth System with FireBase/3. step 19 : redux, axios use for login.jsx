======================================================= Step : 19 - Auth with Firebase =================================================
#Enable authentication on Firebase settings . Project > Autentication > setup sign in method > Email/Password > enable . 

# For auth token use , redux . 

# actionType.jsx => 
--------------------
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const AUTH_LOADING = "AUTH_LOADING" ;
export const AUTH_LOGOUT = "AUTH_LOGOUT" ;


# for handle the auth system in redux use another file for simplicity : create authActionCreators.jsx inside redux folder => 
--------------------------------------------------------------------------------------------------------------------------
#for collect the =>  "auth api" key form the fire base project : firebase console > project click => 'setting' icon => project settings . [web api key]




import * as actionTypes from "./actionTypes";
import axios from "axios";

export const auth = (email, passowrd) => {
    
  (dispatch) => {
    const authData = {
      email: email,
      password: passowrd,
      returnSecureToken: true, // for firebase send true / false . 
    };


    const api_key = "AIzaSyBv4l6OAV-HD0fGGz9qHk7vkHUiKWrAH0E";
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+api_key, authData)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
   

  };
};



# import the authActionCreator in Auth.jsx => 

# in Auth.jsx => use mapDispatchToProps to pass the singUp form data to authActionCreators. 
-------------------------------------------------------------------------------------------
const mapDispatchToProps = (dispatch) => {
    return {


        auth : (email, password) => dispatch(auth(email, password))
    }
}

# In the Formik onSubmit function pass the email , password from form: 
-----------------------------------------------------------------------
 onSubmit={(values) => {
                        // console.log(values);
                        this.props.auth(values.email, values.password);
                    }}
                    
#Enable authentication on Firebase settings . Project > Autentication > setup sign in method > Email/Password > enable . 

# we will get the firebase response , after successfully signIn: 
------------------------------------------------------------------
 => idToken , (with the idToken we can sent request to Firebase , after successfully sign in )
 => expireIn : 3600s. 
 => localId: is my user ID.
 => refreshToken: after 3600s means 1hr , we can use the 'idToken' access data from firebase . but refresh token help to get new idToken again for increase the auth duration

#in Firebase for signIn / signUp use different web_rest_api_link : 
------------------------------------------------------------------
=> in authActionCreators.jsx set extra functino params,'mode' =>  (email,password,mode)
=> fix the Auth component and add 'mode' where we dispatch the auth function . 

#authActionCreators.jsx full code => 
------------------------------------
import * as actionTypes from "./actionTypes";
import axios from "axios";

export const auth = (email, password,mode) => {
  return (dispatch) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true, // for firebase required
    };

    const api_key = "AIzaSyBv4l6OAV-HD0fGGz9qHk7vkHUiKWrAH0E";
    const signup_url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + api_key;
    const signin_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + api_key;
    axios.post(mode === "Sign Up" ? signup_url : signin_url,authData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


#Auth.jsx => 
--------------
import React, {Component} from 'react'
import {Formik} from 'formik'
import {connect} from 'react-redux'


import {auth} from '../../redux/authActionCreators'




const mapDispatchToProps = (dispatch) => {
    return {
        auth : (email, password,mode) => dispatch(auth(email, password,mode))
    }
}

class Auth extends Component {

    state = {
       
        mode : "Sign Up",
    }

    render() {

        console.log(this.state.mode); 

        return (
            <div>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }}
                    onSubmit={(values) => {
                        // console.log(values);
                        this.props.auth(values.email, values.password,this.state.mode);
                    }}
                    validate={(values) => {
                        const errors = {}; 
                        
                        if(!values.email) {
                            errors.email = "Required";
                        }
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        
                        if(!values.password) {
                            errors.password = 'Required';
                        }
                        else if(values.password.length < 6) {
                            errors.password = "Must be at least 6 characters";
                        }

                        if(this.state.mode == 'Sign Up') {


                            if(!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required confirm Password';
                            }
                            else if(values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "Password fields do not match!";
                            }
                        }
                        
                        
                        // console.log("Errors:", errors);
                        return errors; // show the error the input fields of form.
                    }}
                >
                    {(props) => {
                        return (
                            <div className='container border m-2'>
                                <div className=' text-center m-3'>
                                    <button className="btn btn-primary " onClick={() => this.setState({mode : this.state.mode === "Sign Up" ? "Log In"  : "Sign Up"})}>Switch To {this.state.mode === "Sign Up" ? "Log In" : "Sign Up" }</button>
                                </div>
                                <form onSubmit={props.handleSubmit} className='m-2 p-2'>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={props.handleChange}
                                        value={props.values.email}
                                        placeholder='Input Email'
                                        className='form-control m-2'
                                    />
                                    {props.errors.email && props.touched.email && (
                                        <div className="text-danger">{props.errors.email}</div>
                                    )}
                                    
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={props.handleChange}
                                        value={props.values.password}
                                        placeholder='Input Password'
                                        className='form-control m-2'
                                    />
                                    {props.errors.password && props.touched.password && (
                                        <div className="text-danger">{props.errors.password}</div>
                                    )}
                                    
                                    {this.state.mode === "Sign Up" && (  // Conditional rendering
                                        <>
                                            <input
                                                type="password"
                                                name="passwordConfirm"
                                                onChange={props.handleChange}
                                                value={props.values.passwordConfirm}
                                                placeholder='Confirm Password'
                                                className='form-control m-2'
                                            />
                                            {props.errors.passwordConfirm && props.touched.passwordConfirm && (
                                                <div className="text-danger">{props.errors.passwordConfirm}</div>
                                            )}
                                        </>
                                    )}
                                   
                                    
                                    <button type="submit" className="btn btn-primary btn-sm ms-2">Submit</button>
                                </form>
                            </div>
                        )
                    }}
                </Formik>
            </div>
        )
    }
}

export default connect(null,mapDispatchToProps)(Auth);
