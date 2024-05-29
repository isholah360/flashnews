import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePost() {
  const baseUrl = "http://localhost:5000/api/post/blogs";
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const storedPost = localStorage.getItem(`post_${id}`);
        if (storedPost) {
          setPost(JSON.parse(storedPost));
          setLoading(false);
        } else {
          const response = await fetch(`${baseUrl}/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const postData = await response.json();
          setPost(postData);
          console.log(storedPost)
          // Save the post data in localStorage
          localStorage.setItem(`post_${id}`, JSON.stringify(postData));
          setLoading(false);}
          
      } catch (error) {
        setError("Cannot fetch data right now, please try gin later");
      }
    };
    fetchData();
  }, [id]);

 
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div className="title">{post.title}</div>
          <div className="title">{post.body}</div>
        </div>
      )}
    </div>
  );
}

export default SinglePost;
