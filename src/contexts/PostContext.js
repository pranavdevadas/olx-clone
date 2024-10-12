import React, { createContext, useState } from 'react';

const PostContext = createContext(null);

const Post = ({ children }) => {
  const [postDetails, setPostDetails] = useState(null);

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, Post };