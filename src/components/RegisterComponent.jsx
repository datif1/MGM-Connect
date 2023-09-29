import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import MGMConnectLogo from "../assets/MGMConnectLogo.png";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

export default function RegisterComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const register = async () => {
    try {
      if (credentials.email.endsWith("mgmtech.org")) {
        let res = await RegisterAPI(credentials.email, credentials.password);
        toast.success("Account Created!");
        postUserData({
          userID: getUniqueID(),
          name: credentials.name,
          email: credentials.email,
          imageLink: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        });
        navigate("/home");
        localStorage.setItem("userEmail", res.user.email);
      } else {
        toast.error("Please use an email ending with 'mgmtech.org'");
      }
    } catch (err) {
      console.error(err);
      toast.error("Account Could not be created.");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={MGMConnectLogo} className="MGMConnectLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
        <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className= "btn-container">
        <p className="go-to-signup">
          Already on MGMConnect?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
