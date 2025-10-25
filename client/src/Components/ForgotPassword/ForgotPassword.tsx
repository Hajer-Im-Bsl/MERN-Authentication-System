import React from "react";
import styles from "./ForgotPassword.module.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { passwordRegex, emailRegex } from "../../Utils/RegEx";
import { useNavigate, Link } from "react-router-dom";
type Props = {};

function ForgotPassword({ Props }: any) {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Forgot Pssword</h2>
        {step === 0 && <EmailComponent setStep={setStep} />}
        {step === 1 && <OTPComponent setStep={setStep} />}
        {step === 2 && <PasswordComponent setStep={setStep} />}
      </div>
    </div>
  );
}

export default ForgotPassword;

const EmailComponent = ({ setStep }: any) => {
  const [email, setEmail] = useState("");
  const getOTP = async () => {
    if (!emailRegex.test(email)) {
      toast.error("Please Provide a valid email address!");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}api/v1/user/resetPassword`,
        { email }
      );
      toast.success(response.data.message);
      setStep(1);
      localStorage.setItem("email", email);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className={styles.inputContainer}>
      <input
        name="email"
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={() => getOTP()}>GET OTP</button>
      <Link to="/">Wanna Login?</Link>
    </div>
  );
};

const OTPComponent = ({ setStep }: any) => {
  const [OTP, setOTP] = useState("");
  const verifyOTP = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_SERVER_URL
        }api/v1/user/verifyPasswordToken/${OTP}`
      );
      toast.success(response.data.message);
      setStep(2);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message + "Please try again");
      setStep(0);
    }
  };
  return (
    <div className={styles.inputContainer}>
      <input
        name="OTP"
        type="text"
        placeholder="Enter your OTP..."
        value={OTP}
        onChange={(e) => {
          setOTP(e.target.value);
        }}
      />
      <button onClick={verifyOTP}>VERIFY OTP</button>
    </div>
  );
};

const PasswordComponent = ({}: any) => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async () => {
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and must include at least one special character and one number!"
      );
      return;
    }
    //? reset password
    try {
      const email = localStorage.getItem("email");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}api/v1/user/resetPassword`,
        { password, isOTPVerified: true, email }
      );
      toast.success(response.data.message);
      navigate("/home");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={styles.PasswordComponent}>
      <div className={styles.passwordContainer}>
        <input
          name="password"
          type={show ? "text" : "password"}
          placeholder="Enter your new password..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
      </div>
      <div className={styles.inputContainer}>
        <button onClick={resetPassword}>RESET PASSWORD</button>
      </div>
    </div>
  );
};
