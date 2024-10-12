import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../contexts/PostContext';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { collection, query, where, getDocs } from 'firebase/firestore';


function View() {

  let [user, setUser] = useState()
  let {postDetails} = useContext(PostContext)
  const {Firestore}=useContext(FirebaseContext)
  useEffect(() => {
    const getUsers = async () => {
      try {
        
        console.log(user);
        const {userId}=postDetails 
        const q = query(collection(Firestore, "users"), where("id", "==", userId));
        const snapshot = await getDocs(q);
        const userDetails = snapshot.docs[0].data();
        setUser(userDetails)
        console.log(11,userDetails.name);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, [Firestore,postDetails]);
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span> {postDetails.name} </span>
          <p> {postDetails.category} </p>
          <span>Tue Jun 04 2024</span>
        </div>
        <div className="contactDetails">
          <p>Pranav</p>
          <p> </p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
