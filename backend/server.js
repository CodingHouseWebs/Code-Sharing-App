const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const codePostsFile = 'codePosts.json';
const usersFile = 'users.json';

const readCodePostsFromFile = () => {
  try {
    const data = fs.readFileSync(codePostsFile, 'utf8');
    return JSON.parse(data) || [];
  } catch (err) {
    return [];
  }
};

const writeCodePostsToFile = (codePosts) => {
  fs.writeFileSync(codePostsFile, JSON.stringify(codePosts, null, 2), 'utf8');
};

const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data) || [];
  } catch (err) {
    return [];
  }
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
};

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    res.status(400).json({ error: 'Username already exists' });
  } else {
    users.push({ username, password });
    writeUsersToFile(users);
    res.json({ message: 'Registration successful' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/codePosts', (req, res) => {
  const codePosts = readCodePostsFromFile();
  res.json(codePosts);
});

app.post('/api/codePosts', (req, res) => {
  const newCodePost = req.body;
  const codePosts = readCodePostsFromFile();
  const updatedCodePosts = [
    ...codePosts,
    { ...newCodePost, id: codePosts.length + 1, likes: 0, dislikes: 0, comments: [] },
  ];
  writeCodePostsToFile(updatedCodePosts);
  res.json(newCodePost);
});

app.post('/api/like', (req, res) => {
  const { postId } = req.body;
  const codePosts = readCodePostsFromFile();
  const updatedCodePosts = codePosts.map(post => {
    if (post.id === postId) {
      post.likes += 1;
    }
    return post;
  });
  writeCodePostsToFile(updatedCodePosts);
  res.json({ message: 'Liked successfully' });
});

app.post('/api/dislike', (req, res) => {
  const { postId } = req.body;
  const codePosts = readCodePostsFromFile();
  const updatedCodePosts = codePosts.map(post => {
    if (post.id === postId) {
      post.dislikes += 1;
    }
    return post;
  });
  writeCodePostsToFile(updatedCodePosts);
  res.json({ message: 'Disliked successfully' });
});

app.post('/api/comment', (req, res) => {
  const { postId, comment } = req.body;
  const codePosts = readCodePostsFromFile();
  const updatedCodePosts = codePosts.map(post => {
    if (post.id === postId) {
      post.comments.push(comment);
    }
    return post;
  });
  writeCodePostsToFile(updatedCodePosts);
  res.json({ message: 'Commented successfully' });
});

app.post('/api/reportIssue', (req, res) => {
  const { postId, issue } = req.body;
  const codePosts = readCodePostsFromFile();
  const updatedCodePosts = codePosts.map(post => {
    if (post.id === postId) {
      post.issues = post.issues || [];
      post.issues.push(issue);
    }
    return post;
  });
  writeCodePostsToFile(updatedCodePosts);
  res.json({ message: 'Issue reported successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});