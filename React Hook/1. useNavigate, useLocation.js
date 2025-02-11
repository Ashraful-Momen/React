================================== Route Navigate with Params ====================================
*** useNavigate() , useLocation(). 

#How to navigate any route => /profile with params => 
------------------------------------------------------
 navigate('/route_name', { state: pass_object });

 details code SingIn.jsx => 
 ---------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = user; // Corrected destructuring

    console.log("User:", user);
    console.log("Name:", userName, "Password:", password);

    if (userName === "Ashraful" && password === "786Shuvo") {
      console.log("Valid Credential");
      navigate('/profile', { state: user });
    } else {
      console.log("Invalid Credentials");
    }
  };

#how to receive object from route => 
--------------------------------------
const location = useLocation(); 
    console.log("Location data ",location);

details code Profile.jsx=> 
---------------------------
import { useLocation } from 'react-router-dom'

const Profile = () => {
    const location = useLocation(); 
    console.log("Location data ",location); 
  return (
    <div>
        <h4>User Profile</h4>
    </div>
  )
}
