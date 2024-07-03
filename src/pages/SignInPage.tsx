import React from 'react';
import '../styles/SignInPage.css';

const SignInPage: React.FC = () => {
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
