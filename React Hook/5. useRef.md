```jsx
import React, { useRef } from 'react';

const LoginForm = () => {
  // Create refs for the username and password inputs
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Access the current values of the inputs using refs
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // Perform your form submission logic here
    console.log('Username:', username);
    console.log('Password:', password);

    // You can also send this data to an API or handle it as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
```

### Explanation:
1. **`useRef` Hook**: 
   - We use `useRef` to create references (`usernameRef` and `passwordRef`) to the input elements.
   - These refs allow us to directly access the DOM elements and their values without needing to use state.

2. **Form Submission**:
   - The `handleSubmit` function is triggered when the form is submitted.
   - It prevents the default form submission behavior using `event.preventDefault()`.
   - It then retrieves the values of the username and password inputs using the `current.value` property of the refs.

3. **Rendering the Form**:
   - The form contains two input fields for the username and password, each associated with a ref.
   - The `onSubmit` event handler is attached to the form to handle the submission.

### Usage:
- When the form is submitted, the `handleSubmit` function logs the username and password to the console.
- You can replace the `console.log` statements with actual logic, such as sending the data to an API or validating the inputs.

This is a basic example, but it demonstrates how to use `useRef` to manage form inputs in a React functional component.
