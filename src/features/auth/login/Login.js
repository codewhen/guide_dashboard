import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { NavItem, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../core/config/config";
import styles from "./Login.module.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("secret_token");
    if (!!token) {
      navigate(`/`, { replace: true });
    }
  }, [navigate]);

  const submitForm = async (e) => {
    setisLoading(true);
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Request-Headers", "*");

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        header: headers,
        email: email,
        password: password,
      });
      console.log(response);

      if (response.data.message) {
        toast.error(response.data.message);
        setisLoading(false);
        return;
      }
      localStorage.setItem("secret_token", response.data.token);

      if (!!response.data.user.volunteerRef) {
        localStorage.setItem("volunteerRef", response.data.user.volunteerRef);
      } else if (!!response.data.user.ngoRef) {
        localStorage.setItem("ngoRef", response.data.user.ngoRef);
      }
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

          <form onSubmit={submitForm}>
            <input
              ref={emailRef}
              type="text"
              id="email"
              placeholder="Email"
              required
            />
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <input type="submit" value="Log In" />
          </form>

          <div id={styles.formFooter}>
            <Link to={`/register/`} className="underlineHover" href="#">
              Sign up?
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
