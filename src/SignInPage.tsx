import React from 'react';
import './SignInPage.css';

const SignInPage: React.FC = () => {
  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement actual sign-in logic here
    alert('Sign-in form submitted!');
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
