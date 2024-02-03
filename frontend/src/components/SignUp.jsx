import React from "react";
import "../static/SignUp.css";

const SignUp = () => {
  return (
    <div id="form-container">
      <form id="create-account-form">
        <h1>Create an Account</h1>
        <div className="input-group">
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required/>
        </div>
        <div className="input-group">
          <input type="password" name="password" placeholder="Password" required/>
        </div>
        <div className="input-group">
          <input type="text" placeholder="Adress" required />
        </div>
          <button type="submit" className="custom-btn btn-2"><span>SignUp</span></button>
          <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
};

export default SignUp;
