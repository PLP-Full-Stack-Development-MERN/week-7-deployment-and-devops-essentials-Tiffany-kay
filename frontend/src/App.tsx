import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Post = {
  _id: string;
  title: string;
  content: string;
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get<Post[]>(API_URL)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Post>(API_URL, { title, content });
      setPosts([...posts, response.data]); // ✅ Now TypeScript knows `response.data` is a `Post`
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Personal Blog</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
        <button type="submit">Publish</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
