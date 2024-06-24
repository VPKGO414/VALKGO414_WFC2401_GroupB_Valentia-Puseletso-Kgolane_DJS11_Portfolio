import React from 'react';
import '../styles/SignInPage.css';

interface SignInPageProps {
  onSuccessfulSignIn: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSuccessfulSignIn }) => {
  const handleSignIn = () => {
    // Simulate successful sign-in
    onSuccessfulSignIn();
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <h1>Sign In</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
