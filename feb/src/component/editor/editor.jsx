import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./editor.css";
import RelatedPost from "../../page/post/relatedPost";

function Editor() {
  const baseUrl = "/api/post/four";
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("fail to fetch data");
        }

        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError("Cannot fetch data right now, please try gin later");
      }
    };
    fetchNews();
  }, []);
  return (
    <>
      <div className="theads">
        <img src="assets/ads.jpg" alt="" />
      </div>
      <div style={{ padding: "3rem 5%" }}>
        <hr
          style={{
            margin: "0rem 0% 1rem 0",
            height: ".1rem",
            background: "gray",
          }}
        />
        <div className="mostview">
          <div>
            <hr className="thehr" />
          </div>{" "}
          <span>FEATURE POLITICS</span>
        </div>
        <div className="features">
          <div className="the-editor">
            <RelatedPost
              secDisplay="block"
              buttonDisplay="none"
              relatedCat="Politics"
              theUrl="https://flashnews-y0dp.onrender.com/post"
              amountX="4"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Editor;
