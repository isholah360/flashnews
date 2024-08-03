// CommentLike.js
import React, { useState, useEffect } from "react";
import "./comlike.css";

const CommentLike = ({ postId, userId, formdisplay, displays }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [postId]);

  const fetchLikes = async () => {
    try {
      const url = new URL(`http://localhost:5000/api/posts/${postId}/likes`);
      url.searchParams.append('userId', userId);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLikes(data.likes);
      setLiked(data.liked);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLikes(data.likes);
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, text: comment }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setComments([...comments, data]);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="the-comment">
      <div className="display-coments" style={{ display: `${displays}` }}>
        <div className="date-and-img" onClick={handleLike}>
          <div className="dat-png">
            <img className="classical-img" src="/assets/like.png" alt="assets/calendar.png" />
          </div>
          <div className="the-comments">
            {liked ? "Unlike" : "Like"} ({likes})
          </div>
        </div>

        <div className="date-and-img">
          <div className="dat-png">
            <img className="classical-img" src="/assets/com.png" alt="assets/calendar.png" />
          </div>
          <div className="the-comments">Comments ({comments.length})</div>
        </div>
      </div>

      <form onSubmit={handleComment} style={{ display: `${formdisplay}` }}>
        <p className="leave-reply">Leave a Reply</p>
        <textarea
          type="text"
          cols={75}
          rows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <strong>{comment.user.username}</strong>: {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentLike;
