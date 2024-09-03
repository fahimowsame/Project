import React, { useContext, useState } from 'react';
import { CommentContext } from '../context/CommentContext';
import { db } from './Firebase';
import { updateDoc, doc } from 'firebase/firestore';
import CommentItem from './CommentItem';

const CommentList = () => {
  const { comments, loading } = useContext(CommentContext);
  const [sortType, setSortType] = useState('latest'); // 'latest' or 'popularity'
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 8;

  // Handle sorting comments
  const sortedComments = comments.sort((a, b) => {
    if (sortType === 'latest') {
      return b.timestamp?.seconds - a.timestamp?.seconds;
    } else if (sortType === 'popularity') {
      const reactionsA = (a.likes || 0) - (a.dislikes || 0);
      const reactionsB = (b.likes || 0) - (b.dislikes || 0);
      return reactionsB - reactionsA;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle reactions (likes/dislikes)
  const handleReaction = async (commentId, type) => {
    try {
      const commentRef = doc(db, 'comments', commentId);
      if (type === 'like') {
        await updateDoc(commentRef, {
          likes: (comments.find(c => c.id === commentId)?.likes || 0) + 1
        });
      } else if (type === 'dislike') {
        await updateDoc(commentRef, {
          dislikes: (comments.find(c => c.id === commentId)?.dislikes || 0) + 1
        });
      }
    } catch (error) {
      console.error('Error updating reactions:', error);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="mt-4">
      {/* Sorting Controls */}
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">Comments</h3>
        <select 
          onChange={(e) => setSortType(e.target.value)} 
          className="border p-2 rounded"
        >
          <option value="latest">Latest</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* Comment List */}
      {currentComments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          handleReaction={handleReaction} // Passing the handleReaction function as a prop
        />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`p-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
