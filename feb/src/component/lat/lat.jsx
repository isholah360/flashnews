import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./lat.css";

function Lat({ headline }) {
  const baseUrl = `http://localhost:5000/api/post/latest`;
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
    <>
      <div className="mostview">
        <div>
          <hr className="thehr" />
        </div>{" "}
        <span>{headline}</span>
      </div>
      <div className="shild">
        <div className="theshi">
          {post.map((item) => (
            <div key={item._id} className="list-sec">
              <div className="new_photo">
                {item.newsPhoto ? (
                  <img src={item.newsPhoto} alt="" />
                ) : (
                  <img src="assets/blog.jpg" alt="" />
                )}
              </div>
              <div className="title-uthor">
                <Link to={`/post/${item._id}`} key={item._id}>
                  <div className="most-title">
                    {item.title.length > 52 ? (
                      <span style={{ margin: "-20px 0" }}>
                        {item.title.slice(0, 50)}..
                      </span>
                    ) : (
                      item.title
                    )}
                  </div>
                </Link>
                <div className="authdate">
                  <div className="author-nmfoto">
                    <div className="authname">
                      {item.author ? (
                        <div>{item.author}</div>
                      ) : (
                        <div>Tunrayo Duro</div>
                      )}
                    </div>
                  </div>
                  <div className="date">{item.createdAt.slice(0, 10)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Lat;
