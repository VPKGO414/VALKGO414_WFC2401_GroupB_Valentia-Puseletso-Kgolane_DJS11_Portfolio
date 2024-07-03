import React from 'react';
import Button from '../components/Button';
import '../styles/SignInPage.css';

interface SignInPageProps {
  onSignInSuccess: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSignInSuccess }) => {
  const handleSignIn = () => {
    // Handle sign-in logic here
    onSignInSuccess(); // Transition to the home page
  };

  return (
    <div className="sign-in-page">
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
        <Button onClick={handleSignIn}>Sign In</Button>
      </form>
    </div>
  );
};

export default SignInPage;
