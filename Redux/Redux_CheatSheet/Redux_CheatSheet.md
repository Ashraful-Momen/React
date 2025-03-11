
---

### 1. Folder Structure
```
src/
|-- actions/
|   |-- index.js        # Action creators
|-- reducers/
|   |-- index.js        # Root reducer
|-- store/
|   |-- index.js        # Redux store configuration
|-- components/
|   |-- Counter.js      # React component
|-- App.js              # Main app component
|-- index.js            # Entry point
```

---

### 2. Code Implementation

#### **Step 1: Actions (`src/actions/index.js`)**
```javascript
// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';

// Action Creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// Thunk Action (Async Action)
export const incrementAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment()); // Dispatch INCREMENT after 1 second
    }, 1000);
  };
};
```

---

#### **Step 2: Reducer (`src/reducers/index.js`)**
```javascript
import { INCREMENT, DECREMENT } from '../actions';

// Initial State
const initialState = {
  count: 0,
};

// Reducer Function
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default counterReducer;
```

---

#### **Step 3: Store Configuration (`src/store/index.js`)**
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Middleware for async actions
import counterReducer from '../reducers';

// Create Redux Store with Thunk Middleware
const store = createStore(counterReducer, applyMiddleware(thunk));

export default store;
```

---

#### **Step 4: React Component (`src/components/Counter.js`)**
```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementAsync } from '../actions';

const Counter = () => {
  const count = useSelector((state) => state.count); // Access state
  const dispatch = useDispatch(); // Access dispatch function

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementAsync())}>Increment Async (1s delay)</button>
    </div>
  );
};

export default Counter;
```

---

#### **Step 5: Main App (`src/App.js`)**
```javascript
import React from 'react';
import Counter from './components/Counter';

const App = () => {
  return (
    <div>
      <h1>Redux with Thunk Example</h1>
      <Counter />
    </div>
  );
};

export default App;
```

---

#### **Step 6: Entry Point (`src/index.js`)**
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

---

### 3. How It Works
1. **State Management**:
   - The `counterReducer` manages the `count` state.
   - The initial state is `{ count: 0 }`.

2. **Actions**:
   - `increment` and `decrement` are synchronous actions that update the `count` state.
   - `incrementAsync` is a thunk action that dispatches `increment` after a 1-second delay.

3. **React Component**:
   - The `Counter` component uses `useSelector` to access the `count` state and `useDispatch` to dispatch actions.
   - Buttons trigger the `increment`, `decrement`, and `incrementAsync` actions.

4. **Redux Store**:
   - The store is created with `redux-thunk` middleware to handle asynchronous actions.

---

### 4. Run the App
1. Install dependencies:
   ```bash
   npm install redux react-redux redux-thunk axios
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open the app in your browser and interact with the buttons to see Redux in action!

---

This example covers the entire Redux flow with Thunk, including:
- Action creators
- Reducers
- Store configuration
- Thunk for async actions
- Connecting Redux to a React component

Let me know if you have any questions! 😊
