============================================================ Step: 23 - Auth Spinner ==========================================================
#Reducer.state => add 'authLoading' = false,authFailedMsg:null, authError:false,

#authActionCreator.jsx => add authLoading function 
--------------------------
export const authLoading = (isLoading) => {

    return {
        type: actionType.AUTH_LOADING,
        payload : isLoading ,
    }
}

# when run auth () from authActionCreators.jsx , call the authLoading() for showing the loading icon. 
--------------------------------------------------
export const authLoading = (isLoading) => {

  return {
      type: actionTypes.AUTH_LOADING,
      payload : isLoading ,
  }
}


export const auth = (email, password,mode) => {

  dispatch(authLoading(true)); 
  
# if authActionCreators.jsx => axios reponse false then , dispatch authLoading (false) =>   dispatch(authLoading(false)); 
-------------------------------
  dispatch(authLoading(true)); 
# if auth axios reponse true/false => set   dispatch(authLoading(false));


#reducer.jsx => 
-----------------
 => state add ->
 ---------------
 authLoading : false , authFailedMsg:null,
 
 
 => add case
 ------------
 
 case actionTypes.AUTH_LOADING : 
 return {
 ...state,
 authLoading:action.payload
 }
 
#Auth.jsx => show the loading <spinner>
------------
#add mapStateToProps for get the authLoading and authFailedMsg value . 
# let new variable form = null .
# if authLoading value == true then , let form = <Spinner> 
# if authLoading false == false then , let form = <Formik> code </Formik>


const mapStateToProps = state => {

    return {
    authLoading: state.authLoading,
    authFailedMsg: state.authFailedMsg,
    }
}
 
 
