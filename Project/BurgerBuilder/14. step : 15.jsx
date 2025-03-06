============================================================================== Step : 15 (Order.jsx : fetch order form redux and show on view) ===================================================================


# Order.jsx => after fetch orders from redux , write code on render() => 
---------------------------
render(){
let orders = this.props.orders.map(order => {
    
    console.log(order)
    
})

return (
<div>
    {orders}
    

</div>
);

}

# create a folder : Order > SingleOrder > SingleOrder.jsx => 
-------------------------------------------------------------
const SingleOrder = props => {
    
    console.log(props);
    
    return (
        <div>
            <p>Order</p>
        </div>
    )

}

# Order.jsx => after fetch orders from redux , write code on render() => 
---------------------------
render(){
let orders = this.props.orders.map(order => {
    
   return <SingleOrder order={order} key={order.id} />
    
})

return (
<div>
    {orders}
    
   

</div>
);

}


# create a folder : Order > SingleOrder > SingleOrder.jsx => 
-------------------------------------------------------------
const SingleOrder = props => {
    
    console.log(props);
    
    return (
        <div>
            <p>Order Number : {props.order.id}</p>
            <p>Order Address : {props.order.customer.deliveryAddress}</p>
            <hr/>
            <hr/>
            <p> Total : {props.order.price} BDT </p>
        </div>
    )

}

#now show the ingredient in the SingleOrder.jsx => 
-----------------------------------------------------
const SingleOrder = props => {
    
   let ingredientSummary = props.order.ingredients.map(item => {
        
        return (
            <div className='text-center m-2 border'>

                <span key = {item.type}> {item.amount} X <span> {item.type}</span>  </span> <br/>
            </div>
        )
        
    })
    
    return (
        <div className='border p-2 rounded m-2'>
            <hr />
              {ingredientSummary}
            <p>Order ID : {props.order.id}</p>
            <p>Order Address : {props.order.deliveryAddress}</p>
            <p>Payment Method : {props.order.paymentType}</p>
           
           
          
            <strong>Order Price : {props.order.totalPrice} BDT</strong>
            <hr />
        </div>
    )
}


# show the spinner while order loading : 
------------------------------------------
# Order.jsx => 
---------------------------
 render() {

    let orders = this.props.orders.map(order => {
    
      return <SingleOrder order={order} key={order.id} />
       
   })
    
  
   return (
    <div>

  {this.props.orderLoading ? <Spinner /> : orders}
       
        
       
    
    </div>
    );
  }

# If order loading failed then show the error : 

actionCreators.js: 
-------------------


export const fetchOrders = () => dispatch => {
    axios.get("https://bbuilder-7276c-default-rtdb.firebaseio.com/orders.json")
        .then(response => {
            // console.log(response.data);

            //pass the function loadOrderSuccess => reducer => save those orders . 
            dispatch(loadOrderSuccess(response.data));
        })
        .catch(err => {
        //if error then dispatch : 
            dispatch(loadOrderFailed());
        });
};

#redux.jsx:  create a new action type for failed order : 
---------------------------------------------------------

  case actionTypes.LOAD_ORDER_FAILED: {
      return {
        ...state,
        orderLoading: false,
        orderErr: true,
      };
    }
    

#show the order error in Order.jsx=> 
----------------------------------
# show the spinner while order loading : 
------------------------------------------
# Order.jsx => 
---------------------------
render(){
    let orders = null; 
    
    if(this.props.orderErr){
        
        orders = <p> Sorry Faild to Load the Orders </p> 
    
    }
    else{
        orders = this.props.orders.map(order => {
    
           return <SingleOrder order={order} key={order.id} />
            
        })
    
    }



return (
<div>
    {this.props.orderLoading ? <Spinner /> : orders}
    
    <SingleOrder order={orders}  > 

</div>
);

}

#if order is emty then show the orders is empty , Order.jsx=> 
----------------------------------------------------------------
# Order.jsx => 
---------------------------
render(){
    let orders = null; 
    
    if(this.props.orderErr){
        
        orders = <p> Sorry Faild to Load the Orders </p> 
    
    }
    else{
        if(this.props.orders.length === 0){
            orders = <p>You have no Orders</p>
        }
        esle{
        
        orders = this.props.orders.map(order => {
    
           return <SingleOrder order={order} key={order.id} />
            
        })
        }
    
    }



return (
<div>
    {this.props.orderLoading ? <Spinner /> : orders}
    
    <SingleOrder order={orders}  > 

</div>
);

}

