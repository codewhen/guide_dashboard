import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../core/config/config";
import styles from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("secret_token");
    if (!!token) {
      navigate(`/`, { replace: true });
    }
  }, [navigate]);

  const submitForm = async (e) => {
    setisLoading(true);
    e.preventDefault();

    const orgName = formRef.current[0].value;
    const email = formRef.current[1].value;
    const phone = formRef.current[2].value;
    const password = formRef.current[3].value;
    const confirm = formRef.current[4].value;

    if (password !== confirm) {
      toast.error("password and confirm password doesn't match");
      setisLoading(false);
      return;
    }

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Request-Headers", "*");

    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, {
        header: headers,
        email: email,
        password: password,
        name: orgName,
        phone: phone,
      });
      console.log(response);

      if (response.data.message !== "Signup successful") {
        toast.error(response.data.message);
        setisLoading(false);
        return;
      }
      localStorage.setItem("secret_token", response.data.token);

      setisLoading(false);

      navigate(`/`);
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };

  return (
    <section>
      <div className={`${styles.wrapper} ${styles.fadeInDown}`}>
        <div id={styles.formContent}>
          <div>
            <h1>GUIDE Admin Panel</h1>
          </div>
          <form ref={formRef} onSubmit={submitForm}>
            <input
              type="text"
              id="name"
              placeholder="Organisation Name"
              required
            />
            <input type="text" id="email" placeholder="Email" required />
            <input type="text" id="phone" placeholder="Phone No." required />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              required
            />
            <input type="submit" value="Sign Up" />
          </form>

          <div id={styles.formFooter}>
            <Link to={`/login/`} className="underlineHover" href="#">
              Log In?
            </Link>
          </div>
        </div>
      </div>

      <Portal node={document && document.getElementById("loader")}>
        {isLoading && (
          <div className="loader-context">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </Portal>
    </section>
  );
}
