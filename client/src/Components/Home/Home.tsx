import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
type Props = {};

function Home({}: Props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}api/v1/user/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // console.log(response.data.user);
      setUser(response.data);
      console.log(response.data);
    } catch (error: any) {
      toast.error(error.response.data.mesage);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className={styles.container}>
      {user && (
        <nav>
          <span>Hello {user?.username}</span>

          <button
            className={styles.logoutBtn}
            onClick={() => {
              localStorage.clear();
              navigate("/");
              toast.success("User logged out successfully!");
            }}
          >
            Logout
          </button>
        </nav>
      )}
      {user && (
        <div className={styles.mainContainer}>
          <div className={styles.user}>
            user details
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>

          {/**
         *   <div className={styles.editContainer}>
            Update User
            <div>
              <input type="text" placeholder="Update Username" />
              <button>Edit</button>
            </div>
            <input type="email" placeholder="Update Email" />
            <div className={styles.passwordContainer}>
              <input
                type={show ? "text" : "password"}
                placeholder="Update Password"
              />
              <button onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
         */}
        </div>
      )}
    </div>
  );
}

export default Home;
