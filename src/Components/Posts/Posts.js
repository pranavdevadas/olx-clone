import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../contexts/FirebaseContext'
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../contexts/PostContext';
import { useNavigate } from 'react-router-dom';
function Posts() {

  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'items');
        const snapshot = await getDocs(postsRef); 
        const allPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  let handleFunction = () => {

  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
       <div className="cards">
       {  products.map(product => {
  return  <div className="card"
            onClick={() => {
              setPostDetails(product);
              navigate('/view');
            }} >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category} </span>
              <p className="name">{product.name} </p>
            </div>
            
          </div>
      })  }
        </div>   
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
       {  products.map(product => {
  return  <div className="card"
          onClick={() => {
            setPostDetails(product);
            navigate('/view');
          }} >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category} </span>
              <p className="name">{product.name} </p>
            </div>
            
          </div>
      })  }
        </div>   
      </div>
    </div>
  );
}

export default Posts;
