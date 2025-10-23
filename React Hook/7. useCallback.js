#React useCallBack: 
-------------------
from parent pass a function to <Message> component, which is {onHandleIncrement = }
From child component call a function, where this function exist in Parent component .

when click toggle btn then auto call the <Message> child component though count value is not change . 
**** this problem is happend when we add the call back function to the <Message> component and call the fn => onHandleIncrement form <Message> Component .

(when we are not add the call back function on the child Component then we don't face any problem )

if only 'count' value change then call the fn => handleIncrementMessage();

solv: 'use the useCallback hook => useCallback(()=>{},[dependency_variable])' ; 
-----

const handleIncrementMessage = useCallback(
    
    () => {
        setCount((count) => count + 1 ); 
    }

,[count]); 





app component.jsx => 
-----------------
const [count, setCount] = useState(0);
const [toggle, setToggle] = useState(false); 
console.lgo("app rendering"); 

//this function pass to the child component => when call the function form child component 
//then update the 'count' value; 
//const handleIncrementMessage = () => {
//    setCount((count) => count + 1 ); 
//}

//solve: the problem by useCallback hook => 
const handleIncrementMessage = useCallback(
    
    () => {
        setCount((count) => count + 1 ); 
    }

,[count]); 


return (
<>
    {toggle ? 'On' : 'Off'}
    <button onClick= {()=> {setToggle(!toggle)}}>Toggle </button> 
    
    
    <h2> Count: {count} </h2>
    
    //closer function : if click the btn then update the 'count' varibale . 
    <button 
        onClick = {() => {
            setCount((count) => count +1); 
        }}
    > 
    
    
    
        Increment
    </button> 
    
    
    //call when chage the count value .... and also pass a call back function 
    <Message numberOfMessages={count}  onHandleIncrement = {handleIncrementMessage}/>
</>
); 


Message component.jsx => 
------------------------
import React, {memo} from "react";


const Message = ({numberOfMessage, onHandleIncrement}) => {
    
    console.lgo("message rendering"); 
    return (
        <p> send {numberOfMessage} message </p>
        
        //when click the button then call the function 'onHandleIncrement' and 
        //update the count value form the parent . 
        <button onclick={onHandleIncrement}> Increment Message Number </button>
    
    );

}; 

export default memo(Message); // if the Message value is changed then function will be call => fn => Message; 
