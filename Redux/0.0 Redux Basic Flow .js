#Redux - Toolkit : 
-------------------
#install react redux toolkit: 
---------------------------------
>>> npm install redux/toolkit react-redux

#after install check the package.json for the the redux version . 

#Slice : According to the React => "Collection of Logics is the Slice". 

/src

    /----------------app
                        /---------------------store.js [create the store]
                        
    /----------------features
                            /-----------------counter
                                                    /counterSlice.js [write all the counter logic: Reducer]
    
    

================================================================
1. createSlice.js => 
----------------------
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({

    //1.declare name of the slice
    name: "counter", 

    //2.initial state
    initialState: {
        count: 0,
    },
    
    //3.define reducers
    reducers: {
        increment: (state) => {
            state.count = state.count += 1;
            //no need to return statement cause , return is auto working 
        },
        decrement: (state) => {
            state.count = state.count -= 1;
        },
        reset: (state) => {
            state.count = state.count = 0;
        },
        
        increaseByAmount: (state, action) => {
            state.count = state.count + action.payload;
        },
    },
});



//export actions : which is the functions
export const { increment, decrement, reset, increaseByAmount } = counterSlice.actions;


//export reducer
export default counterSlice.reducer;  //don't forget to export the reducer


========================================================================================
#store.js=> 
-----------
import { configureStore } from "@reduxjs/toolkit";


// custom import : _____________________________________________
// import counterSlice from "../features/counter/counterSlice";
// change the name 'counterSlice' to 'counterReducer', cause we export as default


import counterReducer from "../features/counter/counterSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,  
    },
});

export default store;

=====================================================================================
#index.js => 
------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

//custom import: _________________________________________
import store from './app/store';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
=====================================================================================
#App.js => 
------------
import "./App.css";
import CounterView from "./features/counter/CounterView";

function App() {
 


  return (
    <div className="App">
     

      <h3>Counter App</h3>

      <CounterView />
    
    </div>
  );
}

export default App;
  
=====================================================================================
#CounterView.js => 
-----------------
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


//custom import:_______________
import { decrement, increment, reset, increaseByAmount } from './counterSlice';



const CounterView = () => {


    //useSelector fetching data from store =>  state.SlieceName.initailState_Name
    const count = useSelector(state => state.counter.count);

    //send value to the store : => useDispatch(PassReducerFunctionName)
    const dispatch = useDispatch();
  

    return (
        <div>
            <h2>Counter: {count} </h2>

            {/* call the actions (function of the slice) */}
            <button onClick={() => dispatch(increment())}> increment </button>
            <button onClick={() => dispatch(decrement())}> decrement </button>
            <button onClick={() => dispatch(reset())}> reset </button>
            <button onClick={() => dispatch(increaseByAmount(5))}> IncreaseByAmount:5 </button>
        </div>
    );
};

export default CounterView;
