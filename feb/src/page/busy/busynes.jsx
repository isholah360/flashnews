import "./busynes.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Busynes() {
  const baseUrl = "http://localhost:5000/api/post";
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cate = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await await fetch(`${baseUrl}/${cate.category}`);
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
  }, [cate]);
  return (
    <>
      <div>
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
            <span>FEATURE NEWS</span>
          </div>
          <div className="features">
            {loading ? (
              <span>Loading</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              post.map((item) => (
                <div key={item._id} className="feat-foto">
                  {item.newsPhoto ? (
                    <img src={item.newsPhoto} alt="" />
                  ) : (
                    <img src="assets/blog.jpg" alt="" />
                  )}
                  <div className="feat-cover">
                    <div className="feat-cont">
                      <div className="date-cat">
                        <div className="feat-cat">
                          <Link to={`/${item.category}`}>{item.category}</Link>
                        </div>
                        <span style={{ padding: "0 .3rem" }}>/</span>
                        <div className="feat-cat">
                          {" "}
                          {item.create.slice(0, 10)}
                        </div>
                      </div>

                      <div className="feat-title">{item.title}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Busynes;
