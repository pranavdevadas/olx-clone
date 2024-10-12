// src/contexts/FirestoreContext.js
import React, { createContext, useContext } from 'react';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const FirestoreContext = createContext();

export const useFirestore = () => useContext(FirestoreContext);

export const FirestoreProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const addItem = async (name, category, price, image) => {
    if (!currentUser) {
      throw new Error('You must be logged in to upload files');
    }

    const date = new Date();

    const storageRef = ref(storage, `images/${currentUser.uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            
            const docRef = await addDoc(collection(db, 'items'), {
              userId: currentUser.uid,
              name,
              category,
              price,
              imageUrl: downloadURL,
              createdAt: date,
            });

            resolve(docRef);
          } catch (error) {
            console.error('Error saving document:', error);
            reject(error);
          }
        }
      );
    });
  };

  const getUserItems = async () => {
    if (!currentUser) {
      throw new Error('You must be logged in to retrieve items');
    }

    const q = query(collection(db, 'items'), where('userId', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return items;
  };

  return (
    <FirestoreContext.Provider value={{ addItem, getUserItems }}>
      {children}
    </FirestoreContext.Provider>
  );
};
