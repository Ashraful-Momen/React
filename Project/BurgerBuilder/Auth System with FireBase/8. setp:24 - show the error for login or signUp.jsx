============================================================ Step: 24 - Auth Error Handling ==========================================================

# if get error while user signUp/signIn in firebase , then status code : 400 and Error response => error.massage

#authActionCreators.jsx => for handling the error for auth related create a new function : export authFaild = () =>{}
---------------------------

export const authFaild = errMsg => {
    
    return {
        type : actionTypes.AUTH_FAILED,
        payload : isLoading,
    }


}

# for axios auth validation of error dispatch(authFailed(err.massage)) in .catch(err => {  dispatch(authFailed)}) block . 
-----------------------------------
  .catch((err) => {
        dispatch(authLoading(false)); 
        console.log(err.message);

        dispatch(authFaild(err.message))
      });
      
      
#in Reducer : add new case for auth failed : 
-------------

 case actionTypes.AUTH_FAILED: 
    return {
      ...state,
      authFailedMsg:action.payload,
    }
    
# Auth.jsx => show the error Message with Alert 'reactStrap'
--------------
  render() {

        let errAuth = null; 
        if(this.props.authFailedMsg!==null){

            errAuth = (

                <Alert>{this.props.authFailedMsg}</Alert>
            );
        }

  return (
            <div>
                {errAuth}
                {form}
            </div>
        )
