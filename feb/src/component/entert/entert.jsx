import { useEffect, useState } from "react";
import "./entert.css";
import EntAds from "./entAds";

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
                        <img src={item.newsPhoto} alt="" />
                      ) : (
                        <img src="assets/blog.jpg" alt="" />
                      )}
                      <div className="cat-color">
                        {item.category === "Fashion" ? (
                          <span className="fashion">Fashion</span>
                        ) : item.category === "Entertainment" ? (
                          <span className="market">Entertainment</span>
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
                      <div className="sport-title">{item.title}</div>
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
        <EntAds/>
      </div>
    </div>
  );
}

export default Entert;
