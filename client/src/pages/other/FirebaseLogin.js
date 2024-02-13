
import React, { useState } from 'react';
import { auth } from './firebaseA';
import { signInWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';

const FirebaseLogin = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    try {
      // Reset previous errors
      setError(null);

      // Use the 'signInWithEmailAndPassword' method
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch additional user details after successful login
      const authUser = getAuth().currentUser;

      // Check if the email is verified
      if (!authUser.emailVerified) {
        // Send verification email
        await sendEmailVerification(authUser);

        // Update the user state in the parent component
        setUser(authUser);
      } else {
        // Email is already verified, update the user state
        setUser(authUser);
      }

      // Update the user details state
      setUserDetails(authUser);
    } catch (error) {
      console.error('Login error:', error.message);

      // Update the error state
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userDetails && (
        <div>
          <h3>Welcome, {userDetails.displayName}</h3>
          <p>Email: {userDetails.email}</p>
          <p>Email Verified: {userDetails.emailVerified ? 'Yes' : 'No'}</p>
          {/* Add other user details as needed */}
        </div>
      )}
    </div>
  );
};

export default FirebaseLogin;