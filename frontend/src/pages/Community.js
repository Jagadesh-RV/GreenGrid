
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";
import "../styles/community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

useEffect(() => {
  socket.on("postUpdate", (post) => {
    setPosts((prev) => [post, ...prev]);
  });
}, []);

const addPost = () => {
  const post = { user: "You", content: newPost };

  socket.emit("newPost", post);
};

const [posts, setPosts] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/api/posts")
    .then(res => setPosts(res.data));
}, []);

const addPost = async () => {
  const res = await axios.post("http://localhost:5000/api/posts", {
    user: "You",
    content: newPost,
    type: "general"
  });

  setPosts([res.data, ...posts]);
};
export default function Community() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Ravi",
      content: "Selling fresh tomatoes 🍅 - 50kg available",
      type: "sell"
    },
    {
      id: 2,
      user: "Meena",
      content: "Looking to buy organic fertilizers",
      type: "buy"
    }
  ]);

  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (!newPost) return;
    setPosts([
      { id: Date.now(), user: "You", content: newPost, type: "general" },
      ...posts
    ]);
    setNewPost("");
  };
  import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

useEffect(() => {
  socket.on("postUpdate", (post) => {
    setPosts((prev) => [post, ...prev]);
  });
}, []);

const addPost = () => {
  const post = { user: "You", content: newPost };

  socket.emit("newPost", post);
};

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />

        <h2>🌐 Farmer Community</h2>

        {/* Create Post */}
        <div className="post-box">
          <textarea
            placeholder="Share something..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button onClick={addPost}>Post</button>
        </div>

        {/* Feed */}
        <div className="feed">
          {posts.map((p) => (
            <div key={p.id} className={`post ${p.type}`}>
              <h4>{p.user}</h4>
              <p>{p.content}</p>
              <div className="actions">
                <button>👍 Like</button>
                <button>💬 Comment</button>
                <button>📩 Contact</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}