// src/firebase/FirebaseContext.js
import React, { createContext, useContext } from 'react';
import { auth, db, storage } from '../firebase'; 

export const FirebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const firebase = {
    auth,
    db,
    storage,
  };

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};


