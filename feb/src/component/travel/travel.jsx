import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./travel.css";

function Travel({ vary, varys, title }) {
  const baseUrl = `/api/post/${vary}`;
  const baseUri = `/api/post/${varys}`;
  const [post, setPost] = useState([]);
  const [postFour, setPostFour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          ("fail to fetch data");
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError("Cannot fetch data now, please try again later");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUri);
        if (!response.ok) {
          ("fail to fetch data");
        }
        const data = await response.json();
        setPostFour(data);
        setLoading(false);
      } catch (error) {
        setError("Cannot fetch data now, please try again later");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ padding: "1.2rem 0" }}>
        <hr
          style={{
            margin: "-2rem 0% 1rem 0",
            height: ".1rem",
            background: "gray",
          }}
        />
        <div className="mostview">
          <div>
            <hr className="thehr" />
          </div>
          <Link to={`/${title}`}>
            <span>{title}</span>
          </Link>
        </div>
        <div className="travel-components">
          <div className="tracel-fotoz">
            {loading ? (
              <span>loading...</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              <div>
                {post.map((item) => (
                  <div key={item._id} className="main-travel-photo">
                    {item.newsPhoto ? (
                      <Link to={`/post/blogs/${item._id}`}>
                        <img src={item.newsPhoto} alt="" />
                      </Link>
                    ) : item.newsPhoto === "" ? (
                      <Link to={`/post/blogs/${item._id}`}>
                        <img src="/assets/blog.jpg" alt="" />
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="travel-justcontent">
            {loading ? (
              <span>loading...</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              <div>
                {postFour.map((item) => (
                  <div key={item._id}>
                    <li style={{ listStyle: "initial" }}>
                      <Link to={`/post/blogs/${item._id}`}>{item.title}</Link>{" "}
                    </li>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Travel;
