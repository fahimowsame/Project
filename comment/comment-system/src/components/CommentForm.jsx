import React, { useState } from 'react';
import { db, auth, storage } from './Firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Picker } from 'emoji-mart'; 
import 'emoji-mart/css/emoji-mart.css';

const CommentForm = () => {
  const [user] = useAuthState(auth);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
  };

  const insertTextAtCursor = (tag) => {
    const textarea = document.getElementById('commentTextarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    const newText = text.slice(0, start) + `<${tag}>${selectedText}</${tag}>` + text.slice(end);
    setText(newText);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUnderlineToggle = () => {
    setUnderlineActive(!underlineActive);
    insertTextAtCursor('u');
  };

  const handleBold = () => insertTextAtCursor('b');
  const handleItalic = () => insertTextAtCursor('i');

  const handleAddLink = () => {
    const url = prompt('Enter URL');
    if (url) {
      insertTextAtCursor(`a href="${url}"`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return setError('Comment cannot be empty');
    if (!user) return setError('Please sign in to post a comment');

    try {
      setLoading(true);
      let fileUrl = '';
      if (file) {
        const fileRef = ref(storage, `comments/${file.name}`);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, 'comments'), {
        text,
        fileUrl,
        username: user.displayName,
        userPhoto: user.photoURL,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });

      setText('');
      setFile(null);
      setError(''); 
    } catch (error) {
      console.error('Error posting comment', error);
      setError('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <textarea
        id="commentTextarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Write a comment..."
        maxLength={250}
        className="border p-2 rounded"
      ></textarea>

      {/* Emoji Picker Toggle */}
      {showEmojiPicker && <Picker onSelect={handleEmojiSelect} />}
      <div className='w-[250px] flex space-x-2'>
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
        <button type="button" onClick={handleBold}>B</button>
        <button type="button" onClick={handleItalic}>I</button>
        <button type="button" onClick={handleUnderlineToggle} className={underlineActive ? 'underline' : ''}>U</button>
        <button type="button" onClick={handleAddLink}>🔗</button>
      </div>

      {/* File Input */}
      <div className='w-[250px]'>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
