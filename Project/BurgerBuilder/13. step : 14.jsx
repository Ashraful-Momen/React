============================================================================== Step : 14 (Order.jsx : fetch order form FireBase) ===================================================================

# declare 2 actionTypes that 1.order load success 2. order load faild  actionTypes.jsx =>
    => export const LOAD_ORDERS = "LOAD_ORDERS"
    => export const ORDER_LOAD_FAILED = "ORDER_LOAD_FAILED"

# USE redux thunk for async api request handling , install redux thunk>>> npm install redux-thunk --save 
    => in store.jsx : 
    ------------------
    => import {applyMiddleware} from 'redux' 
    => import thunk from 'redux-thunk' . 
    => And pass it to => createStor(reducer,applyMiddleware(thunk)); 
    
# actionCreators.jsx=> 
=======================
export const loadOrderSuccess = (orders) => {
    return {
        type: actionTypes.LOAD_ORDER_SUCCESS,
        payload: orders, //this is the firebase : url/orders
    }
}

export const loadOrderFailed = () => {
    return {
        type: actionTypes.LOAD_ORDER_FAILED,
    }
}


// async function , dispatch from order.jsx to dispatch from here , that's why use thunk . 
export const fetchOrders = () => dispatch => {
    axios.get("https://bbuilder-7276c-default-rtdb.firebaseio.com/orders.json")
        .then(response => {
            console.log(response.data);
            // dispatch(loadOrderSuccess(response.data));
        })
        .catch(err => {
            dispatch(loadOrderFailed());
        });
};



# convert Order.jsx function to class component for using redux in old way. 

#Order.jsx => 
---------------
import React from 'react'
import { fetchOrders } from '../../../redux/actionCreators'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

class Order extends React.Component {

  //after load the full component then call this function . 
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    return (
      <div>Order</div>
    )
}
}


export default connect(null, mapDispatchToProps)(Order)
    
    
#then reload the page of order component . 

# reducer.jsx: now save those order which fetch form firebase in reducer.jsx  => set > state:  {orders:[], orderLoading: true, orderErr:false}: 
    => write a function for save the orders : 
    -------------------------------------------

     case actionTypes.LOAD_ORDER_SUCCESS: {
      console.log(action.payload); //check the order is loaded.
      
      let orders = []; 
      
      for (let key in action.payload){
        
        orders.push({
            ...action.payload[key],   //show full item => array[index_number]
            id:key                  // UNIQUE order KEY store as an 'id' in array . 
        })
      }
      
      console.log(orders); 
      
      return {
        ...state,
        
        orders:orders , // here save all fetching orders from api to react state. 
        orderLoading:false,
       
      };
    }
    
# shwo the order to the Order component from the redux state . =>
-------------------------------------------------------------
=> mapStateToProps = state => {

    orders: state.orders,
    orderLoading:state.orderLoading,
    orderErr: state.orderErr,
}

=> use 'componentDidUpdate () ' , when fetch orders from firebase then update the redux state, then we can console.log the orders , in mapStateToProps . 

    
    
    
actionTypes.jsx=> 
-----------------
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const UPDATE_PURCHASEABLE = "UPDATE_PURCHASEABLE";
export const RESET_INGREDIENT = "RESET_INGREDIENT";

//load order successfully 
export const LOAD_ORDER_SUCCESS = "LOAD_ORDER_SUCCESS";

//load order failed
export const LOAD_ORDER_FAILED = "LOAD_ORDER_FAILED";


actionCreators.jsx=> 
---------------------
import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addIngredient = (igtype) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype
    };
};

export const removeIngredient = (igtype) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype
    };
};

export const updatePurchaseable = (igtype) => {
    return {
        type: actionTypes.UPDATE_PURCHASEABLE,
        payload: igtype
    };
};

export const resetIngredient = () => {
    return {
        type: actionTypes.RESET_INGREDIENT,
       
    };
};



export const loadOrderSuccess = (orders) => {
    return {
        type: actionTypes.LOAD_ORDER_SUCCESS,
        payload: orders, //this is the firebase : url/orders
    }
}

export const loadOrderFailed = () => {
    return {
        type: actionTypes.LOAD_ORDER_FAILED,
    }
}


// async function , dispatch from order.jsx to dispatch from here , that's why use thunk . 
export const fetchOrders = () => dispatch => {
    axios.get("https://bbuilder-7276c-default-rtdb.firebaseio.com/orders.json")
        .then(response => {
            // console.log(response.data);

            //pass the function loadOrderSuccess => reducer => save those orders . 
            dispatch(loadOrderSuccess(response.data));
        })
        .catch(err => {
            dispatch(loadOrderFailed());
        });
};


#store.jsx=> 
------------
import {createStore,applyMiddleware} from 'redux'
import {reducer} from './reducer'
import { thunk } from 'redux-thunk'

export const store = createStore(reducer,applyMiddleware(thunk));

#reducer.jsx => 
---------------
import * as actionTypes from "./actionTypes";

const INGREDIENT_PRICES = {
  salad: 10,
  cheese: 20,
  meat: 30,
};

const INITIAL_STATE = {
  ingredients: [
    { type: "salad", amount: 0 },
    { type: "cheese", amount: 0 },
    { type: "meat", amount: 0 },
  ],
  totalPrice: 80,
  purchaseable: false,

  orders: [],
  orderLoading: true,
  orderErr: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      // Create a new array to ensure immutability
      const updatedIngredients = state.ingredients.map((item) => {
        if (item.type === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });

      return {
        ...state,
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };
    }

    case actionTypes.REMOVE_INGREDIENT: {
      // Find the ingredient to check if amount > 0
      const ingredient = state.ingredients.find(
        (item) => item.type === action.payload
      );

      // If ingredient doesn't exist or amount is already 0, return current state
      if (!ingredient || ingredient.amount <= 0) {
        return state;
      }

      // Create a new array with updated amounts
      const updatedIngredients = state.ingredients.map((item) => {
        if (item.type === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });

      return {
        ...state,
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
      };
    }

    case actionTypes.UPDATE_PURCHASEABLE: {
      // Calculate if we have at least one ingredient
      const sum = state.ingredients.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);

      return {
        ...state,
        purchaseable: sum > 0, // return ture : if sum > 0, we have at least one ingredient
      };
    }

    case actionTypes.RESET_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          { type: "salad", amount: 0 },
          { type: "cheese", amount: 0 },
          { type: "meat", amount: 0 },
        ],
        totalPrice: 80,
        purchaseable: false,
      };
    }

    case actionTypes.LOAD_ORDER_SUCCESS: {
      // console.log(action.payload);
      let orders = [];

      for (let key in action.payload) {
        orders.push({
          ...action.payload[key], //show full item => array[index_number]
          id: key, // UNIQUE order KEY store as an 'id' in array .
        });
      }

      // console.log(orders);

      return {
        ...state,
        orders: orders, // here save all fetching orders from api to react state.
        orderLoading: false,
        orderErr: false,
      };
    }

    default:
      return state;
  }
};


#Order.jsx=> 
-------------
import React from 'react'
import { fetchOrders } from '../../../redux/actionCreators'
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

class Order extends React.Component {

  //after load the full component then call this function . 
  componentDidMount() {
    this.props.fetchOrders()
  }

  //after fetch order from firebase then update the redux state. 
  componentDidUpdate(prevProps) {
    console.log(this.props.orders);
  }

  render() {
    return (
      <div>Order</div>
    )
}
}


export default connect(mapStateToProps, mapDispatchToProps)(Order)

============================= Other component is not change ====================================================
