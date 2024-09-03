// src/components/CommentItem.js
import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaTrashAlt, FaReply } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './Firebase';
import { doc, deleteDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';

const CommentItem = ({ comment, handleReaction }) => {
  const [user] = useAuthState(auth);
  const [showFullText, setShowFullText] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const { id, text, fileUrl, username, userPhoto, userId, likes = 0, dislikes = 0, timestamp, replies = [] } = comment;

  const toggleShowFullText = () => setShowFullText(!showFullText);
  const toggleReplyInput = () => setShowReply(!showReply);

  const handleAddReply = async () => {
    if (!replyText.trim()) return; // Avoid empty replies

    try {
      await updateDoc(doc(db, 'comments', id), {
        replies: arrayUnion({
          text: `@${username} ${replyText}`, // Prepend username to reply
          userId: user.uid,
          username: user.displayName,
          userPhoto: user.photoURL,
          timestamp: Timestamp.now()
        })
      });
      setReplyText('');
      setShowReply(false);
    } catch (error) {
      console.error('Error adding reply: ', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteDoc(doc(db, 'comments', id));
        alert('Comment deleted successfully.');
      } catch (error) {
        console.error('Error deleting comment: ', error);
      }
    }
  };

  return (
    <div className="border p-4 mb-4 rounded">
      {/* User Information and Timestamp */}
      <div className="flex items-center mb-2">
        <img
          src={userPhoto}
          alt={`${username}'s profile`}
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <p className="font-bold">{username}</p>
          <p className="text-gray-500 text-xs">
            {timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : ''}
          </p>
        </div>
      </div>

      {/* Comment Text */}
      <p className="text-sm">
        {showFullText ? text : text.length > 100 ? `${text.substring(0, 100)}...` : text}
        {text.length > 100 && (
          <button
            onClick={toggleShowFullText}
            className="text-blue-500 ml-2"
          >
            {showFullText ? 'Show Less' : 'Show More'}
          </button>
        )}
      </p>

      {/* Display Attached Image/File */}
      {fileUrl && (
        <div className="mt-2">
          <img
            src={fileUrl}
            alt="Attached file"
            className="max-w-xs rounded"
          />
        </div>
      )}

      {/* Reaction Buttons */}
      <div className="flex items-center mt-2 space-x-4">
        <button onClick={() => handleReaction(id, 'like')} className="flex items-center">
          <FaThumbsUp className="mr-1" /> {likes}
        </button>
        <button onClick={() => handleReaction(id, 'dislike')} className="flex items-center">
          <FaThumbsDown className="mr-1" /> {dislikes}
        </button>
        {user && user.uid === userId && (
          <button onClick={handleDelete} className="flex items-center text-red-500">
            <FaTrashAlt className="mr-1" /> Delete
          </button>
        )}
        <button onClick={toggleReplyInput} className="flex items-center">
          <FaReply className="mr-1" /> Reply
        </button>
      </div>

      {/* Reply Input Field */}
      {showReply && (
        <div className="mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to @${username}...`}
            className="border p-2 rounded w-full"
            rows="2"
          ></textarea>
          <button
            onClick={handleAddReply}
            className="bg-blue-500 text-white p-1 rounded mt-1"
          >
            Add Reply
          </button>
        </div>
      )}

      {/* Display Replies */}
      {replies.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">Replies:</p>
          {replies.map((reply, index) => (
            <div key={index} className="border-t border-gray-200 mt-2 pt-2">
              <div className="flex items-center">
                <img
                  src={reply.userPhoto}
                  alt={`${reply.username}'s profile`}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <p className="font-bold mr-2">{reply.username}</p>
                <p className="text-gray-500 text-xs">
                  {reply.timestamp ? new Date(reply.timestamp.seconds * 1000).toLocaleString() : ''}
                </p>
              </div>
              <p className="ml-8">{reply.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
