import { useEffect, useState } from "react";
import "./entert.css";
import EntAds from "./entAds";
import { Link } from "react-router-dom";

function Entert() {
  const baseUrl = "http://localhost:5000/api/post/entertainment";
  const [ent, setEnt] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl);
        if (!res.ok) return "fail to fetch data";
        const data = await res.json();
        setEnt(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("fail to fetchdata please try again later");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="complete-entert">
        <div className="section">
          <div className="mostview">
            <div>
              <hr className="thehr" />
            </div>{" "}
            <span>Entertainment</span>
          </div>
          <div className="fetchent">
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              <div className="enter-news">
                {ent.map((item) => (
                  <div key={item._id}>
                    <div className="sport-img">
                      {item.newsPhoto ? (
                        <Link to={`/${item._id}`}>
                          <img src={item.newsPhoto} alt="" />
                        </Link>
                      ) : (
                        <Link to={`/${item._id}`}>
                          <img src="assets/blog.jpg" alt="" />
                        </Link>
                      )}
                      <div className="cat-color">
                        {item.category === "Fashion" ? (
                          <Link to="/Fashion">
                            <span className="fashion">Fashion</span>
                          </Link>
                        ) : item.category === "Entertainment" ? (
                          <Link to="/Fashion">
                             <span className="market">Entertainment</span>
                          </Link>
                         
                        ) : item.category === "Beauty" ? (
                          <Link to="/Fashion">
                             <span className="market">Beauty</span>
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
                      <div className="sport-title"> <Link to={`/post/${item._id}`}>{item.title}</Link> </div>
                      <div className="excerp">
                        {item.body.length > 130 ? (
                          <span>{item.body.slice(0, 130)}...</span>
                        ) : (
                          item.body
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <EntAds />
      </div>
    </div>
  );
}

export default Entert;
