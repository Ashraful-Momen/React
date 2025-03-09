================================================ step : 17 (Auth validation )============================================================ 

# Formik default function => validate = {() => {}} for checking the validation . 
     <Formik
        validate = { (values) => {
             
             
            }
        
        }
     > 
     
     
# if email not validated then => store in errors = {} ; after validation code => return errors; 

 <Formik
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
                        else if(values.password.length < 4) {
                            errors.password = "Must be at least 4 characters";
                        }
                        
                        if(!values.passwordConfirm) {
                            errors.passwordConfirm = 'Required confirm Password';
                        }
                        else if(values.password !== values.passwordConfirm) {
                            errors.passwordConfirm = "Password fields do not match!";
                        }
                        
                        console.log("Errors:", errors);
                        return errors; // show the error the input fields of form.
                    }
     > 
     
# show the error msg => 
-----------------------
 {(props) => {
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
                                    
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        )
                    }}
