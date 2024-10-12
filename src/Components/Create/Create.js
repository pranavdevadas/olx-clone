import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { storage, db, auth } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [user] = useAuthState(auth);

  let navigate = useNavigate();

  let date = new Date();

  const validateForm = () => {
    let formErrors = {};

    if (!name) formErrors.name = 'Name is required';
    if (!category) formErrors.category = 'Category is required';
    if (!price || price <= 0) formErrors.price = 'Price must be a positive number';
    if (!image) formErrors.image = 'Please select an image';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!user) {
      alert('You must be logged in to upload files');
      return;
    }

    const storageRef = ref(storage, `images/${user.uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);

        try {
          await addDoc(collection(db, 'items'), {
            name,
            category,
            price,
            imageUrl: downloadURL,
            userId: user.uid,
            createdAt: date,
          });
          alert('File uploaded and data saved successfully!');
          navigate('/');
        } catch (error) {
          console.error('Error saving document:', error);
          alert('Error saving document');
        }
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="Category"
        />
        {errors.category && <span className="error">{errors.category}</span>}
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          name="Price"
        />
        {errors.price && <span className="error">{errors.price}</span>}
        <br />
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        {errors.image && <span className="error">{errors.image}</span>}
        <br />
        <button className="uploadBtn" onClick={handleSubmit}>Upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
