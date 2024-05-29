import { useEffect, useState } from "react";
import "./bus.css";
import Busi from "./busi";
import SpAds from "./busAds";


function Business() {
  const baseUrl = "http://localhost:5000/api/post/business";

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
            <span>Busines</span>
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
                        <img src={item.newsPhoto} alt="" />
                      ) : (
                        <img src="assets/blog.jpg" alt="" />
                      )}
                      <div className="cat-color">
                        {item.category === "Business" ? (
                          <span className="business">Busines</span>
                        ) : item.category === "Marketing" ? (
                          <span className="market">Marketing</span>
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
