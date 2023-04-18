import React, { useState, useEffect, useContext } from "react";
import { MyValidator } from "../utils/MyValidator";
import { validatorsMethods } from "../utils/validatorsMethods";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = await MyValidator(email, "Email", (a, b) => {
      validatorsMethods
        .start(a, b)
        .isRequired()
        .email();
    });

    const validPassword = await MyValidator(password, "Password", (a, b) => {
      validatorsMethods
        .start(a, b)
        .isRequired()
        .strMin(8);
    });

    if (validEmail?.field) {
      console.log(validEmail.message);
      return;
    }

    // if (validPassword?.field) {
    //   console.log(validPassword.message);
    //   return;
    // }
    // console.log(email, ' test ', password);
    axios
      .post("http://localhost:3001/api/user/login", { email, password })
      .then((res) => {
        const token = res.data.token;
        // dispatch({ type: "LOGGED_IN", payload: { token } });
        login(token);
        navigate("/dashboard");
      })

      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };
  return (
    <>
      <div className="container">

        {errorMessage && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
            style={{ padding: "10px" }}
          >
            <strong>{errorMessage}</strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              style={{
                float: "right",
                background: "none",
                border: "none",
              }}
              onClick={() => setErrorMessage("")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}


        <form onSubmit={handleSubmit}>
          {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="row mb-4">

              <div className="col">

              </div>
            </div>

            {/* <!-- Email i/nput --> */}
            <div className="form-outline mb-4">
              <label className="form-label" for="form3Example3">Email address</label>
              <input name="email"
                type="email"
                className="form-control"
                id="first_field"
                placeholder="Email Address"
                aria-label="Email Address"
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
              <label className="form-label" for="form3Example4">Password</label>
              <input name="password"
                type="password"
                className="form-control"
                autocomplete="off"
                id="second_field"
                placeholder="Password"
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)} />
            </div>


            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>


          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
