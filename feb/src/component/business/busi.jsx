import "./bus.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Busi() {
  const baseUrl = "/api/post/business";
  const [secbus, setSecbus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl);
        if (!res.ok) return "fail to fetch data";
        const data = await res.json();
        const griTwo = data.slice(0, 6);
        setSecbus(griTwo.slice(2));
        setLoading(false);
      } catch (error) {
        setError("fail to fetch data, please try again!");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="busin-complete">
          {loading ? (
            <span>Loading...</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            <div className="complete-busi-grid">
              {secbus.map((item) => (
                <div className="busi-data" key={item._id}>
                  <div className="busi-foto-content">
                    <div className="busi-nfoto">
                      {item.newsPhoto ? (
                        <Link to={`/post/blogs/${item.title}`}>
                          <img src={item.newsPhoto} alt="" />
                        </Link>
                      ) : (
                        <Link to={`/post/blogs/${item.title}`}>
                          <img src="assets/blog.jpg"alt="" />
                        </Link>
                      )}
                      <div className="cat-color busicat">
                        {item.category === "Business" ? (
                          <Link to="/Business">
                            <span className="business">Business</span>
                          </Link>
                        ) : item.category === "Marketing" ? (
                          <Link to="/Business">
                            <span className="market">Marketing</span>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="busi-ncontent">
                      <div className="busi-categ">
                        <Link to="/Business">
                          <span className="bus-cate-main">Business</span>
                        </Link>
                        <span>{item.create.slice(0, 10)}</span>
                      </div>

                      <div className="bus-contitle">
                      <Link to={`/post/blogs/${item.title}`}>
                        {item.title.length > 58
                          ? item.title.slice(0, 58)
                          : item.title}
                        ...
                        </Link>
                      </div>
                     

                      <div className="bus-auth-coment">
                        <div className="">
                          by {item.author ? item.author : "Tunrayo duro"}
                        </div>
                        <div className="like-comment">
                          <div className="like-number">
                            <img src="assets/like.png" alt="" />
                            <span
                              style={{
                                margin: "0 -.5rem",
                                fontSize: ".9rem",
                                paddingTop: ".05rem",
                              }}
                            >
                              {getRandomInt(10, 100)}
                            </span>
                          </div>
                          <div className="like-number">
                            <img
                              style={{ marginLeft: ".3rem" }}
                              src="assets/com.png"
                              alt=""
                            />
                            <span
                              style={{
                                margin: "0 -.5rem",
                                fontSize: ".9rem",
                                paddingTop: ".05rem",
                              }}
                            >
                              {getRandomInt(5, 50)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Busi;
