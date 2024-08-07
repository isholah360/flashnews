import { useEffect, useState } from "react";
import "./bus.css";
import Busi from "./busi";
import SpAds from "./busAds";
import { Link } from "react-router-dom";

function Business() {
  const baseUrl = "/api/post/business";

  const [bus, setBus] = useState([]);
  const [secbus, setSecbus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl);
        if (!res.ok) return "fail to fetch data";
        const data = await res.json();
        const sorted = data.slice(0, 2);
        const griTwo = data.slice(0, 4);
        setBus(sorted);
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
      <div className="busines-comp">
        <div>
          <div className="mostview">
            <div>
              <hr className="thehr" />
            </div>{" "}
            <div className="feat-cat">
              <Link to="/Business">
                <span>Business</span>
              </Link>
            </div>
          </div>
          <div className="fetch-bus">
            {loading ? (
              <span>loading...</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              <span className="buiness-news">
                {bus.map((item) => (
                  <div key={item._id}>
                    <div className="sport-img">
                      {item.newsPhoto ? (
                        <Link to={`https://flashnews-y0dp.onrender.com/post/${item._id}}`}>
                          <img src={item.newsPhoto} alt="" />
                        </Link>
                      ) : (
                        <Link to={`https://flashnews-y0dp.onrender.com/post/${item._id}`}>
                          <img src="assets/blog.jpg" alt="" />
                        </Link>
                      )}
                      <div className="cat-color">
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

                    <div className="sport-content">
                      <div className="sport-auth-date">
                        <div className="author">
                          by {item.author ? item.author : "tunrayo duro"}
                        </div>
                        <div className="created">
                          {item.create.slice(0, 10)}
                        </div>
                      </div>
                      <div className="sport-title">
                        {" "}
                        <Link to={`https://flashnews-y0dp.onrender.com/post/${item._id}`}>
                          {item.title.length > 64
                            ? item.title.slice(0, 64)
                            : item.title}
                          ...
                        </Link>
                      </div>
                      <div className="excerp">
                        {item.body.length > 125 ? (
                          <span>{item.body.slice(0, 125)}...</span>
                        ) : (
                          item.body
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </span>
            )}
          </div>
          <Busi />
        </div>
        <div className="thebus-ads">
          <SpAds />
        </div>
      </div>
    </>
  );
}

export default Business;
