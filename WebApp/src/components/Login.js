import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { magic } from "../magic";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });
      history.push("/");
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  /**
   * Saves the value of our email input into component state.
   */
  const handleInputOnChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className="login-clean">
      <form>
        <h2 className="visually-hidden">Login Form</h2>
        <div className="illustration">
            <i className="icon ion-android-alarm-clock"></i>
            <h2 className="text-center login-title"><strong>ReMedy...</strong></h2>
        </div>
        <div className="mb-3"><input
          type="email"
          name="email"
          required="required"
          placeholder="Enter your email"
          onChange={handleInputOnChange}
          disabled={isLoggingIn}
        /></div>
        <div className="mb-3"></div>
        <div className="mb-3">
            <button className="btn btn-primary d-block w-100" data-bss-hover-animate="rubberBand" onClick={login} disabled={isLoggingIn}>Log In with
                Magic!</button>
        </div>
      </form>
    </div>
  );
}

