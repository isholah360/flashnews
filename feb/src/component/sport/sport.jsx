import { useEffect, useState } from "react";
import "./sport.css";
import Seclat from "../latest/seclat";
import SpGrid from "./spGrid";
import SpAds from "./spAds";

function Sport() {
  const baseUrl = "http://localhost:5000/api/post/sport";
  const [sport, setSport] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) return "fail to fetch data";
        const data = await response.json();
        const limitData = data.slice(0, 2);
        setSport(limitData);
        setLoading(false);
      } catch (error) {
        setError("fail to fetch data!, please try again");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="sport-component">
          <div className="mostview">
            {/* <div>
              <hr className="thehr" />
            </div>{" "} */}
            <span>DON'T MISS SPORT</span>
          </div>
          <div className="sport-display">
            <div className="sp-gridone">
              {" "}
              {sport.map((item) => (
                <div key={item._id}>
                  <div className="sport-img-content">
                    <div className="sport-img">
                      {item.newsPhoto ? (
                        <img src={item.newsPhoto} alt="" />
                      ) : (
                        <img src="assets/blog.jpg" alt="" />
                      )}
                    </div>

                    <div className="sport-content">
                      <div className="sport-auth-date">
                        <div className="author">by {item.author}</div>
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
                </div>
              ))}
            </div>
            <div className="sp-gridtwo">
              <SpGrid />
            </div>
            <div className="sp-gridtree">
              <SpAds />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sport;
