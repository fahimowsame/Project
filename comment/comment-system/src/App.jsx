// src/App.jsx
import React from 'react';
import GoogleAuth from './components/GoogleAuth'
import CommentProvider from './context/CommentContext';  // Importing the context provider for comments
import CommentForm from './components/CommentForm';  // Importing the form to add comments
import CommentList from './components/CommentList';  // Importing the list to display comments

function App() {
  return (
    <div className="container mx-auto p-4">
      {/* Authentication Component */}
      <GoogleAuth />

      {/* Wrapping the Comment System in a Context Provider */}
      <CommentProvider>
        <div className="mt-4">
          {/* Comment Input Form */}
          <CommentForm />
          
          {/* Comment List with Sorting, Pagination, and Reactions */}
          <CommentList />
        </div>
      </CommentProvider>
    </div>
  );
}

export default App;
