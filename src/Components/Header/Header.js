import React, { useEffect, useState } from 'react';
import { auth, db, logout } from './../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useNavigate } from 'react-router-dom';



function Header() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        fetchUsername(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUsername = async (userId) => {
    const q = query(collection(db, 'users'), where('uid', '==', userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      setUsername(userData.username);
    }
  };

  let navigate = useNavigate()

  let handleClick = () => {
    logout()
    navigate('/login')

  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? username : <span onClick={() => navigate('/login')} className='logout' >Login</span>}
          <hr />
        </div>
       { user && <span onClick={() => handleClick()} className='logout' >Logout</span>}
        <div className="sellMenu" onClick={() => navigate('/create') }>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
