import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CodePostList from './components/CodePostList';
import NewCodePostForm from './components/NewCodePostForm';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [codePosts, setCodePosts] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      axios.get('http://localhost:3001/api/codePosts')
        .then(response => setCodePosts(response.data))
        .catch(error => console.error('Error fetching code posts: ', error));
    }
  }, [loggedIn]);

  const handleRegister = () => {
    axios.post('http://localhost:3001/api/register', { username, password })
      .then(response => {
        console.log(response.data);
        setLoggedIn(true);
      })
      .catch(error => console.error('Error registering: ', error));
  };

  const handleLogin = () => {
    axios.post('http://localhost:3001/api/login', { username, password })
      .then(response => {
        console.log(response.data);
        setLoggedIn(true);
      })
      .catch(error => console.error('Error logging in: ', error));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleCodePostSubmit = (newCodePost) => {
    axios.post('http://localhost:3001/api/codePosts', newCodePost)
      .then(response => setCodePosts([...codePosts, response.data]))
      .catch(error => console.error('Error creating code post: ', error));
  };

  const handleLike = (postId) => {
    axios.post('http://localhost:3001/api/like', { postId })
      .then(response => {
        console.log(response.data);
        // Refresh code posts after liking
        axios.get('http://localhost:3001/api/codePosts')
          .then(response => setCodePosts(response.data))
          .catch(error => console.error('Error fetching code posts: ', error));
      })
      .catch(error => console.error('Error liking code post: ', error));
  };

  const handleDislike = (postId) => {
    axios.post('http://localhost:3001/api/dislike', { postId })
      .then(response => {
        console.log(response.data);
        // Refresh code posts after disliking
        axios.get('http://localhost:3001/api/codePosts')
          .then(response => setCodePosts(response.data))
          .catch(error => console.error('Error fetching code posts: ', error));
      })
      .catch(error => console.error('Error disliking code post: ', error));
  };

  const handleCommentSubmit = (postId, comment) => {
    axios.post('http://localhost:3001/api/comment', { postId, comment })
      .then(response => {
        console.log(response.data);
        // Refresh code posts after commenting
        axios.get('http://localhost:3001/api/codePosts')
          .then(response => setCodePosts(response.data))
          .catch(error => console.error('Error fetching code posts: ', error));
      })
      .catch(error => console.error('Error commenting on code post: ', error));
  };

  const handleReportIssue = (postId, issue) => {
    axios.post('http://localhost:3001/api/reportIssue', { postId, issue })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error reporting issue: ', error));
  };

  return (
    <div>
      <h1>Code Sharing App</h1>
      {loggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
          <NewCodePostForm onSubmit={handleCodePostSubmit} />
          <CodePostList
            codePosts={codePosts}
            onLike={handleLike}
            onDislike={handleDislike}
            onCommentSubmit={handleCommentSubmit}
            onReportIssue={handleReportIssue}
          />
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>

          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;