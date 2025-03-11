// Action Creator
const increment = () => {
  return { type: 'INCREMENT' };
};

// Thunk Action
const asyncIncrement = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment()); // Dispatch after 1 second
    }, 1000);
  };
};

// mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    asyncIncrement: () => dispatch(asyncIncrement()),
  };
};
