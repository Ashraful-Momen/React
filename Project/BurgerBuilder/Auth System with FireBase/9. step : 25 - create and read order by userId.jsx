============================================================ Step: 25 - Show the order user ways  ==========================================================

# Goto Firebase console > Realtime DataBase > Ruels : change it 'auth != null' (no one can see the order without auth )
------------------------------------------------------
{
  "rules": {
    ".read": "auth != null",  // 2025-4-2
    ".write": "auth != null",  // 2025-4-2
  }
}

#redux > actionCreator.jsx : pass the token for fetch the order user ways with axios . 
--------------------
// async function , dispatch from order.jsx to dispatch from here , that's why use thunk . 
export const fetchOrders = (token) => dispatch => {
    axios.get("https://bbuilder-7276c-default-rtdb.firebaseio.com/orders.json?auth="+token)
        .then(response => {
            // console.log(response.data);

            //pass the function loadOrderSuccess => reducer => save those orders . 
            dispatch(loadOrderSuccess(response.data));
        })
        .catch(err => {
            dispatch(loadOrderFailed());
        });
};


# Order.jsx => where we call fetchOrders() set the token inside the function params : fetchOrders(token)
------------------------------------------------------------------------
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr,
    token : state.token,
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token) => dispatch(fetchOrders(token)),
  };
};


class Order extends React.Component {
  //after load the full component then call this function .
 //pass the token for fetching user ways .
   componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }
  
#Problem : one user show the all orders . solve : when we place order with the checkout component , we also pass the userId for create and read order user ways . 

#Checkout.jsx => 
-----------------
    const mapStateToProps = (state) => {
      console.log(state);
      return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
        userId: state.userId,
        token: state.token,
      };
    };

    #axios , set the token => 
    -------------------------
     axios
          .post(
            "https://bbuilder-7276c-default-rtdb.firebaseio.com/orders.json?auth="+this.props.token,
            order
          )
          

#Order.jsx => here set the userId. 
-------------
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr,
    token : state.token,
    userId: state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token,userId) => dispatch(fetchOrders(token,userId)),
  };
};


  componentDidMount() {
    this.props.fetchOrders(this.props.token,this.props.userId);
  }

          


#actionCreators.jsx => Filter the order fetching userId ways : rule for fire base : 
---------------------------------------------------------------
// async function , dispatch from order.jsx to dispatch from here , that's why use thunk .
export const fetchOrders = (token, userId) => (dispatch) => {
  //fetch the order according to fireBase userId:
  const queryParams = `&orderBy="userId"&equalTo="${userId}"`; // Use template literals

  axios
    .get(
      `https://bbuilder-7276c-default-rtdb.firebaseio.com/orders.json?auth=${token}${queryParams}`
    )
    .then((response) => {
      // Dispatch action with the fetched data
      dispatch(loadOrderSuccess(response.data));
    })
    .catch((err) => {
      console.error("Error fetching orders:", err);
      dispatch(loadOrderFailed());
    });
};






#firebase rule => apply the auth in firebase on 'orders':  
--------------------------------------------

{
  "rules": {
    "orders":// here use can use any , orders, promo_codes, etc....
    {
    ".read": "auth != null",  // 2025-4-2
    ".write": "auth != null",  // 2025-4-2
    ".indexOn" : ["userId"] //filter by userId
  }
  
  }
}


