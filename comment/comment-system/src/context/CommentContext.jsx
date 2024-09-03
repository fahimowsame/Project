// src/context/CommentContext.js
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../components/Firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CommentContext.Provider value={{ comments, loading }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
