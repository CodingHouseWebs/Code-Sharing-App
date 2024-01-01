import React, { useState } from 'react';

function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

function CommentList({ comments }) {
  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
    </div>
  );
}

function CodePost({ codePost, onLike, onDislike, onCommentSubmit }) {
  const handleCommentSubmit = (comment) => {
    onCommentSubmit(codePost.id, comment);
  };

  return (
    <div>
      <h3>{codePost.language}</h3>
      <pre>{codePost.code}</pre>
      <button onClick={() => onLike(codePost.id)}>Like</button>
      <button onClick={() => onDislike(codePost.id)}>Dislike</button>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={codePost.comments} />
    </div>
  );
}

function CodePostList({ codePosts, onLike, onDislike, onCommentSubmit }) {
  return (
    <div>
      <h2>Code Posts</h2>
      {codePosts.map((codePost) => (
        <CodePost
          key={codePost.id}
          codePost={codePost}
          onLike={onLike}
          onDislike={onDislike}
          onCommentSubmit={onCommentSubmit}
        />
      ))}
    </div>
  );
}

export default CodePostList;