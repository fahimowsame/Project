import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db } from './Firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data is stored in local storage on component mount
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      // Check if the user exists in Firestore
      const userDoc = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        // If the user exists, retrieve and store their data in local storage
        const userData = userSnap.data();
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        // If the user does not exist, create a new user document in Firestore
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        await setDoc(userDoc, newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
      }
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Clear local storage and user state
        localStorage.removeItem('user');
        setUser(null);
      })
      .catch((error) => {
        console.error('Error signing out', error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <img src={user.photoURL} alt={user.displayName} className="rounded-full w-8 h-8" />
          <span className="ml-2">{user.displayName}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded ml-4">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin} className="bg-blue-500 text-white p-2 rounded">
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
