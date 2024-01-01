import React, { useState } from 'react';

function NewCodePostForm({ onSubmit }) {
  const [newCodePost, setNewCodePost] = useState({ code: '', language: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newCodePost);
    setNewCodePost({ code: '', language: '' });
  };

  return (
    <div>
      <h2>Create a New Code Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Code"
          value={newCodePost.code}
          onChange={(e) => setNewCodePost({ ...newCodePost, code: e.target.value })}
        />
        <input
          type="text"
          placeholder="Language"
          value={newCodePost.language}
          onChange={(e) => setNewCodePost({ ...newCodePost, language: e.target.value })}
        />
        <button type="submit">Submit Code</button>
      </form>
    </div>
  );
}

export default NewCodePostForm;