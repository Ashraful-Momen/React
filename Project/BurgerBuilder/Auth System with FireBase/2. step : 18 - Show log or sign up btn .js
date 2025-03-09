================================================ step : 18 (Auth : Login / Sing Up mode)============================================================ 

# In the same Auth component show the Login or Sign Up form : 

# declare a state in the Auth component . 

# declare a state = in Auth component > 
------------------------------------------
 state = {
       
        mode : "Sign Up",
    }
    
# upper a form tag add a button for showing : login / sign up => 
------------------------------------------------------------------
<button className="btn btn-primary ">{this.state.mode === "Sign Up" ? "Sign Up" : "Log In"}</button>

# when click log in button fire a switchModeHandler function for changing the state.mode  : 
------------------------------------------------------------------
 <div className=' text-center m-3'>
     <button className="btn btn-primary " onClick={() => this.setState({mode : this.state.mode === "Sign Up" ? "Log In"  : "Sign Up"})}>Switch To {this.state.mode === "Sign Up" ? "Sign Up" : "Log In"}</button>
 </div>


# if thise.mode ="Sign Up" mode then hide the confirm Password field and also update the formik form logic  :
---------------------------------------------------------------------------------------------------------------
 inside the form : 
 -------------------

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
                                    {props.errors.passwordConfirm && props.touched.passwordConfirm && (
                                        <div className="text-danger">{props.errors.passwordConfirm}</div>
                                    )}
                                    
 formik form state logic handle => 
 ----------------------------
 
    in formik form validation  => 
    -----------------------------
    
                        if(this.state.mode == 'Sign Up') {


                            if(!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required confirm Password';
                            }
                            else if(values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "Password fields do not match!";
                            }
                        }
                        
# full code of the Auth Component : 
-------------------------------------
import React, {Component} from 'react'
import {Formik} from 'formik'

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
                        console.log(values);
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
                                    <button className="btn btn-primary " onClick={() => this.setState({mode : this.state.mode === "Sign Up" ? "Log In"  : "Sign Up"})}>Switch To {this.state.mode === "Sign Up" ? "Sign Up" : "Log In"}</button>
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

export default Auth
