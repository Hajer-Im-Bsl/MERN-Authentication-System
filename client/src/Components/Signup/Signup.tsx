import React, { useState, type ChangeEvent } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../Utils/RegEx";
import toast from "react-hot-toast";
import axios from "axios";
type Props = {};

function signup({}: Props) {
  //! Init states
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  //! Handle changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //? event.target is an <input> element
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value })); //? square brackets make name a computed property key.
  };
  //! Handle sign up
  const handleSignUp = async () => {
    if (!userDetails.username) {
      toast.error("Please Provide a valid username!");
      return;
    }

    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please Provide a valid email address!");
      return;
    }
    if (!passwordRegex.test(userDetails.password)) {
      toast.error(
        "Password must be at least 8 characters and must include at least one special character and one number!"
      );
      return;
    }
    //? submitting data
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}api/v1/user/register`,
        userDetails
      );
      console.log(response);
      if (response.status == 201) {
        toast.success(response.data.message);
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Sign Up...</h2>
        <div className={styles.inputContainer}>
          <input
            value={userDetails.username}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter your username... "
            name="username"
          />
          <input
            value={userDetails.email}
            type="email"
            placeholder="Enter your email... "
            onChange={handleInputChange}
            name="email"
          />
          <div className={styles.passwordContainer}>
            <input
              value={userDetails.password}
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter your password... "
              onChange={handleInputChange}
            />
            <button onClick={() => setShow(!show)}>
              {show ? "HIDE" : "SHOW"}
            </button>
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default signup;
