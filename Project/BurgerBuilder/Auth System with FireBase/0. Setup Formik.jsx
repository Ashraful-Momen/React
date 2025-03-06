================================================ step : 16 (Auth )============================================================
>>> npm install --save formik 

#create a folder > Src > Component > Auth > Auth.jsx:

#Auth.jsx: add this component in Main.jsx for route . 
------------
import React, {Component} from 'react'
import  {Formik} from 'formik'

class Auth extends Component {

 render(){



     return (
       <div>
          Auth Component
       </div>
     )
   }
 }

export default Auth

#add the login route , Main.jsx: 
----------------------
{/* For Login add the route : /login */}
<Route path="/login" element={<Auth />} />

#In Hearder.jsx add the Navlink: 
---------------------------------

            <NavItem>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </NavItem>
            
#Auth.jsx: use formik
------------------------
# in Formik 1st declare the state => initialValues={ email : "" }

# access the initailValues state. By the Name of 'values' =>  onSubmit('values'). 

# <Formik onSubmit(values) => {clg(values)}

# for render the form , write a es6 function => <Formik> {()=> (<div> <form> </form> </div>)}

# input tag name must be matched the name of intialValue.  

# set the 'values' in input tag for 'email', in es6 function set 'values' > =>  <Formik> {({values})=> (<div> <form> <input name="email" value={values.email}> </form> </div>)}

# Formik Default function =>  'handleChange' is the build in function for take input value form <input> , use it in es6 function =>  

    <Formik> {({values,handleChange})=> (<div> <form> <input name="email" value={values.email} onChange={handleChange}> </form> </div>)}
    
    
# Formik Default function => 'handleSubmit' => while click the 'submit' btn then this function receive value from input filed name and pass those in state 'initialState'

     <Formik> {({values,handleChange})=> (<div> <form onSubmit={handleSubmit}> <input name="email" value={values.email} onChange={handleChange}> </form> </div>)}



#Auth.jsx => 
-------------

 render(){



     return (
       <div>
          <Formik
            
            
            initialValues={
               {
                email:"",
                password:"",
                passwordConfirm:"",
               }
            }
            
            
            onSubmit={(values)
                =>{
                    console.log(values); 
                }
            }
          >
          
          {
            () => (
                <div>
                    <form>
                        <input name = "email" placeholder = "Type Email" className="form-control">
                        <br/>
                        <input name = "password" placeholder = "Type Password" className="form-control">
                        <br/>
                        <input name = "passwordConfirm" placeholder = "Confirm Password" className="form-control">
                        <br/>
                        <button type="submit" className="btn btn-success> Submit </button>
                    </form>
                </div>
            )
          }
          
          
          </Formik>
       </div>
     )
   }
 }
 
 #Auth.jsx => 
 ---------------

import React, {Component} from 'react'
import  {Formik} from 'formik'

class Auth extends Component {

 render(){



     return (
       <div>
           <Formik

                initialValues={
                    {
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }
                }

                onSubmit={
                    (values) => {
                        console.log(values);
                    }
                }
           >

            {
                (props) => {

                            return (

                                <div className='container border m-2'>

                                <form onSubmit={props.handleSubmit} className='m-2 p-2'>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={props.handleChange}
                                        value={props.values.email}
                                        placeholder='Input Email'
                                        className='form-control m-2'
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={props.handleChange}
                                        value={props.values.password}
                                        placeholder='Input Password'
                                        className='form-control m-2'
                                    />
                                    <input
                                        type="password"
                                        name="passwordConfirm"
                                        onChange={props.handleChange}
                                        value={props.values.passwordConfirm}
                                        placeholder='Confirm Password'
                                        className='form-control m-2'
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                                </div>
                            )
                            }

            }


           </Formik>
       </div>
     )
   }
 }

export default Auth
